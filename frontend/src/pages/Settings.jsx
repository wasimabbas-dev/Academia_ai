import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = () => {};

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences.</p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-500">{user?.email || ''}</p>
            </div>
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {user?.role || 'student'}
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h2>
        <button
          onClick={() => { logout(); }}
          className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Sign out
        </button>
      </Card>
    </div>
  );
}