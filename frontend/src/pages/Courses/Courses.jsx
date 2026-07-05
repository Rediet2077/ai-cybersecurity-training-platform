import { useState } from "react";
import { Link } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "Ethical Hacking Basics",
    desc: "Learn the fundamentals of ethical hacking and penetration testing methodologies.",
    instructor: "Dr. Sarah Chen",
    lessons: 12,
    rating: 4.8,
    reviews: 230,
    price: "Free",
    priceColor: "text-green-400",
    badge: "Beginner",
    badgeColor: "bg-green-600",
    gradient: "from-blue-900 via-blue-800 to-slate-900",
    category: "Network Security",
    level: "beginner",
  },
  {
    id: 2,
    title: "Network Security",
    desc: "Protect and secure networks from modern cyber threats and intrusion attempts.",
    instructor: "Prof. James Wright",
    lessons: 18,
    rating: 4.9,
    reviews: 180,
    price: "$29.99",
    priceColor: "text-blue-400",
    badge: "Intermediate",
    badgeColor: "bg-blue-600",
    gradient: "from-purple-900 via-blue-900 to-slate-900",
    category: "Network Security",
    level: "intermediate",
  },
  {
    id: 3,
    title: "Web App Security",
    desc: "Find and fix OWASP Top 10 vulnerabilities in web applications like a professional.",
    instructor: "Alex Martinez",
    lessons: 16,
    rating: 4.7,
    reviews: 150,
    price: "$39.99",
    priceColor: "text-blue-400",
    badge: "Advanced",
    badgeColor: "bg-orange-500",
    gradient: "from-slate-900 via-red-900 to-slate-900",
    category: "Web Security",
    level: "advanced",
  },
  {
    id: 4,
    title: "Cloud Security",
    desc: "Secure cloud environments and understand AWS, Azure, and GCP security practices.",
    instructor: "Nina Patel",
    lessons: 14,
    rating: 4.6,
    reviews: 120,
    price: "$29.99",
    priceColor: "text-blue-400",
    badge: "Intermediate",
    badgeColor: "bg-blue-600",
    gradient: "from-indigo-900 via-slate-800 to-slate-900",
    category: "Network Security",
    level: "intermediate",
  },
  {
    id: 5,
    title: "Cryptography Fundamentals",
    desc: "Master encryption algorithms, hashing, PKI, and how cryptography secures data.",
    instructor: "Dr. Robert Kim",
    lessons: 10,
    rating: 4.8,
    reviews: 95,
    price: "Free",
    priceColor: "text-green-400",
    badge: "Beginner",
    badgeColor: "bg-green-600",
    gradient: "from-emerald-900 via-teal-900 to-slate-900",
    category: "Cryptography",
    level: "beginner",
  },
  {
    id: 6,
    title: "Linux Security",
    desc: "Harden Linux systems, manage users, configure firewalls and audit system logs.",
    instructor: "Marcus Thompson",
    lessons: 15,
    rating: 4.5,
    reviews: 110,
    price: "$19.99",
    priceColor: "text-blue-400",
    badge: "Intermediate",
    badgeColor: "bg-blue-600",
    gradient: "from-gray-900 via-green-900 to-slate-900",
    category: "Linux",
    level: "intermediate",
  },
  {
    id: 7,
    title: "Malware Analysis",
    desc: "Analyze, reverse-engineer and understand malicious software behavior in sandboxed environments.",
    instructor: "Dr. Elena Volkov",
    lessons: 20,
    rating: 4.9,
    reviews: 200,
    price: "$49.99",
    priceColor: "text-blue-400",
    badge: "Advanced",
    badgeColor: "bg-orange-500",
    gradient: "from-red-900 via-slate-900 to-slate-900",
    category: "Malware",
    level: "advanced",
  },
  {
    id: 8,
    title: "CTF Challenges",
    desc: "Solve capture-the-flag challenges spanning all cybersecurity domains and difficulty levels.",
    instructor: "Team SafeCampus",
    lessons: 25,
    rating: 4.9,
    reviews: 340,
    price: "Free",
    priceColor: "text-green-400",
    badge: "All Levels",
    badgeColor: "bg-purple-600",
    gradient: "from-purple-900 via-pink-900 to-slate-900",
    category: "CTF",
    level: "all",
  },
];

const categories = ["All", "Network Security", "Web Security", "Cryptography", "Linux", "Malware", "CTF"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#fbbf24" : "none"}
          stroke="#fbbf24" strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Courses() {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [enrolled, setEnrolled] = useState({});

  const filtered = allCourses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase());
    const matchLevel = activeLevel === "All" || c.level === activeLevel.toLowerCase() || c.badge === activeLevel;
    const matchCategory = activeCategory === "All" || c.category === activeCategory;
    return matchSearch && matchLevel && matchCategory;
  });

  const toggleEnroll = (id) => {
    setEnrolled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10 pt-6">
          <span className="inline-flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
            120+ Courses Available
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-3">Cybersecurity Courses</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Master cybersecurity from the ground up. Choose from beginner-friendly to advanced professional courses.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by title or topic..."
            className="w-full bg-[#0e1628] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Level filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeLevel === level
                  ? "bg-blue-600 text-white"
                  : "bg-[#0e1628] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-transparent border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-5">
          Showing <span className="text-white font-semibold">{filtered.length}</span> courses
        </p>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-900/20 group flex flex-col"
            >
              {/* Image area */}
              <div className={`relative h-36 bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                <span className={`absolute top-3 left-3 text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${c.badgeColor}`}>
                  {c.badge}
                </span>
                {enrolled[c.id] && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Enrolled
                  </span>
                )}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.35)" strokeWidth="1.2">
                  <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7L12 2z" />
                </svg>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {c.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed flex-1">{c.desc}</p>

                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  {c.instructor}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                    {c.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <StarRating rating={c.rating} />
                    <span className="text-gray-400">{c.rating} ({c.reviews})</span>
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className={`text-base font-extrabold ${c.priceColor}`}>{c.price}</span>
                  <button
                    onClick={() => toggleEnroll(c.id)}
                    className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                      enrolled[c.id]
                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {enrolled[c.id] ? "Enrolled ✓" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-gray-500 text-lg font-semibold">No courses found</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
