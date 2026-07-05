import { useState } from "react";

// ── Course Data ────────────────────────────────────────────────────
const courseData = {
  title: "Ethical Hacking Basics",
  instructor: "Dr. Sarah Chen",
  instructorBio: "15+ years in penetration testing. CEH, OSCP certified. Former security consultant at Google and Microsoft.",
  instructorRating: 4.8,
  instructorStudents: 12400,
  progress: 65,
  totalLessons: 16,
  completedLessons: 8,
  duration: "6h 40min",
  rating: 4.8,
  reviews: 230,
  students: 5400,
  modules: [
    {
      id: 1,
      title: "Introduction to Ethical Hacking",
      duration: "40min",
      lessons: [
        { id: "1-1", title: "What is Ethical Hacking?", type: "video", duration: "12min", status: "completed" },
        { id: "1-2", title: "Legal Framework & Scope", type: "reading", duration: "8min", status: "completed" },
        { id: "1-3", title: "Setting Up Your Lab Environment", type: "video", duration: "20min", status: "completed" },
      ],
    },
    {
      id: 2,
      title: "Reconnaissance & Information Gathering",
      duration: "53min",
      lessons: [
        { id: "2-1", title: "Passive Reconnaissance", type: "video", duration: "15min", status: "completed" },
        { id: "2-2", title: "Active Reconnaissance", type: "video", duration: "18min", status: "completed" },
        { id: "2-3", title: "OSINT Techniques", type: "reading", duration: "10min", status: "current" },
        { id: "2-4", title: "Reconnaissance Quiz", type: "quiz", duration: "10min", status: "locked" },
      ],
    },
    {
      id: 3,
      title: "Scanning & Enumeration",
      duration: "1h 20min",
      lessons: [
        { id: "3-1", title: "Network Scanning with Nmap", type: "video", duration: "22min", status: "locked" },
        { id: "3-2", title: "Port & Service Enumeration", type: "video", duration: "18min", status: "locked" },
        { id: "3-3", title: "Vulnerability Scanning", type: "lab", duration: "30min", status: "locked" },
        { id: "3-4", title: "Enumeration Quiz", type: "quiz", duration: "10min", status: "locked" },
      ],
    },
    {
      id: 4,
      title: "Exploitation Basics",
      duration: "1h 40min",
      lessons: [
        { id: "4-1", title: "Introduction to Metasploit", type: "video", duration: "25min", status: "locked" },
        { id: "4-2", title: "Exploiting Common Vulnerabilities", type: "video", duration: "30min", status: "locked" },
        { id: "4-3", title: "Post-Exploitation Techniques", type: "lab", duration: "45min", status: "locked" },
      ],
    },
    {
      id: 5,
      title: "Reporting & Documentation",
      duration: "35min",
      lessons: [
        { id: "5-1", title: "Writing Penetration Test Reports", type: "reading", duration: "15min", status: "locked" },
        { id: "5-2", title: "Final Assessment", type: "quiz", duration: "20min", status: "locked" },
      ],
    },
  ],
};

const discussionPosts = [
  {
    id: 1, user: "JK", name: "Jordan Kim", time: "2 hours ago",
    text: "Great course! I'm stuck on the OSINT section — any tips for finding email addresses using TheHarvester?",
    upvotes: 14, replies: [
      { user: "SC", name: "Dr. Sarah Chen", time: "1h ago", text: "Great question! Try combining TheHarvester with Maltego for better results. Also check Hunter.io for email discovery." },
      { user: "AK", name: "Alex K.", time: "45min ago", text: "I found that using multiple sources (LinkedIn, GitHub, Google dorks) together works really well." },
    ],
  },
  {
    id: 2, user: "MR", name: "Maria R.", time: "5 hours ago",
    text: "The Nmap lab environment isn't responding. Is anyone else experiencing issues with the lab sandbox?",
    upvotes: 8, replies: [
      { user: "SC", name: "Dr. Sarah Chen", time: "4h ago", text: "Hi Maria! The labs are working fine on our end. Try refreshing and clearing your browser cache." },
    ],
  },
  {
    id: 3, user: "TS", name: "Tom S.", time: "1 day ago",
    text: "What's the difference between passive and active reconnaissance in real engagements? When would you choose one over the other?",
    upvotes: 22, replies: [
      { user: "SC", name: "Dr. Sarah Chen", time: "23h ago", text: "Passive recon is used first to avoid detection. Active recon generates more noise and should only be done with explicit permission." },
      { user: "DW", name: "Dev W.", time: "20h ago", text: "In real pentests, we typically start with passive recon for 1-2 days, then move to active scanning during agreed-upon maintenance windows." },
    ],
  },
  {
    id: 4, user: "LP", name: "Lisa P.", time: "2 days ago",
    text: "Just completed Module 1! The lab environment setup was a bit tricky on macOS but I got it working with UTM. Great content overall!",
    upvotes: 19, replies: [
      { user: "BR", name: "Ben R.", time: "2d ago", text: "Same here on macOS! UTM + Kali Linux VM works great. Make sure to allocate at least 4GB RAM to the VM." },
    ],
  },
  {
    id: 5, user: "CJ", name: "Carlos J.", time: "3 days ago",
    text: "Will this course prepare me for the CEH exam? I'm planning to take it in 3 months.",
    upvotes: 31, replies: [
      { user: "SC", name: "Dr. Sarah Chen", time: "3d ago", text: "This course covers about 60% of CEH material. I'd also recommend supplementing with the official EC-Council study guide and practice exams." },
      { user: "MK", name: "Mike K.", time: "2d ago", text: "I passed CEH after this course + 2 months of additional study. Definitely doable in your timeline!" },
    ],
  },
];

// ── Icon helpers ───────────────────────────────────────────────────
function LessonTypeIcon({ type }) {
  if (type === "video") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
  if (type === "reading") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
  if (type === "quiz") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
  if (type === "lab") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
    </svg>
  );
  return null;
}

// ── Sidebar ────────────────────────────────────────────────────────
function CourseSidebar({ currentLesson, setCurrentLesson, expandedModules, setExpandedModules, completedLessons }) {
  const toggleModule = (id) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allLessons = courseData.modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter((l) => l.status === "completed" || completedLessons.has(l.id)).length;
  const totalCount = allLessons.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <aside className="w-80 flex-shrink-0 border-r border-white/5 overflow-y-auto bg-[#0a1020]" style={{ height: "calc(100vh - 4rem)" }}>
      <div className="p-5 border-b border-white/5">
        <h2 className="font-bold text-white text-sm leading-snug mb-3">{courseData.title}</h2>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>{pct}% complete</span>
          <span>{completedCount}/{totalCount} lessons</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="py-2">
        {courseData.modules.map((mod) => {
          const expanded = expandedModules.has(mod.id);
          return (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{mod.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{mod.lessons.length} lessons · {mod.duration}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"
                  className={`flex-shrink-0 ml-2 transition-transform ${expanded ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {expanded && (
                <div className="pb-1">
                  {mod.lessons.map((lesson) => {
                    const isDone = lesson.status === "completed" || completedLessons.has(lesson.id);
                    const isCurrent = currentLesson?.id === lesson.id;
                    const isLocked = lesson.status === "locked" && !completedLessons.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && setCurrentLesson(lesson)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors
                          ${isCurrent ? "bg-blue-600/20 border-r-2 border-blue-500" : "hover:bg-white/5"}
                          ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="flex-shrink-0">
                          {isDone ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          ) : isLocked ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <path d="M7 11V7a5 5 0 0110 0v4"/>
                            </svg>
                          ) : (
                            <LessonTypeIcon type={lesson.type} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate ${isCurrent ? "text-blue-300" : isDone ? "text-gray-400" : "text-gray-300"}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">{lesson.duration}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 via-slate-800 to-[#070d1b] p-8">
        <div className="relative z-10">
          <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Beginner</span>
          <h1 className="text-3xl font-extrabold text-white mt-3 mb-2">{courseData.title}</h1>
          <p className="text-gray-300 text-sm max-w-xl">Learn the fundamentals of ethical hacking and penetration testing methodologies used by security professionals worldwide.</p>
          <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              {courseData.instructor}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {courseData.rating} ({courseData.reviews} reviews)
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              {courseData.students.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {courseData.duration} total
            </span>
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">What You&apos;ll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Understand the ethical hacking methodology and legal framework",
            "Set up a professional penetration testing lab environment",
            "Perform passive and active reconnaissance on targets",
            "Use OSINT techniques to gather intelligence",
            "Scan networks with Nmap and identify open services",
            "Exploit common vulnerabilities using Metasploit",
            "Perform post-exploitation and privilege escalation",
            "Write professional penetration testing reports",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Prerequisites</h2>
        <ul className="flex flex-col gap-2.5">
          {[
            "Basic understanding of computer networking (TCP/IP, DNS, HTTP)",
            "Familiarity with Linux command line",
            "A computer with at least 8GB RAM for running virtual machines",
            "Willingness to learn and experiment in a safe lab environment",
          ].map((req, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <svg width="6" height="6" viewBox="0 0 6 6" fill="#60a5fa" className="mt-1.5 flex-shrink-0"><circle cx="3" cy="3" r="3"/></svg>
              <span className="text-sm text-gray-300">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructor */}
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Your Instructor</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">SC</div>
          <div className="flex-1">
            <h3 className="font-bold text-white">{courseData.instructor}</h3>
            <p className="text-blue-400 text-xs mb-2">Senior Penetration Tester & Educator</p>
            <p className="text-gray-400 text-sm leading-relaxed">{courseData.instructorBio}</p>
            <div className="flex items-center gap-5 mt-3 text-xs text-gray-400">
              <span>⭐ {courseData.instructorRating} rating</span>
              <span>👥 {courseData.instructorStudents.toLocaleString()} students</span>
              <span>📚 {courseData.modules.length} modules</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Lessons Tab ───────────────────────────────────────────────────
function LessonsTab({ currentLesson, setCurrentLesson, noteText, setNoteText, completedLessons, setCompletedLessons }) {
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const allLessons = courseData.modules.flatMap((m) => m.lessons);
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson?.id);

  const goTo = (idx) => { if (idx >= 0 && idx < allLessons.length && allLessons[idx].status !== "locked") setCurrentLesson(allLessons[idx]); };
  const markComplete = () => {
    if (currentLesson) setCompletedLessons((prev) => new Set([...prev, currentLesson.id]));
  };
  const isDone = currentLesson && completedLessons.has(currentLesson.id);

  return (
    <div className="flex flex-col gap-6">
      {/* Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black" />
        <button className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20 group">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-sm drop-shadow">{currentLesson?.title || "Select a lesson"}</p>
            <p className="text-gray-300 text-xs mt-0.5">{currentLesson?.duration}</p>
          </div>
          <span className="bg-black/60 text-gray-300 text-xs px-2 py-1 rounded-lg">{currentLesson?.duration}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div className="h-full bg-blue-500 w-1/3" />
        </div>
      </div>

      {/* Lesson info + Nav */}
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{currentLesson?.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              {currentLesson?.type === "video" && "Video lecture covering key concepts with practical demonstrations."}
              {currentLesson?.type === "reading" && "Reading material with in-depth explanations and reference guides."}
              {currentLesson?.type === "quiz" && "Test your knowledge with this interactive quiz."}
              {currentLesson?.type === "lab" && "Hands-on lab environment for practical skill development."}
            </p>
          </div>
          {isDone ? (
            <span className="flex items-center gap-1.5 bg-green-600/20 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Completed
            </span>
          ) : (
            <button onClick={markComplete} className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0">
              Mark as Complete
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={() => goTo(currentIdx - 1)} disabled={currentIdx <= 0}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors border border-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Previous
          </button>
          <button onClick={() => goTo(currentIdx + 1)} disabled={currentIdx >= allLessons.length - 1}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Transcript (video only) */}
      {currentLesson?.type === "video" && (
        <div className="bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden">
          <button onClick={() => setTranscriptOpen(!transcriptOpen)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Transcript
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"
              className={`transition-transform ${transcriptOpen ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {transcriptOpen && (
            <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5">
              <p className="mt-4"><span className="text-gray-500 text-xs">[00:00]</span> Welcome to this lesson on {currentLesson.title}. Today we&apos;re going to cover the fundamentals and practical applications.</p>
              <p className="mt-3"><span className="text-gray-500 text-xs">[01:23]</span> First, let&apos;s start by understanding the core concepts. Ethical hacking, also known as penetration testing, is the practice of testing systems for security vulnerabilities with explicit permission.</p>
              <p className="mt-3"><span className="text-gray-500 text-xs">[03:45]</span> There are several key methodologies we&apos;ll be using throughout this course, including reconnaissance, scanning, enumeration, exploitation, and reporting.</p>
              <p className="mt-3"><span className="text-gray-500 text-xs">[06:12]</span> Let&apos;s now look at a practical demonstration...</p>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          My Notes
        </h3>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Take notes for this lesson..."
          rows={4}
          className="w-full bg-[#070d1b] border border-white/10 text-white placeholder-gray-600 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
        />
        <button className="mt-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium px-4 py-2 rounded-lg border border-blue-500/30 transition-colors">
          Save Notes
        </button>
      </div>
    </div>
  );
}

// ── Resources Tab ─────────────────────────────────────────────────
function ResourcesTab() {
  const pdfs = [
    { name: "Course Slides — Module 1-3.pdf", size: "4.2 MB" },
    { name: "Ethical Hacking Cheat Sheet.pdf", size: "1.8 MB" },
    { name: "Penetration Testing Reference Guide.pdf", size: "6.1 MB" },
  ];
  const links = [
    { title: "OWASP Top 10", desc: "The 10 most critical web application security risks", url: "https://owasp.org" },
    { title: "CVE Database", desc: "Common Vulnerabilities and Exposures database", url: "https://cve.mitre.org" },
    { title: "HackerOne", desc: "Bug bounty platform with real-world targets", url: "https://hackerone.com" },
    { title: "TryHackMe", desc: "Beginner-friendly guided cybersecurity rooms", url: "https://tryhackme.com" },
    { title: "HackTheBox", desc: "Advanced CTF-style pentesting challenges", url: "https://hackthebox.com" },
  ];
  const tools = [
    { name: "Kali Linux", desc: "The most popular penetration testing operating system, packed with security tools.", url: "https://kali.org" },
    { name: "Burp Suite", desc: "Web vulnerability scanner and proxy tool used by professional pentesters.", url: "https://portswigger.net/burp" },
    { name: "Wireshark", desc: "Network protocol analyzer for capturing and analyzing network traffic.", url: "https://wireshark.org" },
    { name: "Metasploit", desc: "The world's most used penetration testing framework.", url: "https://metasploit.com" },
    { name: "Nmap", desc: "Network mapper for port scanning and service enumeration.", url: "https://nmap.org" },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Downloadable Materials
        </h2>
        <div className="flex flex-col gap-3">
          {pdfs.map((f) => (
            <div key={f.name} className="flex items-center justify-between bg-[#070d1b] rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{f.name}</p>
                  <p className="text-xs text-gray-500">{f.size}</p>
                </div>
              </div>
              <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium px-4 py-2 rounded-lg border border-blue-500/30 transition-colors">Download</button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">External Links</h2>
        <div className="flex flex-col gap-2">
          {links.map((l) => (
            <a key={l.title} href={l.url} target="_blank" rel="noreferrer"
              className="flex items-center justify-between bg-[#070d1b] rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors group">
              <div>
                <p className="text-sm text-white font-medium group-hover:text-blue-400 transition-colors">{l.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{l.desc}</p>
              </div>
              <span className="text-blue-400 text-sm">Visit →</span>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">Tools & Software</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tools.map((t) => (
            <div key={t.name} className="bg-[#070d1b] rounded-xl p-4 border border-white/5 flex flex-col gap-2">
              <p className="text-sm font-bold text-white">{t.name}</p>
              <p className="text-xs text-gray-400 flex-1">{t.desc}</p>
              <a href={t.url} target="_blank" rel="noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Download / Visit →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Discussion Tab ────────────────────────────────────────────────
function DiscussionTab({ discussionInput, setDiscussionInput, expandedDiscussions, setExpandedDiscussions }) {
  const [upvotes, setUpvotes] = useState({});
  const toggleUpvote = (id) => setUpvotes((p) => ({ ...p, [id]: !p[id] }));
  const toggleReplies = (id) => setExpandedDiscussions((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Post form */}
      <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">Ask a Question</h2>
        <textarea
          value={discussionInput}
          onChange={(e) => setDiscussionInput(e.target.value)}
          placeholder="Ask about this course content..."
          rows={3}
          className="w-full bg-[#070d1b] border border-white/10 text-white placeholder-gray-600 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
        />
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          Post Question
        </button>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4">
        {discussionPosts.map((post) => {
          const voted = upvotes[post.id];
          const repliesExpanded = expandedDiscussions.has(post.id);
          return (
            <div key={post.id} className="bg-[#0e1628] border border-white/5 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{post.user}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{post.name}</span>
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">{post.text}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button onClick={() => toggleUpvote(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors
                    ${voted ? "bg-blue-600/20 border-blue-500/30 text-blue-400" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={voted ? "#60a5fa" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
                    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                  </svg>
                  {post.upvotes + (voted ? 1 : 0)}
                </button>
                <button onClick={() => toggleReplies(post.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}
                </button>
              </div>
              {repliesExpanded && (
                <div className="mt-4 pl-4 border-l-2 border-white/10 flex flex-col gap-3">
                  {post.replies.map((reply, ri) => (
                    <div key={ri} className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{reply.user}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{reply.name}</span>
                          <span className="text-xs text-gray-600">{reply.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main CourseDetail ─────────────────────────────────────────────
function CourseDetail({ onBack }) {
  const [activeTab, setActiveTab] = useState("lessons");
  const [expandedModules, setExpandedModules] = useState(new Set([1, 2]));
  const [currentLesson, setCurrentLesson] = useState(
    courseData.modules[1].lessons[2] // OSINT Techniques — current
  );
  const [noteText, setNoteText] = useState("");
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [expandedDiscussions, setExpandedDiscussions] = useState(new Set());
  const [discussionInput, setDiscussionInput] = useState("");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "lessons", label: "Lessons" },
    { id: "resources", label: "Resources" },
    { id: "discussion", label: "Discussion" },
  ];

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-16">
      <div className="flex" style={{ minHeight: "calc(100vh - 4rem)" }}>
        <CourseSidebar
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          expandedModules={expandedModules}
          setExpandedModules={setExpandedModules}
          completedLessons={completedLessons}
        />
        <main className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-[#070d1b]/95 backdrop-blur-sm border-b border-white/5">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {onBack && (
                  <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors mr-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    Back
                  </button>
                )}
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {courseData.duration} total
              </div>
            </div>
          </div>

          <div className="p-6 max-w-4xl">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "lessons" && (
              <LessonsTab
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                noteText={noteText}
                setNoteText={setNoteText}
                completedLessons={completedLessons}
                setCompletedLessons={setCompletedLessons}
              />
            )}
            {activeTab === "resources" && <ResourcesTab />}
            {activeTab === "discussion" && (
              <DiscussionTab
                discussionInput={discussionInput}
                setDiscussionInput={setDiscussionInput}
                expandedDiscussions={expandedDiscussions}
                setExpandedDiscussions={setExpandedDiscussions}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseDetail;
