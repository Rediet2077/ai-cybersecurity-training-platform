import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png";

/* ── Feature cards data ── */
const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z"/>
      </svg>
    ),
    bg: "bg-blue-600",
    title: "Structured Courses",
    desc: "Learn cybersecurity from beginner to advanced with well-structured modules.",
    color: "text-blue-400",
    to: "/courses",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
    bg: "bg-purple-600",
    title: "Cyber Labs",
    desc: "Practice in real-world simulations and build practical hacking skills.",
    color: "text-purple-400",
    to: "/labs",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    bg: "bg-green-600",
    title: "AI Assistant",
    desc: "Get instant help, explanations, and guidance from our AI cybersecurity tutor.",
    color: "text-green-400",
    to: "/ai-chat",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    bg: "bg-orange-500",
    title: "Quizzes & Challenges",
    desc: "Test your knowledge and earn points by solving cybersecurity quizzes.",
    color: "text-orange-400",
    to: "/quiz",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    bg: "bg-red-500",
    title: "Leaderboard",
    desc: "Compete with learners worldwide and climb to the top.",
    color: "text-red-400",
    to: "/leaderboard",
  },
];

/* ── Stats data ── */
const stats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>
      </svg>
    ),
    value: "10,000+",
    label: "Active Learners",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    value: "120+",
    label: "Courses",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
    value: "50+",
    label: "Cyber Labs",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8">
        <path d="M8 21h8m-4-4v4M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.5l-4.9 2.7.9-5.5L4 8.8l5.5-.8z"/>
      </svg>
    ),
    value: "1,000+",
    label: "Challenges",
  },
];

/* ── Courses data ── */
const courses = [
  {
    title: "Ethical Hacking Basics",
    desc: "Learn the fundamentals of ethical hacking and penetration testing.",
    lessons: 12,
    rating: "4.8",
    reviews: 230,
    price: "Free",
    priceColor: "text-green-400",
    badge: "Beginner",
    badgeColor: "bg-green-600",
    gradient: "from-blue-900 via-blue-800 to-slate-900",
  },
  {
    title: "Network Security",
    desc: "Protect and secure networks from modern cyber threats.",
    lessons: 18,
    rating: "4.9",
    reviews: 180,
    price: "$29.99",
    priceColor: "text-blue-400",
    badge: "Intermediate",
    badgeColor: "bg-blue-600",
    gradient: "from-purple-900 via-blue-900 to-slate-900",
  },
  {
    title: "Web Application Security",
    desc: "Find and fix vulnerabilities in web applications like a pro.",
    lessons: 16,
    rating: "4.7",
    reviews: 150,
    price: "$39.99",
    priceColor: "text-blue-400",
    badge: "Advanced",
    badgeColor: "bg-orange-500",
    gradient: "from-slate-900 via-blue-900 to-indigo-900",
  },
  {
    title: "Cloud Security",
    desc: "Secure cloud environments and understand AWS security.",
    lessons: 14,
    rating: "4.6",
    reviews: 120,
    price: "$29.99",
    priceColor: "text-blue-400",
    badge: "Intermediate",
    badgeColor: "bg-purple-600",
    gradient: "from-indigo-900 via-slate-800 to-slate-900",
  },
];

/* ── Why Choose section ── */
const whyChoose = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: "Practical Learning",
    desc: "Hands-on labs and real world scenarios",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
      </svg>
    ),
    title: "AI-Powered",
    desc: "Smart assistant to guide your learning",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: "Certification",
    desc: "Earn certificates and boost your career",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: "Community",
    desc: "Learn and grow with global community",
  },
];

function Home() {
  return (
    <div className="bg-[#070d1b] text-white min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative pt-24 pb-16 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, #0d2240 0%, #070d1b 70%)",
        }}
      >
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="z-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-medium px-3 py-1 rounded-full mb-6">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              AI-Powered Cybersecurity Education
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              Learn. Practice.<br />
              <span className="text-blue-500">Stay Secure.</span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md">
              Master cybersecurity skills with interactive labs, AI guidance,
              quizzes, and hands-on challenges designed for the real world.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/register"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z"/>
                </svg>
                Get Started
              </Link>
              <Link
                to="/courses"
                className="flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                </svg>
                Explore Courses
              </Link>
            </div>

            {/* Badge row */}
            <div className="flex flex-wrap gap-5 text-sm text-gray-400">
              {["Hands-on Labs", "AI Assistant", "Certificates", "Leaderboard"].map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right – hero image */}
          <div className="hidden md:flex justify-center items-center relative">
            {/* Glow */}
            <div className="absolute w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
            <img
              src={heroImg}
              alt="Cybersecurity Hero"
              className="relative z-10 w-full max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#0e1628] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors"
            >
              <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-sm text-white">{f.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              <Link to={f.to} className={`text-xs font-semibold ${f.color} flex items-center gap-1 mt-auto`}>
                Learn More
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="bg-[#0e1628] border border-white/5 rounded-2xl px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 pl-4 first:pl-0">
              {s.icon}
              <div>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR COURSES ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">Popular Courses</h2>
          <p className="text-gray-400 text-sm">
            Start your journey with our most in-demand cybersecurity courses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((c) => (
            <div
              key={c.title}
              className="bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors group"
            >
              {/* Card image area */}
              <div className={`relative h-40 bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                <span className={`absolute top-3 right-3 text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${c.badgeColor}`}>
                  {c.badge}
                </span>
                {/* Decorative shield icon */}
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.4)" strokeWidth="1.2">
                  <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z"/>
                </svg>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                  {c.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>

                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                    {c.lessons} Lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {c.rating} ({c.reviews})
                  </span>
                  <span className={`font-bold ${c.priceColor}`}>{c.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="bg-[#0e1628] border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Left label */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">Why Choose</p>
              <p className="text-lg font-bold text-white">SafeCampus?</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/10" />

          {/* Right items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {whyChoose.map((w) => (
              <div key={w.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">{w.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white">{w.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
