import { AppUserAccount, VerificationRequest } from '../types';

export const ADMIN_EMAIL = 'mfb.15.f@gmail.com';

const USERS_STORAGE_KEY = 'kachi_all_users_v1';
const REQUESTS_STORAGE_KEY = 'kachi_verification_requests_v1';
const BANNED_USERS_KEY = 'kachi_banned_uids_v1';

// Initial sample users if none exist in localStorage
const INITIAL_USERS: AppUserAccount[] = [
  {
    uid: 'admin_root',
    email: 'mfb.15.f@gmail.com',
    displayName: 'Hamody MFB (المدير)',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-01-10T12:00:00Z',
    isBanned: false,
    isVerified: true,
    psnId: 'HamoDyMFB',
    role: 'admin'
  },
  {
    uid: 'user_falcon_999',
    email: 'falcon.ksa@gmail.com',
    displayName: 'Fahad Al-Harbi',
    photoURL: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-02-01T08:30:00Z',
    isBanned: false,
    isVerified: true,
    psnId: 'FALCON_KSA_999',
    role: 'user'
  },
  {
    uid: 'user_samurai_jed',
    email: 'jeddah.gamer@hotmail.com',
    displayName: 'Omar Jed',
    photoURL: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-02-14T14:15:00Z',
    isBanned: false,
    isVerified: true,
    psnId: 'SAMURAI_JEDDAH',
    role: 'user'
  },
  {
    uid: 'user_riyadh_x',
    email: 'sultan.ps@gmail.com',
    displayName: 'Sultan Gamer',
    photoURL: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-03-01T10:00:00Z',
    isBanned: false,
    isVerified: false,
    psnId: 'RIYADH_ELITE_X',
    role: 'user'
  },
  {
    uid: 'user_banned_test',
    email: 'cheater.spammer@yahoo.com',
    displayName: 'Spam Bot 99',
    createdAt: '2026-03-05T19:20:00Z',
    isBanned: true,
    isVerified: false,
    psnId: 'CHEATER_999',
    role: 'user'
  }
];

const INITIAL_REQUESTS: VerificationRequest[] = [
  {
    id: 'req_001',
    userEmail: 'sultan.ps@gmail.com',
    displayName: 'Sultan Gamer',
    psnId: 'RIYADH_ELITE_X',
    requestedAt: '2026-09-11T14:30:00Z',
    status: 'pending',
    notes: 'قام بإضافة حساب HamoDyMFB بالسوني وينتظر المراجعة'
  },
  {
    id: 'req_002',
    userEmail: 'tariq.khobar@gmail.com',
    displayName: 'طارق الشرقية',
    psnId: 'KHOBAR_SNIPER',
    requestedAt: '2026-09-12T05:10:00Z',
    status: 'pending',
    notes: 'طلب جديد للتوثيق'
  },
  {
    id: 'req_003',
    userEmail: 'falcon.ksa@gmail.com',
    displayName: 'Fahad Al-Harbi',
    psnId: 'FALCON_KSA_999',
    requestedAt: '2026-02-01T09:00:00Z',
    status: 'approved',
    reviewedAt: '2026-02-01T11:00:00Z',
    notes: 'تم التحقق من الحساب وإدراجه في صدارة المتصدرين'
  }
];

export function getStoredUsers(): AppUserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: AppUserAccount[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users', err);
  }
}

export function getStoredRequests(): VerificationRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REQUESTS;
  }
}

export function saveRequests(requests: VerificationRequest[]): void {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed to save requests', err);
  }
}

// Ensure logged in Firebase user exists in our app users store
export function syncCurrentUserRecord(user: { uid: string; email?: string | null; displayName?: string | null; photoURL?: string | null }): AppUserAccount {
  const users = getStoredUsers();
  const email = (user.email || '').trim().toLowerCase();
  const isAdmin = email === ADMIN_EMAIL.toLowerCase();

  const existingIndex = users.findIndex(u => u.uid === user.uid || (u.email && u.email.toLowerCase() === email));

  if (existingIndex >= 0) {
    const existing = users[existingIndex];
    const updated: AppUserAccount = {
      ...existing,
      email: user.email || existing.email,
      displayName: user.displayName || existing.displayName,
      photoURL: user.photoURL || existing.photoURL,
      role: isAdmin ? 'admin' : existing.role,
      // Keep existing verification or ban status
    };
    users[existingIndex] = updated;
    saveUsers(users);
    return updated;
  }

  // Create new user entry
  const newUser: AppUserAccount = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'لاعب جديد',
    photoURL: user.photoURL || undefined,
    createdAt: new Date().toISOString(),
    isBanned: false,
    isVerified: isAdmin, // Admin is auto verified
    role: isAdmin ? 'admin' : 'user'
  };

  users.unshift(newUser);
  saveUsers(users);
  return newUser;
}

// Add a new verification request
export function submitVerificationRequest(user: { email: string; displayName: string; uid?: string }, psnId: string): VerificationRequest {
  const requests = getStoredRequests();
  
  // check if pending request exists for this email or psnId
  const existingReq = requests.find(r => (r.userEmail.toLowerCase() === user.email.toLowerCase() || r.psnId.toLowerCase() === psnId.toLowerCase()) && r.status === 'pending');
  if (existingReq) {
    existingReq.requestedAt = new Date().toISOString();
    saveRequests(requests);
    return existingReq;
  }

  const newReq: VerificationRequest = {
    id: `req_${Date.now()}`,
    userEmail: user.email,
    displayName: user.displayName || user.email.split('@')[0],
    psnId: psnId.trim(),
    requestedAt: new Date().toISOString(),
    status: 'pending',
    notes: 'طلب توثيق جديد من المستخدم'
  };

  requests.unshift(newReq);
  saveRequests(requests);

  // also associate psnId to user in users list
  const users = getStoredUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (userIdx >= 0) {
    users[userIdx].psnId = psnId.trim();
    saveUsers(users);
  }

  return newReq;
}

// Admin Action: Toggle ban status
export function toggleUserBan(uid: string): { success: boolean; isBanned: boolean } {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index === -1) return { success: false, isBanned: false };

  // Never ban super admin
  if (users[index].email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, isBanned: false };
  }

  users[index].isBanned = !users[index].isBanned;
  saveUsers(users);
  return { success: true, isBanned: users[index].isBanned };
}

// Admin Action: Toggle or set verification status
export function toggleUserVerification(uid: string, forceStatus?: boolean): { success: boolean; isVerified: boolean } {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index === -1) return { success: false, isVerified: false };

  const newStatus = typeof forceStatus === 'boolean' ? forceStatus : !users[index].isVerified;
  users[index].isVerified = newStatus;
  saveUsers(users);

  // If verified, mark any pending requests for this email as approved
  if (newStatus && users[index].email) {
    const requests = getStoredRequests();
    let changed = false;
    requests.forEach(r => {
      if (r.userEmail.toLowerCase() === users[index].email.toLowerCase() && r.status === 'pending') {
        r.status = 'approved';
        r.reviewedAt = new Date().toISOString();
        changed = true;
      }
    });
    if (changed) saveRequests(requests);
  }

  return { success: true, isVerified: newStatus };
}

// Admin Action: Approve verification request
export function approveVerificationRequest(requestId: string): boolean {
  const requests = getStoredRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return false;

  req.status = 'approved';
  req.reviewedAt = new Date().toISOString();
  saveRequests(requests);

  // Update user in users list
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === req.userEmail.toLowerCase());
  if (user) {
    user.isVerified = true;
    user.psnId = req.psnId;
    saveUsers(users);
  }

  return true;
}

// Admin Action: Reject verification request
export function rejectVerificationRequest(requestId: string, reason?: string): boolean {
  const requests = getStoredRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return false;

  req.status = 'rejected';
  req.reviewedAt = new Date().toISOString();
  if (reason) req.notes = reason;
  saveRequests(requests);

  // Also remove verification flag if rejected
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === req.userEmail.toLowerCase());
  if (user) {
    user.isVerified = false;
    saveUsers(users);
  }

  return true;
}

// Helper to check if current logged-in user is verified
export function isUserVerified(email?: string | null): boolean {
  if (!email) return false;
  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return true;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return !!user?.isVerified;
}

// Helper to check if current user is banned
export function isUserBanned(email?: string | null): boolean {
  if (!email) return false;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return !!user?.isBanned;
}
