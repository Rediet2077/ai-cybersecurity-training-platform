import { Link } from "react-router-dom";

const stats = [
  {
    label: "Courses Enrolled",
    value: "4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-600/10",
  },
  {
    label: "Labs Completed",
    value: "12",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    color: "text-purple-400",
    bg: "bg-purple-600/10",
  },
  {
    label: "Quiz Score Avg",
    value: "87%",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-green-400",
    bg: "bg-green-600/10",
  },
  {
    label: "XP Points",
    value: "3,240",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
        <path d="M8 21h8m-4-4v4M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.5l-4.9 2.7.9-5.5L4 8.8l5.5-.8z" />
      </svg>
    ),
    color: "text-yellow-400",
    bg: "bg-yellow-600/10",
  },
];

const continueCourses = [
  {
    title: "Ethical Hacking Basics",
    progress: 65,
    lessons: "8 of 12 lessons",
    gradient: "from-blue-900 via-blue-800 to-slate-900",
    badge: "Beginner",
    badgeColor: "bg-green-600",
  },
  {
    title: "Network Security",
    progress: 30,
    lessons: "5 of 18 lessons",
    gradient: "from-purple-900 via-blue-900 to-slate-900",
    badge: "Intermediate",
    badgeColor: "bg-blue-600",
  },
];

const recentActivity = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    bg: "bg-purple-600/10",
    text: "Completed SQL Injection Basics lab",
    time: "2 hours ago",
    xp: "+100 XP",
    xpColor: "text-green-400",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "bg-green-600/10",
    text: "Passed XSS Attack Vectors quiz — 75%",
    time: "5 hours ago",
    xp: "+150 XP",
    xpColor: "text-green-400",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
        <path d="M8 21h8m-4-4v4M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.5l-4.9 2.7.9-5.5L4 8.8l5.5-.8z" />
      </svg>
    ),
    bg: "bg-yellow-600/10",
    text: "Earned badge: SQL Master",
    time: "Yesterday",
    xp: "Badge",
    xpColor: "text-yellow-400",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    bg: "bg-blue-600/10",
    text: "Started Network Security course",
    time: "2 days ago",
    xp: "Enrolled",
    xpColor: "text-blue-400",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    bg: "bg-red-600/10",
    text: "Completed CTF Starter challenge",
    time: "3 days ago",
    xp: "+200 XP",
    xpColor: "text-green-400",
  },
];

const badges = [
  {
    icon: "🏆",
    title: "First Lab",
    desc: "Completed your first lab",
    color: "border-yellow-500/30 bg-yellow-600/10",
  },
  {
    icon: "🛡️",
    title: "SQL Master",
    desc: "Completed all SQL labs",
    color: "border-blue-500/30 bg-blue-600/10",
  },
  {
    icon: "🎯",
    title: "Quiz Pro",
    desc: "Scored 90%+ on a quiz",
    color: "border-green-500/30 bg-green-600/10",
  },
  {
    icon: "🚩",
    title: "CTF Starter",
    desc: "Captured your first flag",
    color: "border-purple-500/30 bg-purple-600/10",
  },
];

const quickActions = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    bg: "bg-purple-600/10",
    border: "border-purple-500/20",
    label: "Start Lab",
    desc: "Jump into a hands-on lab",
    to: "/labs",
    btnColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: "bg-green-600/10",
    border: "border-green-500/20",
    label: "Take Quiz",
    desc: "Test your knowledge",
    to: "/quiz",
    btnColor: "bg-green-600 hover:bg-green-700",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    bg: "bg-blue-600/10",
    border: "border-blue-500/20",
    label: "Ask AI",
    desc: "Get instant AI guidance",
    to: "/ai-chat",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
        <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    bg: "bg-yellow-600/10",
    border: "border-yellow-500/20",
    label: "Leaderboard",
    desc: "See your global ranking",
    to: "/leaderboard",
    btnColor: "bg-yellow-600 hover:bg-yellow-700",
  },
];

function Dashboard() {
  const xp = 3240;
  const xpNeeded = 4000;
  const xpPercent = Math.round((xp / xpNeeded) * 100);

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Welcome Banner */}
        <div
          className="relative rounded-2xl overflow-hidden mb-8 p-6 md:p-8"
          style={{ background: "linear-gradient(135deg, #0d2240 0%, #1a1060 50%, #0e1628 100%)" }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                Welcome back, John! 🛡️
              </h1>
              <p className="text-gray-300 text-sm">Continue your cybersecurity journey — you&apos;re making great progress!</p>
              <div className="flex items-center gap-3 mt-4">
                <span className="bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                  Level 7 — Penetration Tester
                </span>
                <span className="text-gray-400 text-xs">{xp} / {xpNeeded} XP to Level 8</span>
              </div>
              <div className="mt-3 w-full max-w-xs">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 hidden md:flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5">
                  <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-400 mt-2">Rank #42 Global</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0e1628] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 bg-[#0e1628] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-white text-lg">Continue Learning</h2>
              <Link to="/courses" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View All
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {continueCourses.map((c) => (
                <div key={c.title} className="bg-[#070d1b] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-14 h-14 flex-shrink-0 bg-gradient-to-br ${c.gradient} rounded-xl flex items-center justify-center`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5">
                      <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white truncate">{c.title}</span>
                      <span className={`ml-2 flex-shrink-0 text-xs font-medium text-white px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{c.lessons}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-1.5 bg-blue-500 rounded-full"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-400 font-medium">{c.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-5">Recent Activity</h2>
            <div className="flex flex-col gap-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${a.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-200 leading-tight">{a.text}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{a.time}</span>
                      <span className={`text-xs font-semibold ${a.xpColor}`}>{a.xp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Badges */}
          <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-white text-lg">Earned Badges</h2>
              <Link to="/profile" className="text-xs text-blue-400 hover:text-blue-300">View All</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div key={b.title} className={`border ${b.color} rounded-xl p-4 flex items-center gap-3`}>
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{b.title}</p>
                    <p className="text-xs text-gray-400">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((q) => (
                <Link
                  key={q.label}
                  to={q.to}
                  className={`border ${q.border} ${q.bg} rounded-xl p-4 flex flex-col gap-2 hover:scale-[1.02] transition-transform`}
                >
                  <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center">
                    {q.icon}
                  </div>
                  <p className="text-sm font-semibold text-white">{q.label}</p>
                  <p className="text-xs text-gray-400">{q.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
