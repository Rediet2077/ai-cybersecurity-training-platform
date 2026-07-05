import { useState } from "react";

const earnedBadges = [
  { icon: "🚀", title: "First Steps", desc: "Joined the platform", earned: true, color: "border-blue-500/30 bg-blue-600/10" },
  { icon: "🧪", title: "Lab Explorer", desc: "Completed 5 labs", earned: true, color: "border-purple-500/30 bg-purple-600/10" },
  { icon: "🎯", title: "Quiz Master", desc: "Scored 90%+ on a quiz", earned: true, color: "border-green-500/30 bg-green-600/10" },
  { icon: "🚩", title: "CTF Champion", desc: "Win a CTF event", earned: false, color: "border-white/10 bg-white/5" },
  { icon: "🛡️", title: "Security Expert", desc: "Complete all advanced labs", earned: false, color: "border-white/10 bg-white/5" },
  { icon: "🏆", title: "Top 10 Leaderboard", desc: "Reach top 10 globally", earned: false, color: "border-white/10 bg-white/5" },
];

const certificates = [
  {
    id: 1,
    title: "Ethical Hacking Basics",
    issued: "January 15, 2024",
    credId: "SC-EHB-2024-0115",
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    issued: "February 20, 2024",
    credId: "SC-NSF-2024-0220",
  },
];

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    bio: "Cybersecurity enthusiast passionate about ethical hacking, network security, and CTF challenges.",
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [saveMsg, setSaveMsg] = useState(null);

  const xp = 3240;
  const xpNext = 4000;
  const xpPercent = Math.round((xp / xpNext) * 100);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setEditMode(false);
    setSaveMsg("Profile updated successfully!");
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    setPasswordForm({ current: "", newPass: "", confirm: "" });
    setSaveMsg("Password updated successfully!");
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const stats = [
    { label: "Courses Enrolled", value: "4", icon: "📚", color: "text-blue-400" },
    { label: "Labs Completed", value: "12", icon: "🧪", color: "text-purple-400" },
    { label: "Quizzes Taken", value: "8", icon: "📋", color: "text-green-400" },
    { label: "Certificates", value: "2", icon: "🎓", color: "text-yellow-400" },
    { label: "XP Points", value: "3,240", icon: "⭐", color: "text-orange-400" },
    { label: "Current Level", value: "7", icon: "🔰", color: "text-pink-400" },
  ];

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Save notification */}
        {saveMsg && (
          <div className="fixed top-24 right-6 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {saveMsg}
          </div>
        )}

        <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-5">

            {/* Profile Card */}
            <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6 text-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-extrabold text-white"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}
              >
                JD
              </div>

              {!editMode ? (
                <>
                  <h2 className="text-xl font-extrabold text-white">{profileForm.fullName}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">@{profileForm.username}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                      Student
                    </span>
                    <span className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1 rounded-full">
                      Lv. 7
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-3">
                    <svg className="inline mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Member since January 2024
                  </p>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed px-2">{profileForm.bio}</p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSaveProfile} className="text-left mt-2">
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Full Name", name: "fullName", type: "text" },
                      { label: "Username", name: "username", type: "text" },
                      { label: "Email", name: "email", type: "email" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-medium text-gray-400 mb-1">{f.label}</label>
                        <input
                          type={f.type}
                          name={f.name}
                          value={profileForm[f.name]}
                          onChange={handleProfileChange}
                          className="w-full bg-[#070d1b] border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        rows={3}
                        className="w-full bg-[#070d1b] border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      />
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setEditMode(false)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm py-2.5 rounded-xl transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Account Settings</h3>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  {showPasswordForm ? "Cancel" : "Change Password"}
                </button>
              </div>

              {!showPasswordForm ? (
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Email</span>
                    <span className="text-white text-xs truncate max-w-[140px]">{profileForm.email}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span>Role</span>
                    <span className="text-blue-400 text-xs">Student</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>2FA</span>
                    <span className="text-red-400 text-xs">Disabled</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
                  {[
                    { label: "Current Password", name: "current" },
                    { label: "New Password", name: "newPass" },
                    { label: "Confirm New Password", name: "confirm" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-medium text-gray-400 mb-1">{f.label}</label>
                      <input
                        type="password"
                        value={passwordForm[f.name]}
                        onChange={(e) => setPasswordForm({ ...passwordForm, [f.name]: e.target.value })}
                        required
                        className="w-full bg-[#070d1b] border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  ))}
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    Update Password
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Stats Grid */}
            <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-5">Activity Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-[#070d1b] border border-white/5 rounded-xl p-4 text-center">
                    <span className="text-2xl">{s.icon}</span>
                    <p className={`text-2xl font-extrabold ${s.color} mt-1`}>{s.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* XP Progress */}
              <div className="mt-5 bg-[#070d1b] border border-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">XP Progress to Level 8</span>
                  <span className="text-xs text-gray-400">{xp.toLocaleString()} / {xpNext.toLocaleString()} XP</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{xpNext - xp} XP needed to reach Level 8</p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white">Badges &amp; Achievements</h3>
                <span className="text-xs text-gray-400">
                  {earnedBadges.filter((b) => b.earned).length} / {earnedBadges.length} earned
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {earnedBadges.map((b) => (
                  <div
                    key={b.title}
                    className={`border ${b.color} rounded-xl p-4 flex flex-col items-center text-center gap-2 ${
                      !b.earned ? "opacity-40" : ""
                    }`}
                  >
                    <span className="text-3xl">{b.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{b.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                    </div>
                    {!b.earned && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-white">Certificates</h3>
                <span className="text-xs bg-green-600/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-full">
                  {certificates.length} Earned
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-[#070d1b] border border-white/5 rounded-xl p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-600/10 border border-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🎓</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{cert.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Issued {cert.issued}</p>
                        <p className="text-xs text-gray-600 font-mono mt-0.5">ID: {cert.credId}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download PDF
                      </button>
                      <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
