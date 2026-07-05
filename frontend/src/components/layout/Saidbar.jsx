import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen">
      <nav className="flex flex-col p-4 space-y-2">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/courses">Courses</Link>

        <Link to="/labs">Cyber Labs</Link>

        <Link to="/quiz">Quiz</Link>

        <Link to="/leaderboard">Leaderboard</Link>

        <Link to="/ai-chat">AI Chat</Link>

        <Link to="/profile">Profile</Link>

      </nav>
    </aside>
  );
}

export default Sidebar;