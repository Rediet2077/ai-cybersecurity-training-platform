import { useState, useRef, useEffect } from "react";

const suggestedQuestions = [
  "What is SQL Injection?",
  "Explain XSS attacks",
  "How does JWT work?",
  "What is buffer overflow?",
  "Explain CSRF attacks",
  "How to prevent command injection?",
];

const chatHistory = [
  { id: 1, title: "SQL Injection basics", date: "Today, 2:30 PM", preview: "SQL Injection is a web security..." },
  { id: 2, title: "Network scanning tools", date: "Yesterday, 4:15 PM", preview: "Nmap is a powerful port scanner..." },
  { id: 3, title: "Password hashing", date: "Dec 18, 2024", preview: "bcrypt is recommended because..." },
];

const initialMessages = [
  {
    id: 1,
    role: "user",
    content: "What is SQL Injection?",
    time: "2:28 PM",
  },
  {
    id: 2,
    role: "ai",
    content: `SQL Injection is a web security vulnerability that allows attackers to interfere with database queries. It occurs when user input is not properly sanitized and is directly included in SQL queries.

Attackers can use it to:
• View data they shouldn't access
• Modify or delete database data
• Bypass login authentication
• In some cases, execute OS commands

**Prevention:** Use parameterized queries (prepared statements), input validation, and the principle of least privilege.`,
    time: "2:28 PM",
  },
  {
    id: 3,
    role: "user",
    content: "How do I prevent it?",
    time: "2:29 PM",
  },
  {
    id: 4,
    role: "ai",
    content: `To prevent SQL Injection:

1. **Use Parameterized Queries** (Prepared Statements) — never concatenate user input directly into SQL strings.

2. **Use an ORM** like Django ORM, SQLAlchemy, or Hibernate that handles escaping automatically.

3. **Validate and sanitize all inputs** — reject unexpected characters, enforce strict data types.

4. **Apply Principle of Least Privilege** — database accounts should have minimum required permissions.

5. **Use a Web Application Firewall (WAF)** — adds a layer of protection against known attack patterns.

6. **Regular security audits** and penetration testing to catch vulnerabilities early.`,
    time: "2:29 PM",
  },
];

const mockAIResponse = (message) =>
  `Great question! In cybersecurity, this is a critical topic. Your question was: "${message}"\n\nI recommend checking the OWASP Top 10 for more details on this vulnerability type. Would you like me to explain any specific aspect in more detail?`;

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-[#0e1628] border border-white/10 text-gray-200 rounded-bl-sm"
          }`}
        >
          {msg.content}
        </div>
        <span className="text-xs text-gray-600">{msg.time}</span>
      </div>
    </div>
  );
}

function AIChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "code"
  const [codeInput, setCodeInput] = useState("");
  const [codeResult, setCodeResult] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const userMsg = { id: Date.now(), role: "user", content: msgText, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: mockAIResponse(msgText),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const analyzeCode = () => {
    if (!codeInput.trim()) return;
    setCodeResult(null);
    setTimeout(() => {
      setCodeResult({
        vulnerabilities: [
          { severity: "critical", type: "SQL Injection", line: 3, desc: "User input concatenated directly into SQL query — use prepared statements." },
          { severity: "high", type: "XSS", line: 7, desc: "Unsanitized user input rendered as HTML — escape output with htmlspecialchars()." },
          { severity: "medium", type: "Insecure Password Storage", line: 12, desc: "Password stored as plain MD5 hash — use bcrypt or Argon2." },
        ],
      });
    }, 1200);
  };

  const severityColor = { critical: "text-red-400 bg-red-600/10 border-red-500/30", high: "text-orange-400 bg-orange-600/10 border-orange-500/30", medium: "text-yellow-400 bg-yellow-600/10 border-yellow-500/30" };

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 flex flex-col" style={{ height: "100vh" }}>
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-6 pb-6 gap-5 overflow-hidden" style={{ height: "calc(100vh - 5rem)" }}>

        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pt-4">
          {/* Header */}
          <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Your personal cybersecurity tutor — available 24/7.
            </p>
          </div>

          {/* Suggested Questions */}
          <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Suggested</p>
            <div className="flex flex-col gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-xs text-gray-300 hover:text-blue-400 bg-white/5 hover:bg-blue-600/10 border border-white/5 hover:border-blue-500/20 rounded-xl px-3 py-2.5 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className="bg-[#0e1628] border border-white/5 rounded-2xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">History</p>
            <div className="flex flex-col gap-2">
              {chatHistory.map((h) => (
                <div key={h.id} className="bg-white/5 border border-white/5 rounded-xl p-3 cursor-pointer hover:border-white/10 transition-colors">
                  <p className="text-xs font-semibold text-white truncate">{h.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{h.date}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{h.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">SafeCampus AI</p>
                <p className="text-xs text-gray-400">Cybersecurity Expert</p>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex gap-2">
              {["chat", "code"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === t ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t === "chat" ? "💬 Chat" : "🔍 Analyze Code"}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "chat" ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                {isTyping && (
                  <div className="flex items-end gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <div className="bg-[#070d1b] border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5 flex-shrink-0">
                <div className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask about any cybersecurity topic... (Enter to send)"
                    rows={2}
                    className="flex-1 bg-[#070d1b] border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="self-end bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2 flex-shrink-0"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Code Analysis Tab */
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Paste code to analyze for vulnerabilities
                </label>
                <textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder={`// Paste your code here\n// Example:\n$query = "SELECT * FROM users WHERE id = " . $_GET['id'];\n$result = mysqli_query($conn, $query);`}
                  rows={10}
                  className="w-full bg-[#070d1b] border border-white/10 text-green-400 placeholder-gray-600 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              <button
                onClick={analyzeCode}
                disabled={!codeInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Analyze for Vulnerabilities
              </button>

              {codeResult && (
                <div className="bg-[#070d1b] border border-white/5 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <p className="text-sm font-bold text-white">
                      Found {codeResult.vulnerabilities.length} vulnerabilities
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {codeResult.vulnerabilities.map((v, i) => (
                      <div key={i} className={`border rounded-xl p-4 ${severityColor[v.severity]}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${severityColor[v.severity]}`}>
                              {v.severity}
                            </span>
                            <span className="text-sm font-semibold text-white">{v.type}</span>
                          </div>
                          <span className="text-xs text-gray-400">Line {v.line}</span>
                        </div>
                        <p className="text-xs text-gray-300">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIChat;
