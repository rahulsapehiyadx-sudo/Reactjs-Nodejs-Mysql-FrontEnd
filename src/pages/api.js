// API helper (one place to call your backend)
const API_BASE = 'http://localhost:3000/api';

// POST /api/register { username, email, password }
export async function registerUser({ username, email, password}) {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, email, password }),
    });

    // Returned both ok flag and parsed json for simple handling in UI 
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
}

// POST /api/login {email, password}

export async function loginUser({ email, password }) {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
    })

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
}
