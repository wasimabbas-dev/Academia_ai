import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/courses', label: 'Courses', icon: '📚' },
  { path: '/tasks', label: 'Tasks', icon: '✅' },
  { path: '/timetable', label: 'Timetable', icon: '📅' },
  { path: '/materials', label: 'Materials', icon: '📄' },
  { path: '/ask', label: 'Ask AI', icon: '🤖' },
  { path: '/quizzes', label: 'Quizzes', icon: '🧠' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-xl font-bold">Student Buddy</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="mr-3 w-6">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-medium">{user.name || 'User'}</p>
              <p className="text-xs text-gray-400">{user.email || ''}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors text-left"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}