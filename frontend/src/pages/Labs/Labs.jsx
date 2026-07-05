import { useState } from "react";

const labsData = [
  {
    id: 1,
    title: "SQL Injection Basics",
    category: "SQL Injection",
    difficulty: "Beginner",
    diffColor: "bg-green-600",
    xp: 100,
    status: "completed",
    desc: "Learn and exploit basic SQL injection vulnerabilities in a login form.",
    objectives: [
      "Understand how SQL injection works",
      "Identify vulnerable input fields",
      "Bypass login authentication using SQL injection",
      "Extract data from the database",
    ],
  },
  {
    id: 2,
    title: "Blind SQL Injection",
    category: "SQL Injection",
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    xp: 200,
    status: "in-progress",
    desc: "Extract data from databases using boolean-based blind SQL injection techniques.",
    objectives: [
      "Understand blind SQL injection concepts",
      "Use boolean-based inference attacks",
      "Enumerate database structure",
      "Extract sensitive data without visible output",
    ],
  },
  {
    id: 3,
    title: "XSS Reflected Attack",
    category: "XSS",
    difficulty: "Beginner",
    diffColor: "bg-green-600",
    xp: 100,
    status: "not-started",
    desc: "Execute reflected cross-site scripting attacks to steal session cookies.",
    objectives: [
      "Understand reflected XSS mechanics",
      "Identify XSS injection points",
      "Craft malicious payloads",
      "Steal session cookies via XSS",
    ],
  },
  {
    id: 4,
    title: "XSS Stored Attack",
    category: "XSS",
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    xp: 200,
    status: "not-started",
    desc: "Persist malicious scripts in a web application's database to attack all visitors.",
    objectives: [
      "Understand stored XSS mechanics",
      "Inject persistent malicious scripts",
      "Exfiltrate user credentials",
      "Chain XSS with CSRF attacks",
    ],
  },
  {
    id: 5,
    title: "Command Injection Lab",
    category: "Command Injection",
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    xp: 200,
    status: "completed",
    desc: "Exploit OS command injection vulnerabilities to execute arbitrary system commands.",
    objectives: [
      "Identify OS command injection vectors",
      "Bypass input sanitization",
      "Execute arbitrary commands on the server",
      "Read sensitive system files",
    ],
  },
  {
    id: 6,
    title: "CSRF Attack Lab",
    category: "CSRF",
    difficulty: "Advanced",
    diffColor: "bg-orange-500",
    xp: 300,
    status: "not-started",
    desc: "Craft CSRF attacks to perform unauthorized actions on behalf of authenticated users.",
    objectives: [
      "Understand CSRF vulnerability mechanics",
      "Craft malicious HTML forms",
      "Bypass CSRF protections",
      "Chain CSRF with XSS",
    ],
  },
  {
    id: 7,
    title: "File Upload Vulnerability",
    category: "XSS",
    difficulty: "Advanced",
    diffColor: "bg-orange-500",
    xp: 300,
    status: "not-started",
    desc: "Bypass file upload restrictions to upload web shells and gain remote code execution.",
    objectives: [
      "Understand file upload vulnerabilities",
      "Bypass MIME type and extension filters",
      "Upload a PHP web shell",
      "Achieve remote code execution",
    ],
  },
  {
    id: 8,
    title: "Password Cracking Lab",
    category: "Cryptography",
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    xp: 200,
    status: "in-progress",
    desc: "Use dictionary and brute-force attacks to crack hashed passwords from a database dump.",
    objectives: [
      "Understand password hashing algorithms",
      "Use Hashcat and John the Ripper",
      "Perform dictionary attacks",
      "Crack MD5, SHA1, and bcrypt hashes",
    ],
  },
  {
    id: 9,
    title: "Network Sniffing Lab",
    category: "Network",
    difficulty: "Advanced",
    diffColor: "bg-orange-500",
    xp: 300,
    status: "not-started",
    desc: "Capture and analyze network traffic using Wireshark to intercept sensitive data.",
    objectives: [
      "Set up a network sniffing environment",
      "Capture packets with Wireshark",
      "Analyze HTTP and FTP credentials",
      "Perform ARP poisoning for MITM attacks",
    ],
  },
];

const categories = ["All", "SQL Injection", "XSS", "CSRF", "Command Injection", "Cryptography", "Network"];

const statusConfig = {
  completed: { label: "Completed", color: "text-green-400", bg: "bg-green-600/10 border-green-500/20", btn: "Review", btnColor: "bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30" },
  "in-progress": { label: "In Progress", color: "text-yellow-400", bg: "bg-yellow-600/10 border-yellow-500/20", btn: "Continue", btnColor: "bg-yellow-600 hover:bg-yellow-700 text-white" },
  "not-started": { label: "Not Started", color: "text-gray-400", bg: "bg-white/5 border-white/5", btn: "Start Lab", btnColor: "bg-blue-600 hover:bg-blue-700 text-white" },
};

function LabModal({ lab, onClose }) {
  const [flag, setFlag] = useState("");
  const [flagResult, setFlagResult] = useState(null);

  const submitFlag = () => {
    if (flag.trim().toLowerCase() === "flag{sql_master_2024}") {
      setFlagResult("correct");
    } else {
      setFlagResult("wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#0e1628] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold text-white px-2 py-0.5 rounded-full ${lab.diffColor}`}>
                {lab.difficulty}
              </span>
              <span className="text-xs text-yellow-400 font-semibold">+{lab.xp} XP</span>
            </div>
            <h2 className="text-xl font-bold text-white">{lab.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Objectives */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Lab Objectives
            </h3>
            <ul className="flex flex-col gap-2">
              {lab.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" className="mt-0.5 flex-shrink-0">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Instructions</h3>
            <div className="bg-[#070d1b] border border-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed">
              <p>1. The target application is running at <span className="text-blue-400 font-mono">http://lab.safecampus.local</span></p>
              <p className="mt-2">2. Navigate to the login page and identify the vulnerable input fields.</p>
              <p className="mt-2">3. Use SQL injection payloads to bypass authentication and extract data from the database.</p>
              <p className="mt-2">4. Once you&apos;ve found the flag, submit it in the input field below.</p>
              <p className="mt-3 text-yellow-400 text-xs">💡 Hint: Try classic authentication bypass payloads first.</p>
            </div>
          </div>

          {/* Terminal */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              Terminal
            </h3>
            <div className="bg-black rounded-xl p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-500 text-xs ml-2">lab-terminal — safecampus</span>
              </div>
              <div className="text-green-400 leading-relaxed">
                <p><span className="text-blue-400">root@safecampus</span>:<span className="text-yellow-400">~</span>$ sqlmap -u &quot;http://lab.safecampus.local/login&quot; --data=&quot;user=test&amp;pass=test&quot;</p>
                <p className="text-gray-500 mt-1">[*] starting @ 14:32:05</p>
                <p className="text-gray-500">[*] testing connection to the target URL</p>
                <p className="text-green-400">[+] target appears to be vulnerable to SQL injection</p>
                <p className="text-gray-500">[*] testing DBMS: MySQL</p>
                <p className="text-green-400">[+] DBMS identified: MySQL &gt;= 5.0</p>
                <p className="mt-2"><span className="text-blue-400">root@safecampus</span>:<span className="text-yellow-400">~</span>$ <span className="animate-pulse">_</span></p>
              </div>
            </div>
          </div>

          {/* Submit Flag */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Submit Flag</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="flag{...}"
                className="flex-1 bg-[#070d1b] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={submitFlag}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Submit
              </button>
            </div>
            {flagResult === "correct" && (
              <div className="mt-3 bg-green-600/10 border border-green-500/30 rounded-xl p-3 flex items-center gap-2 text-green-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Correct flag! You earned +{lab.xp} XP. Well done!
              </div>
            )}
            {flagResult === "wrong" && (
              <div className="mt-3 bg-red-600/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 text-red-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Incorrect flag. Keep trying — you&apos;re close!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Labs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLab, setSelectedLab] = useState(null);

  const filtered = labsData.filter(
    (l) => activeCategory === "All" || l.category === activeCategory
  );

  const completed = labsData.filter((l) => l.status === "completed").length;
  const inProgress = labsData.filter((l) => l.status === "in-progress").length;
  const xpEarned = labsData.filter((l) => l.status === "completed").reduce((sum, l) => sum + l.xp, 0);

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-12">
      {selectedLab && <LabModal lab={selectedLab} onClose={() => setSelectedLab(null)} />}

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="pt-6 mb-8">
          <span className="inline-flex items-center gap-1.5 bg-purple-600/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
            Hands-On Practice Environment
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-2">Cyber Labs</h1>
          <p className="text-gray-400 text-sm">Practice real-world hacking techniques in a safe, isolated sandbox environment.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Labs", value: "50+", icon: "🧪", color: "text-blue-400", bg: "bg-blue-600/10" },
            { label: "Completed", value: String(completed), icon: "✅", color: "text-green-400", bg: "bg-green-600/10" },
            { label: "In Progress", value: String(inProgress), icon: "⚡", color: "text-yellow-400", bg: "bg-yellow-600/10" },
            { label: "XP Earned", value: String(xpEarned), icon: "⭐", color: "text-purple-400", bg: "bg-purple-600/10" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border border-white/5 rounded-2xl p-5 flex items-center gap-3`}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-[#0e1628] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((lab) => {
            const s = statusConfig[lab.status];
            return (
              <div
                key={lab.id}
                className="bg-[#0e1628] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-blue-500/20 transition-all group"
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-300 bg-blue-600/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                    {lab.category}
                  </span>
                  <span className={`text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${lab.diffColor}`}>
                    {lab.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                  {lab.title}
                </h3>

                {/* Desc */}
                <p className="text-gray-400 text-xs leading-relaxed flex-1">{lab.desc}</p>

                {/* XP + Status */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-yellow-400 text-xs font-semibold">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    +{lab.xp} XP
                  </span>
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}>
                    {lab.status === "completed" && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {lab.status === "in-progress" && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                    {lab.status === "not-started" && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                    {s.label}
                  </span>
                </div>

                {/* Button */}
                <button
                  onClick={() => setSelectedLab(lab)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${s.btnColor}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {lab.status === "completed" ? (
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    ) : (
                      <polygon points="5 3 19 12 5 21 5 3" />
                    )}
                  </svg>
                  {s.btn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Labs;
