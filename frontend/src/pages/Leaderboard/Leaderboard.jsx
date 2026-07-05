import { useState } from "react";

const leaderboardData = [
  { rank: 1, name: "CyberNinja_X", username: "cyberninja", level: 28, xp: 15420, labs: 48, quizzes: 22, badges: 18, change: "up", avatar: "CN" },
  { rank: 2, name: "H4ck3r_Pr0", username: "hackerpro", level: 25, xp: 12840, labs: 42, quizzes: 19, badges: 15, change: "up", avatar: "HP" },
  { rank: 3, name: "RedTeamAlpha", username: "redteam", level: 24, xp: 11650, labs: 38, quizzes: 21, badges: 14, change: "down", avatar: "RT" },
  { rank: 4, name: "John Doe", username: "johndoe", level: 7, xp: 3240, labs: 12, quizzes: 8, badges: 4, change: "up", avatar: "JD", isMe: true },
  { rank: 5, name: "SecurityQueen", username: "secqueen", level: 22, xp: 10200, labs: 35, quizzes: 18, badges: 13, change: "up", avatar: "SQ" },
  { rank: 6, name: "Malw4reHunt3r", username: "malwarehunter", level: 20, xp: 9100, labs: 32, quizzes: 16, badges: 12, change: "down", avatar: "MH" },
  { rank: 7, name: "PwnMaster99", username: "pwnmaster", level: 19, xp: 8350, labs: 30, quizzes: 15, badges: 11, change: "up", avatar: "PM" },
  { rank: 8, name: "CtfWizard", username: "ctfwizard", level: 18, xp: 7800, labs: 28, quizzes: 14, badges: 10, change: "same", avatar: "CW" },
  { rank: 9, name: "ZeroD4y", username: "zeroday", level: 16, xp: 6900, labs: 25, quizzes: 13, badges: 9, change: "down", avatar: "ZD" },
  { rank: 10, name: "PacketSniffer", username: "packetsniffer", level: 14, xp: 5600, labs: 20, quizzes: 11, badges: 7, change: "up", avatar: "PS" },
];

const tabs = ["Weekly", "Monthly", "All Time"];

const podiumColors = {
  1: { bg: "bg-yellow-600/20", border: "border-yellow-500/40", text: "text-yellow-400", crown: true },
  2: { bg: "bg-gray-600/20", border: "border-gray-500/40", text: "text-gray-300", crown: false },
  3: { bg: "bg-orange-600/20", border: "border-orange-500/40", text: "text-orange-400", crown: false },
};

function ChangeIndicator({ change }) {
  if (change === "up") return (
    <span className="flex items-center gap-0.5 text-green-400 text-xs font-bold">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      +2
    </span>
  );
  if (change === "down") return (
    <span className="flex items-center gap-0.5 text-red-400 text-xs font-bold">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
      -1
    </span>
  );
  return <span className="text-gray-500 text-xs">—</span>;
}

function Leaderboard() {
  const [activeTab, setActiveTab] = useState("All Time");

  const top3 = [leaderboardData[1], leaderboardData[0], leaderboardData[2]]; // 2nd, 1st, 3rd

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center pt-6 mb-8">
          <span className="inline-flex items-center gap-1.5 bg-yellow-600/10 border border-yellow-500/20 text-yellow-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Global Rankings
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400 text-sm">Compete with the best cybersecurity learners worldwide.</p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-[#0e1628] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {top3.map((player, idx) => {
            const podiumRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
            const cfg = podiumColors[podiumRank];
            const height = podiumRank === 1 ? "h-40" : podiumRank === 2 ? "h-32" : "h-28";
            return (
              <div key={player.rank} className="flex flex-col items-center gap-3 flex-1 max-w-[160px]">
                {/* Crown for 1st */}
                {cfg.crown && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                    <path d="M2 20h20M4 20l2-8 6 4 6-4 2 8" />
                  </svg>
                )}

                {/* Avatar */}
                <div className={`w-14 h-14 rounded-full border-2 ${cfg.border} ${cfg.bg} flex items-center justify-center`}>
                  <span className={`text-base font-extrabold ${cfg.text}`}>{player.avatar}</span>
                </div>

                <div className="text-center">
                  <p className="text-sm font-bold text-white">{player.name}</p>
                  <p className={`text-xs font-bold ${cfg.text}`}>
                    {player.xp.toLocaleString()} XP
                  </p>
                </div>

                {/* Podium block */}
                <div className={`w-full ${height} ${cfg.bg} border ${cfg.border} rounded-t-xl flex items-center justify-center`}>
                  <span className={`text-3xl font-extrabold ${cfg.text}`}>#{podiumRank}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Players", value: "10,432", icon: "👥", color: "text-blue-400", bg: "bg-blue-600/10" },
            { label: "This Week's Top", value: "CyberNinja_X", icon: "🏆", color: "text-yellow-400", bg: "bg-yellow-600/10" },
            { label: "Most Labs Done", value: "48 Labs", icon: "🧪", color: "text-purple-400", bg: "bg-purple-600/10" },
            { label: "Highest Score", value: "100%", icon: "🎯", color: "text-green-400", bg: "bg-green-600/10" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border border-white/5 rounded-2xl p-4 flex items-center gap-3`}>
              <span className="text-xl">{s.icon}</span>
              <div>
                <p className={`text-sm font-extrabold ${s.color} truncate`}>{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rankings Table */}
        <div className="bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h2 className="font-bold text-white">Full Rankings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-white/5">
                  <th className="text-left py-3 px-5 font-medium">Rank</th>
                  <th className="text-left py-3 px-5 font-medium">Player</th>
                  <th className="text-left py-3 px-5 font-medium hidden md:table-cell">Level</th>
                  <th className="text-left py-3 px-5 font-medium">XP</th>
                  <th className="text-left py-3 px-5 font-medium hidden lg:table-cell">Labs</th>
                  <th className="text-left py-3 px-5 font-medium hidden lg:table-cell">Quizzes</th>
                  <th className="text-left py-3 px-5 font-medium hidden md:table-cell">Badges</th>
                  <th className="text-left py-3 px-5 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-white/5 transition-colors ${
                      player.isMe
                        ? "bg-blue-600/10 border-blue-500/20"
                        : "hover:bg-white/2"
                    }`}
                  >
                    <td className="py-4 px-5">
                      <span className={`text-sm font-extrabold ${
                        player.rank === 1 ? "text-yellow-400" :
                        player.rank === 2 ? "text-gray-300" :
                        player.rank === 3 ? "text-orange-400" :
                        "text-gray-400"
                      }`}>
                        {player.rank <= 3 ? (
                          <span>{player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"}</span>
                        ) : (
                          `#${player.rank}`
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          player.isMe ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300"
                        }`}>
                          {player.avatar}
                        </div>
                        <div>
                          <p className={`font-semibold ${player.isMe ? "text-blue-400" : "text-white"}`}>
                            {player.name}
                            {player.isMe && <span className="ml-2 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">You</span>}
                          </p>
                          <p className="text-xs text-gray-500">@{player.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 hidden md:table-cell">
                      <span className="text-xs font-medium bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-full">
                        Lv. {player.level}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-bold text-white">{player.xp.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-5 hidden lg:table-cell text-gray-400">{player.labs}</td>
                    <td className="py-4 px-5 hidden lg:table-cell text-gray-400">{player.quizzes}</td>
                    <td className="py-4 px-5 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: Math.min(player.badges, 5) }).map((_, i) => (
                          <span key={i} className="text-sm">🏅</span>
                        ))}
                        {player.badges > 5 && <span className="text-xs text-gray-400">+{player.badges - 5}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <ChangeIndicator change={player.change} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Leaderboard;
