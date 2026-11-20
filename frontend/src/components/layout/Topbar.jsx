import { useAuth } from '../../hooks/useAuth';

export default function Topbar({ user, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">Student Buddy</h2>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            Welcome, {user.name}
          </span>
        )}
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}