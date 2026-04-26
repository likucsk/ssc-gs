import { useState, useEffect, useMemo } from "react";
import { generateSchedule, DaySchedule, subjectColors, subjectBadgeColors } from "./data/schedule";

type FilterType = "all" | "pending" | "completed";
type ViewType = "schedule" | "progress";
type TopicFilter = "all" | "done" | "pending";

const STORAGE_KEY = "ssc_gs_schedule_liku";

const subjectList = ["History", "Geography", "Polity", "Economics", "Biology", "Physics", "Chemistry"];

function App() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return generateSchedule();
  });

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>("all");
  const [view, setView] = useState<ViewType>("schedule");
  const [weekFilter, setWeekFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [topicBreakdownFilter, setTopicBreakdownFilter] = useState<TopicFilter>("all");
  const [topicSearchQuery, setTopicSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  const toggleTopic = (dayNum: number, topicId: string) => {
    setSchedule((prev) =>
      prev.map((day) =>
        day.day === dayNum
          ? { ...day, topics: day.topics.map((t) => (t.id === topicId ? { ...t, completed: !t.completed } : t)) }
          : day
      )
    );
  };

  const totalTopics = useMemo(() => schedule.reduce((acc, d) => acc + d.topics.length, 0), [schedule]);
  const completedTopics = useMemo(() => schedule.reduce((acc, d) => acc + d.topics.filter((t) => t.completed).length, 0), [schedule]);
  const progressPercent = Math.round((completedTopics / totalTopics) * 100);

  const completedDays = useMemo(() => schedule.filter((d) => d.topics.every((t) => t.completed)).length, [schedule]);

  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const filteredDays = useMemo(() => {
    return schedule.filter((day) => {
      const weekMatch = weekFilter === 0 || day.week === weekFilter;
      const filterMatch =
        filter === "all" ||
        (filter === "completed" && day.topics.every((t) => t.completed)) ||
        (filter === "pending" && !day.topics.every((t) => t.completed));
      const searchMatch =
        searchQuery === "" ||
        day.topics.some((t) => t.topic.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase()));
      return weekMatch && filterMatch && searchMatch;
    });
  }, [schedule, filter, weekFilter, searchQuery]);

  const currentDayData = schedule.find((d) => d.day === selectedDay);

  const subjectProgress = useMemo(() => {
    return subjectList.map((subj) => {
      const topics = schedule.flatMap((d) => d.topics.filter((t) => t.subject === subj));
      const done = topics.filter((t) => t.completed).length;
      return { subject: subj, total: topics.length, done, pct: topics.length > 0 ? Math.round((done / topics.length) * 100) : 0 };
    });
  }, [schedule]);

  // Topic-wise breakdown: each unique topic per subject with day info & completion
  const topicBreakdownData = useMemo(() => {
    return subjectList.map((subj) => {
      const entries: Array<{ topicId: string; topic: string; day: number; week: number; completed: boolean }> = [];
      schedule.forEach((day) => {
        day.topics.forEach((t) => {
          if (t.subject === subj) {
            entries.push({ topicId: t.id, topic: t.topic, day: day.day, week: day.week, completed: t.completed });
          }
        });
      });
      const done = entries.filter((e) => e.completed).length;
      const pct = entries.length > 0 ? Math.round((done / entries.length) * 100) : 0;
      return { subject: subj, entries, done, total: entries.length, pct };
    });
  }, [schedule]);

  const phaseColors: Record<string, string> = {
    "Phase 1: Ancient & Medieval History": "from-red-600 to-orange-500",
    "Phase 1: Medieval & Modern History": "from-red-500 to-yellow-500",
    "Phase 2: Modern History Complete + Geography": "from-orange-500 to-blue-500",
    "Phase 2: Geography": "from-blue-600 to-cyan-500",
    "Phase 3: Indian Polity": "from-purple-600 to-violet-500",
    "Phase 3: Polity + Economics": "from-purple-500 to-yellow-500",
    "Phase 4: Economics": "from-yellow-600 to-amber-500",
    "Phase 5: Biology": "from-green-600 to-emerald-500",
    "Phase 6: Physics": "from-indigo-600 to-blue-500",
    "Phase 6: Physics + Chemistry": "from-indigo-500 to-orange-500",
    "Phase 6: Chemistry": "from-orange-600 to-red-500",
    "Phase 7: Full Revision": "from-gray-700 to-gray-500",
  };

  const getPhaseGradient = (phase: string) => phaseColors[phase] || "from-gray-600 to-gray-500";

  const dayDone = currentDayData?.topics.every((t) => t.completed);
  const dayProgress = currentDayData ? Math.round((currentDayData.topics.filter((t) => t.completed).length / currentDayData.topics.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* TOP HEADER */}
      <header className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-black/30 rounded-xl p-2">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow">
                  60-Day SSC GS Study Planner
                </h1>
                <p className="text-xs text-yellow-100 font-semibold tracking-widest uppercase">
                  Made by Liku CS &nbsp;|&nbsp; Author: Liku CS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/iAmLiKu1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-all px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
              >
                <span>✈️</span> t.me/iAmLiKu1
              </a>
              <div className="bg-black/30 rounded-xl px-4 py-2 text-center">
                <div className="text-yellow-200 text-xs font-semibold">Overall Progress</div>
                <div className="text-white text-lg font-black">{progressPercent}%</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="bg-gray-900 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-yellow-400 whitespace-nowrap">
              {completedTopics}/{totalTopics} topics
            </span>
            <span className="text-sm font-bold text-green-400 whitespace-nowrap">
              {completedDays}/60 days ✓
            </span>
          </div>
        </div>
      </div>

      {/* NAV TABS */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 py-2">
          <button
            onClick={() => setView("schedule")}
            className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${view === "schedule" ? "bg-yellow-500 text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            📅 Schedule
          </button>
          <button
            onClick={() => setView("progress")}
            className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${view === "progress" ? "bg-yellow-500 text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            📊 Progress Tracker
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {view === "schedule" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PANEL – Day List */}
            <div className="lg:col-span-1 space-y-4">
              {/* Filters */}
              <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 space-y-3">
                <h2 className="font-black text-yellow-400 text-lg">🔍 Filter Days</h2>
                <input
                  type="text"
                  placeholder="Search topic / subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                />
                <div className="flex gap-2 flex-wrap">
                  {(["all", "pending", "completed"] as FilterType[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${filter === f ? "bg-yellow-500 text-black" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                    >
                      {f === "all" ? "📋 All" : f === "pending" ? "⏳ Pending" : "✅ Completed"}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setWeekFilter(0)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${weekFilter === 0 ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                  >
                    All Weeks
                  </button>
                  {weeks.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeekFilter(w)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${weekFilter === w ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                    >
                      W{w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Cards */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredDays.map((day) => {
                  const done = day.topics.every((t) => t.completed);
                  const partial = day.topics.some((t) => t.completed) && !done;
                  const pct = Math.round((day.topics.filter((t) => t.completed).length / day.topics.length) * 100);
                  return (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDay(day.day)}
                      className={`w-full text-left rounded-xl p-3 border transition-all ${
                        selectedDay === day.day
                          ? "border-yellow-400 bg-yellow-950/40"
                          : done
                          ? "border-green-700 bg-green-950/20 hover:bg-green-900/20"
                          : "border-gray-800 bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm text-white">
                          {done ? "✅" : partial ? "🔄" : "📅"} Day {day.day}
                        </span>
                        <span className="text-xs font-bold text-gray-400">Week {day.week}</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-2 truncate">{day.phase}</div>
                      <div className="flex gap-1 flex-wrap mb-2">
                        {day.topics.map((t) => (
                          <span key={t.id} className={`w-2 h-2 rounded-full ${t.completed ? "bg-green-400" : "bg-gray-600"}`} />
                        ))}
                      </div>
                      <div className="bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANEL – Day Detail */}
            <div className="lg:col-span-2 space-y-4">
              {currentDayData && (
                <>
                  {/* Day Header */}
                  <div className={`bg-gradient-to-br ${getPhaseGradient(currentDayData.phase)} rounded-2xl p-6 shadow-2xl`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-black/30 rounded-xl px-4 py-2 font-black text-2xl text-white">
                          Day {currentDayData.day}
                        </div>
                        <div className="bg-black/30 rounded-xl px-3 py-1 text-xs font-bold text-white">
                          Week {currentDayData.week}
                        </div>
                      </div>
                      {dayDone && (
                        <div className="bg-green-500 rounded-xl px-4 py-2 font-black text-white text-sm animate-pulse">
                          ✅ Day Complete!
                        </div>
                      )}
                    </div>
                    <div className="text-white/80 text-sm font-semibold mb-3">{currentDayData.phase}</div>
                    <div className="bg-black/30 rounded-xl p-3 mb-4">
                      <div className="text-yellow-200 text-xs font-black uppercase tracking-widest mb-1">🎯 Daily Goal</div>
                      <div className="text-white font-bold">{currentDayData.dailyGoal}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-black/30 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-white/80 rounded-full transition-all duration-500"
                          style={{ width: `${dayProgress}%` }}
                        />
                      </div>
                      <span className="text-white font-black text-sm">{dayProgress}%</span>
                    </div>
                  </div>

                  {/* Study Time Block */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">⏰</div>
                      <div className="text-yellow-400 font-black text-sm">Study Time</div>
                      <div className="text-white font-bold">3-4 Hours</div>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">📝</div>
                      <div className="text-blue-400 font-black text-sm">Topics Today</div>
                      <div className="text-white font-bold">{currentDayData.topics.length} Topics</div>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">✅</div>
                      <div className="text-green-400 font-black text-sm">Completed</div>
                      <div className="text-white font-bold">{currentDayData.topics.filter((t) => t.completed).length}/{currentDayData.topics.length}</div>
                    </div>
                  </div>

                  {/* To-Do List */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                    <h3 className="font-black text-lg text-yellow-400 mb-4 flex items-center gap-2">
                      <span>📋</span> Today's To-Do List
                    </h3>
                    <div className="space-y-3">
                      {currentDayData.topics.map((topic, idx) => (
                        <div
                          key={topic.id}
                          onClick={() => toggleTopic(currentDayData.day, topic.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all select-none ${
                            topic.completed
                              ? "bg-green-950/40 border-green-700"
                              : "bg-gray-800 border-gray-700 hover:border-yellow-500/50 hover:bg-gray-750"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              topic.completed ? "bg-green-500 border-green-500" : "border-gray-500 bg-gray-700"
                            }`}
                          >
                            {topic.completed && <span className="text-white font-black text-sm">✓</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold text-sm ${topic.completed ? "line-through text-gray-500" : "text-white"}`}>
                              {topic.topic}
                            </div>
                            <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full text-white ${subjectBadgeColors[topic.subject] || "bg-gray-500"}`}>
                              {topic.subject}
                            </span>
                          </div>
                          <div className="text-gray-500 font-bold text-sm flex-shrink-0">#{idx + 1}</div>
                        </div>
                      ))}
                    </div>

                    {/* Day navigation */}
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
                        disabled={selectedDay === 1}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 rounded-xl transition-all"
                      >
                        ← Prev Day
                      </button>
                      <button
                        onClick={() => setSelectedDay((prev) => Math.min(60, prev + 1))}
                        disabled={selectedDay === 60}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-2 rounded-xl transition-all"
                      >
                        Next Day →
                      </button>
                    </div>
                  </div>

                  {/* Study Tips */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                    <h3 className="font-black text-base text-orange-400 mb-3 flex items-center gap-2">💡 Study Tips for Today</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">▸</span> Read topic → Make short bullet-point notes → Revise before sleeping</li>
                      <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">▸</span> Spend 1–1.5 hours per topic. Take 10-min break between topics.</li>
                      <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">▸</span> Solve at least 10 MCQs per topic from previous SSC papers.</li>
                      <li className="flex items-start gap-2"><span className="text-yellow-400 mt-0.5">▸</span> Tick checkbox ✓ only after completing reading + notes + MCQs.</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {view === "progress" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black text-white">{progressPercent}%</div>
                <div className="text-yellow-100 text-sm font-semibold mt-1">Overall Progress</div>
                <div className="mt-2 bg-black/20 rounded-full h-2">
                  <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black text-white">{completedDays}</div>
                <div className="text-green-100 text-sm font-semibold mt-1">Days Completed</div>
                <div className="text-green-200 text-xs mt-1">out of 60 days</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black text-white">{completedTopics}</div>
                <div className="text-blue-100 text-sm font-semibold mt-1">Topics Done</div>
                <div className="text-blue-200 text-xs mt-1">out of {totalTopics} topics</div>
              </div>
              <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black text-white">{60 - completedDays}</div>
                <div className="text-red-100 text-sm font-semibold mt-1">Days Remaining</div>
                <div className="text-red-200 text-xs mt-1">keep going! 💪</div>
              </div>
            </div>

            {/* Subject Progress */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-black text-yellow-400 text-xl mb-5 flex items-center gap-2">📊 Subject-wise Progress</h2>
              <div className="space-y-4">
                {subjectProgress.map((sp) => (
                  <div key={sp.subject} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${subjectBadgeColors[sp.subject]}`} />
                        <span className="font-bold text-white text-sm">{sp.subject}</span>
                      </div>
                      <div className="text-sm text-gray-400 font-semibold">
                        {sp.done}/{sp.total} topics &nbsp;
                        <span className={`font-black ${sp.pct === 100 ? "text-green-400" : sp.pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                          {sp.pct}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${subjectBadgeColors[sp.subject]} opacity-90`}
                        style={{ width: `${sp.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TOPIC-WISE BREAKDOWN ── */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="font-black text-yellow-400 text-xl flex items-center gap-2">
                  🗂 Topic-wise Breakdown
                  <span className="text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-600/40 px-2 py-0.5 rounded-full font-semibold">
                    Click any topic to toggle ✓
                  </span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="🔍 Search topic..."
                    value={topicSearchQuery}
                    onChange={(e) => setTopicSearchQuery(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 w-48"
                  />
                  {/* Status filter */}
                  <div className="flex gap-1">
                    {(["all", "done", "pending"] as TopicFilter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setTopicBreakdownFilter(f)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          topicBreakdownFilter === f
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {f === "all" ? "📋 All" : f === "done" ? "✅ Done" : "⏳ Pending"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accordion per subject */}
              <div className="space-y-4">
                {topicBreakdownData.map((subjectData) => {
                  const isOpen = expandedSubject === subjectData.subject;

                  // Apply search + status filter to entries
                  const filteredEntries = subjectData.entries.filter((e) => {
                    const searchMatch = topicSearchQuery === "" || e.topic.toLowerCase().includes(topicSearchQuery.toLowerCase());
                    const statusMatch =
                      topicBreakdownFilter === "all" ||
                      (topicBreakdownFilter === "done" && e.completed) ||
                      (topicBreakdownFilter === "pending" && !e.completed);
                    return searchMatch && statusMatch;
                  });

                  // Auto-expand if search has text or filter is active
                  const forceOpen = topicSearchQuery !== "" || topicBreakdownFilter !== "all";
                  const showOpen = forceOpen ? filteredEntries.length > 0 : isOpen;

                  const circumference = 2 * Math.PI * 16; // r=16
                  const dashOffset = circumference - (subjectData.pct / 100) * circumference;

                  return (
                    <div
                      key={subjectData.subject}
                      className={`rounded-2xl border overflow-hidden transition-all ${
                        subjectData.pct === 100
                          ? "border-green-600 bg-green-950/20"
                          : "border-gray-700 bg-gray-800/60"
                      }`}
                    >
                      {/* Subject Header Row */}
                      <button
                        onClick={() => setExpandedSubject(isOpen ? null : subjectData.subject)}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-all text-left"
                      >
                        {/* Circular mini progress */}
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#374151" strokeWidth="3" />
                            <circle
                              cx="18" cy="18" r="16" fill="none"
                              stroke={subjectData.pct === 100 ? "#22c55e" : subjectData.pct >= 50 ? "#eab308" : "#ef4444"}
                              strokeWidth="3"
                              strokeDasharray={circumference}
                              strokeDashoffset={dashOffset}
                              strokeLinecap="round"
                              className="transition-all duration-700"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white">
                            {subjectData.pct}%
                          </span>
                        </div>

                        {/* Label */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2.5 py-0.5 rounded-full text-white text-xs font-black ${subjectBadgeColors[subjectData.subject]}`}>
                              {subjectData.subject}
                            </span>
                            {subjectData.pct === 100 && (
                              <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-bold">
                                ✅ Complete!
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${subjectBadgeColors[subjectData.subject]}`}
                                style={{ width: `${subjectData.pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">
                              {subjectData.done}/{subjectData.total} topics
                            </span>
                          </div>
                        </div>

                        {/* Chevron */}
                        <div className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${showOpen ? "rotate-180" : ""}`}>
                          ▼
                        </div>
                      </button>

                      {/* Topic List (expanded) */}
                      {showOpen && (
                        <div className="px-5 pb-5">
                          {filteredEntries.length === 0 ? (
                            <div className="text-center text-gray-500 py-6 text-sm">No topics match your filter.</div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {filteredEntries.map((entry) => (
                                <button
                                  key={entry.topicId}
                                  onClick={() => toggleTopic(entry.day, entry.topicId)}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all hover:scale-[1.01] active:scale-100 ${
                                    entry.completed
                                      ? "bg-green-950/50 border-green-700/60 hover:bg-green-900/40"
                                      : "bg-gray-900 border-gray-700 hover:border-yellow-500/50"
                                  }`}
                                >
                                  {/* Checkbox */}
                                  <div
                                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                      entry.completed
                                        ? "bg-green-500 border-green-500"
                                        : "border-gray-600 bg-gray-800"
                                    }`}
                                  >
                                    {entry.completed && (
                                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    )}
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-bold truncate ${entry.completed ? "line-through text-gray-500" : "text-white"}`}>
                                      {entry.topic}
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-gray-500 font-semibold">
                                        Day {entry.day} · Week {entry.week}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Status badge */}
                                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${
                                    entry.completed
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-gray-700 text-gray-500"
                                  }`}>
                                    {entry.completed ? "DONE" : "TODO"}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Mini stats row */}
                          <div className="flex gap-4 mt-4 pt-3 border-t border-gray-700/50 text-xs text-gray-500">
                            <span>📚 Total: <strong className="text-gray-300">{subjectData.total}</strong></span>
                            <span>✅ Done: <strong className="text-green-400">{subjectData.done}</strong></span>
                            <span>⏳ Left: <strong className="text-red-400">{subjectData.total - subjectData.done}</strong></span>
                            <span>📈 Progress: <strong className={subjectData.pct === 100 ? "text-green-400" : subjectData.pct >= 50 ? "text-yellow-400" : "text-red-400"}>{subjectData.pct}%</strong></span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Week Progress Grid */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-black text-yellow-400 text-xl mb-5 flex items-center gap-2">🗓 Week-wise Progress</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {weeks.map((w) => {
                  const weekDays = schedule.filter((d) => d.week === w);
                  const weekDone = weekDays.filter((d) => d.topics.every((t) => t.completed)).length;
                  const weekPct = weekDays.length > 0 ? Math.round((weekDone / weekDays.length) * 100) : 0;
                  return (
                    <div key={w} className={`rounded-xl p-4 border text-center ${weekPct === 100 ? "bg-green-900/40 border-green-600" : "bg-gray-800 border-gray-700"}`}>
                      <div className="font-black text-lg text-white">W{w}</div>
                      <div className="text-xs text-gray-400 mb-2">{weekDays.length} days</div>
                      <div className="text-2xl font-black text-yellow-400">{weekPct}%</div>
                      <div className="text-xs text-gray-500 mt-1">{weekDone}/{weekDays.length} days</div>
                      <div className="mt-2 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${weekPct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All 60 Days Grid */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-black text-yellow-400 text-xl mb-5 flex items-center gap-2">📅 All 60 Days Overview</h2>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                {schedule.map((day) => {
                  const done = day.topics.every((t) => t.completed);
                  const partial = day.topics.some((t) => t.completed) && !done;
                  return (
                    <button
                      key={day.day}
                      onClick={() => { setSelectedDay(day.day); setView("schedule"); }}
                      title={`Day ${day.day} – ${day.phase}`}
                      className={`aspect-square rounded-lg font-black text-sm transition-all hover:scale-110 ${
                        done
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                          : partial
                          ? "bg-yellow-500 text-black"
                          : selectedDay === day.day
                          ? "bg-orange-500 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {day.day}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-5 mt-4 text-xs text-gray-400 flex-wrap">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500" /> Completed</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-500" /> In Progress</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-gray-800" /> Not Started</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-orange-500" /> Selected</div>
              </div>
            </div>

            {/* Syllabus Overview */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-black text-yellow-400 text-xl mb-5 flex items-center gap-2">📖 Complete Syllabus Covered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectList.map((subj) => {
                  const topics = [...new Set(schedule.flatMap((d) => d.topics.filter((t) => t.subject === subj).map((t) => t.topic)))];
                  return (
                    <div key={subj} className={`rounded-xl p-4 border ${subjectColors[subj] || "bg-gray-800 border-gray-700"}`}>
                      <div className="font-black text-sm mb-3 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-white text-xs ${subjectBadgeColors[subj]}`}>{subj}</span>
                        <span className="text-xs opacity-70">{topics.length} topics</span>
                      </div>
                      <ul className="space-y-1">
                        {topics.map((t) => {
                          const topicObj = schedule.flatMap((d) => d.topics).find((tp) => tp.subject === subj && tp.topic === t);
                          return (
                            <li key={t} className="flex items-start gap-2 text-xs">
                              <span className={topicObj?.completed ? "text-green-600 font-black" : "text-gray-500"}>
                                {topicObj?.completed ? "✓" : "○"}
                              </span>
                              <span className={topicObj?.completed ? "line-through opacity-60" : ""}>{t}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-10 bg-gray-950 border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <div className="text-yellow-400 font-black text-lg">📚 60-Day SSC GS Study Planner</div>
          <div className="text-gray-500 text-sm">
            <span className="text-white font-bold">Made by Liku CS</span> &nbsp;|&nbsp;
            <span className="text-white font-bold">Author: Liku CS</span>
          </div>
          <div className="text-gray-600 text-xs">3–4 Hours Daily &nbsp;·&nbsp; 60 Days &nbsp;·&nbsp; Complete GS Syllabus for SSC</div>
          <a
            href="https://t.me/iAmLiKu1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm"
          >
            ✈️ Contact: t.me/iAmLiKu1
          </a>
          <div className="text-gray-700 text-xs pt-2">Your progress is saved automatically in your browser. All the best! 💪🔥</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
