import { useState, useCallback, useEffect } from 'react';

const BASE = import.meta.env.VITE_API_BASE_URL || '';
const API  = `${BASE}/api/auth`;

function getToken() { return localStorage.getItem('prodigal_token'); }

// Authenticated fetch — attaches Bearer token from localStorage.
export async function apiFetch(path, opts = {}) {
  const t = getToken();
  const headers = { ...(opts.headers || {}) };
  if (t) headers.Authorization = `Bearer ${t}`;
  if (opts.body && !(opts.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  return fetch(`${BASE}${path}`, { ...opts, headers });
}

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => getToken());
  const [loading, setLoading] = useState(!!getToken());
  const [blocked, setBlocked] = useState(false);

  const loadMe = useCallback(async (t) => {
    const res = await fetch(`${API}/me`, { headers: { Authorization: `Bearer ${t}` } });
    if (res.status === 403) {
      const data = await res.json().catch(() => ({}));
      if (data.blocked) { setBlocked(true); return null; }
    }
    if (!res.ok) throw new Error('auth failed');
    return res.json();
  }, []);

  // Restore session on mount
  useEffect(() => {
    if (!token) return;
    loadMe(token)
      .then((u) => { if (u) setUser(u); })
      .catch(() => { localStorage.removeItem('prodigal_token'); setToken(null); })
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle ?token= param Google OAuth drops after redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get('token');
    const googleError = params.get('error');
    if (googleToken) {
      storeToken(googleToken);
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (googleError) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function storeToken(t) {
    localStorage.setItem('prodigal_token', t);
    setToken(t);
    setLoading(true);
    loadMe(t)
      .then((u) => { if (u) setUser(u); })
      .catch(() => { localStorage.removeItem('prodigal_token'); setToken(null); })
      .finally(() => setLoading(false));
  }

  const loginWithGoogle = useCallback(() => {
    window.location.href = `${BASE}/api/auth/google`;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('prodigal_token');
    setToken(null);
    setUser(null);
    setBlocked(false);
  }, []);

  const updatePrefs = useCallback(async (patch) => {
    const res = await apiFetch('/api/auth/me/prefs', {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const fresh = await res.json();
      setUser(fresh);
      return fresh;
    }
    return null;
  }, []);

  return { user, token, loading, blocked, loginWithGoogle, logout, updatePrefs };
}
