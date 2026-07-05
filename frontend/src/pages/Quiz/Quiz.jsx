import { useState, useEffect } from "react";

const quizzesData = [
  {
    id: 1,
    title: "SQL Injection Fundamentals",
    questions: 10,
    time: 15,
    xp: 200,
    difficulty: "Beginner",
    diffColor: "bg-green-600",
    status: "completed",
    score: 90,
  },
  {
    id: 2,
    title: "XSS Attack Vectors",
    questions: 8,
    time: 12,
    xp: 150,
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    status: "completed",
    score: 75,
  },
  {
    id: 3,
    title: "Network Security Basics",
    questions: 3,
    time: 20,
    xp: 250,
    difficulty: "Beginner",
    diffColor: "bg-green-600",
    status: "not-attempted",
    score: null,
  },
  {
    id: 4,
    title: "Cryptography 101",
    questions: 10,
    time: 15,
    xp: 200,
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    status: "not-attempted",
    score: null,
  },
  {
    id: 5,
    title: "Linux Security",
    questions: 15,
    time: 25,
    xp: 300,
    difficulty: "Advanced",
    diffColor: "bg-orange-500",
    status: "not-attempted",
    score: null,
  },
  {
    id: 6,
    title: "Web App Security",
    questions: 10,
    time: 15,
    xp: 200,
    difficulty: "Intermediate",
    diffColor: "bg-blue-600",
    status: "completed",
    score: 80,
  },
];

const networkQuestions = [
  {
    id: 1,
    question: "Which protocol operates at Layer 3 (Network Layer) of the OSI model?",
    options: ["HTTP", "TCP", "IP", "FTP"],
    correct: 2,
  },
  {
    id: 2,
    question: "What does DNS stand for in computer networking?",
    options: [
      "Domain Name System",
      "Data Network Service",
      "Digital Node Security",
      "Dynamic Name Server",
    ],
    correct: 0,
  },
  {
    id: 3,
    question: "Which port number does HTTPS use by default?",
    options: ["80", "443", "8080", "22"],
    correct: 1,
  },
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function QuizList({ onStart }) {
  const completed = quizzesData.filter((q) => q.status === "completed").length;
  const avgScore = Math.round(
    quizzesData.filter((q) => q.score !== null).reduce((sum, q) => sum + q.score, 0) /
    quizzesData.filter((q) => q.score !== null).length
  );
  const totalXp = quizzesData.filter((q) => q.status === "completed").reduce((sum, q) => sum + q.xp, 0);

  return (
    <div>
      {/* Header */}
      <div className="pt-6 mb-8">
        <span className="inline-flex items-center gap-1.5 bg-green-600/10 border border-green-500/20 text-green-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Test Your Knowledge
        </span>
        <h1 className="text-4xl font-extrabold text-white mb-2">Quizzes &amp; Challenges</h1>
        <p className="text-gray-400 text-sm">Prove your cybersecurity knowledge and earn XP points.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Quizzes", value: String(quizzesData.length), icon: "📋", color: "text-blue-400", bg: "bg-blue-600/10" },
          { label: "Completed", value: String(completed), icon: "✅", color: "text-green-400", bg: "bg-green-600/10" },
          { label: "Average Score", value: `${avgScore}%`, icon: "📊", color: "text-purple-400", bg: "bg-purple-600/10" },
          { label: "XP Earned", value: `${totalXp.toLocaleString()}`, icon: "⭐", color: "text-yellow-400", bg: "bg-yellow-600/10" },
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

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzesData.map((q) => (
          <div key={q.id} className="bg-[#0e1628] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-blue-500/20 transition-all group">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${q.diffColor}`}>
                {q.difficulty}
              </span>
              {q.status === "completed" ? (
                <span className="flex items-center gap-1 text-xs font-bold text-green-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {q.score}% Score
                </span>
              ) : (
                <span className="text-xs text-gray-500">Not attempted</span>
              )}
            </div>

            <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors flex-1">
              {q.title}
            </h3>

            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {q.questions} Qs
              </div>
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {q.time} min
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {q.xp} XP
              </div>
            </div>

            {q.status === "completed" && (
              <div className="w-full bg-white/5 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${q.score >= 80 ? "bg-green-500" : q.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${q.score}%` }}
                />
              </div>
            )}

            <button
              onClick={() => onStart(q)}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                q.status === "completed"
                  ? "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {q.status === "completed" ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                  Retake Quiz
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Quiz
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizTaking({ quiz, onBack }) {
  const questions = networkQuestions;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.time * 60);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const progress = ((currentQ + 1) / questions.length) * 100;

  const handleSelect = (optionIndex) => {
    setSelected((prev) => ({ ...prev, [currentQ]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctCount = questions.filter((q, i) => selected[i] === q.correct).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Results */}
        <div className="bg-[#0e1628] border border-white/10 rounded-2xl p-8 text-center mb-6">
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${
            scorePercent >= 70 ? "bg-green-600/20 border-2 border-green-500" : "bg-red-600/20 border-2 border-red-500"
          }`}>
            <span className={`text-3xl font-extrabold ${scorePercent >= 70 ? "text-green-400" : "text-red-400"}`}>
              {scorePercent}%
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {scorePercent >= 70 ? "Great Job! 🎉" : "Keep Practicing 💪"}
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            You answered {correctCount} out of {questions.length} questions correctly.
          </p>
          {scorePercent >= 70 && (
            <div className="inline-flex items-center gap-2 bg-yellow-600/10 border border-yellow-500/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              +{quiz.xp} XP Earned
            </div>
          )}
        </div>

        {/* Question review */}
        <div className="flex flex-col gap-4 mb-6">
          {questions.map((q, i) => {
            const isCorrect = selected[i] === q.correct;
            const wasAnswered = selected[i] !== undefined;
            return (
              <div key={q.id} className={`bg-[#0e1628] border rounded-2xl p-5 ${isCorrect ? "border-green-500/30" : "border-red-500/30"}`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isCorrect ? "bg-green-600" : "bg-red-600"}`}>
                    {isCorrect ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-white font-medium">Q{i + 1}: {q.question}</p>
                </div>
                <div className="flex flex-col gap-2 ml-9">
                  {q.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={`text-xs px-3 py-2 rounded-lg border ${
                        oi === q.correct
                          ? "border-green-500/50 bg-green-600/10 text-green-300"
                          : wasAnswered && oi === selected[i] && oi !== q.correct
                          ? "border-red-500/50 bg-red-600/10 text-red-300"
                          : "border-white/5 text-gray-400"
                      }`}
                    >
                      {oi === q.correct && "✓ "}{opt}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onBack}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Exit Quiz
        </button>
        <div className={`flex items-center gap-2 text-sm font-mono font-bold ${timeLeft < 60 ? "text-red-400" : "text-white"}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-[#0e1628] border border-white/10 rounded-2xl overflow-hidden mb-5">
        {/* Progress bar */}
        <div className="h-1.5 bg-white/5">
          <div className="h-1.5 bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-gray-400">Question {currentQ + 1} of {questions.length}</span>
            <span className={`text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${quiz.diffColor}`}>
              {quiz.difficulty}
            </span>
          </div>

          <h2 className="text-lg font-bold text-white mb-6 leading-snug">
            {questions[currentQ].question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all ${
                  selected[currentQ] === i
                    ? "bg-blue-600/20 border-blue-500 text-white"
                    : "bg-[#070d1b] border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold mr-3 flex-shrink-0 ${
                  selected[currentQ] === i ? "bg-blue-600 text-white" : "bg-white/10 text-gray-400"
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentQ < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={selected[currentQ] === undefined}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Next Question
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selected[currentQ] === undefined}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

function Quiz() {
  const [activeQuiz, setActiveQuiz] = useState(null);

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {activeQuiz ? (
          <QuizTaking quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
        ) : (
          <QuizList onStart={(q) => setActiveQuiz(q)} />
        )}
      </div>
    </div>
  );
}

export default Quiz;
