import React, { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/** Gate: renders children only for an admin session, otherwise a login form. */
const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, loading, session, signInAdmin, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (isAdmin) return <>{children}</>;

  // Signed in (as an admin email) but flag missing / not an admin
  const isNonAdminSignedIn = !!session && !session.user.is_anonymous;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await signInAdmin(email, password);
    if (err) setError(err);
    setBusy(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-slate-900 text-white rounded-lg p-2">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">FYB Admin</h1>
        </div>

        {isNonAdminSignedIn ? (
          <div className="text-center">
            <p className="text-sm text-red-600 mb-4">
              This account isn’t authorised for the admin dashboard.
            </p>
            <button onClick={signOut} className="text-sm text-blue-600 hover:underline">
              Log out and try another account
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="admin@fyb.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center"
            >
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign in'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequireAdmin;
