import { AppUserAccount, VerificationRequest, TrophyStats } from '../types';
import { db, doc, setDoc, collection, onSnapshot, getDocs } from './firebase';

export const ADMIN_EMAIL = 'mfb.15.f@gmail.com';

const USERS_STORAGE_KEY = 'kachi_all_users_v3';
const REQUESTS_STORAGE_KEY = 'kachi_verification_requests_v3';
const ADMIN_EMAILS_KEY = 'kachi_admin_emails_v3';

// Known initial users list to ensure accounts like sltanr698@gmail.com and admin are always visible even before network fetch
const SEED_USERS: AppUserAccount[] = [
  {
    uid: 'user_admin_mfb',
    email: 'mfb.15.f@gmail.com',
    displayName: 'المدير العام',
    createdAt: '2026-09-13T10:00:00.000Z',
    lastLoginAt: '2026-09-13T12:00:00.000Z',
    isBanned: false,
    isVerified: false,
    role: 'admin',
    verificationSecret: 'KC-7721'
  },
  {
    uid: 'user_sltanr698',
    email: 'sltanr698@gmail.com',
    displayName: 'سلطان',
    createdAt: '2026-09-13T11:00:00.000Z',
    lastLoginAt: '2026-09-13T12:30:00.000Z',
    isBanned: false,
    isVerified: false,
    role: 'user',
    verificationSecret: 'KC-5819'
  }
];

// Event names for zero-latency local & cross-tab broadcasting
export const DATA_SYNC_EVENT = 'kachi_data_synced';

export function broadcastDataChange(topic?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_SYNC_EVENT, { detail: { topic, timestamp: Date.now() } }));
  }
}

// Generates an unguessable 6-digit verification secret code (e.g. "KC-8492")
export function generateRandomSecret(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `KC-${num}`;
}

export function getStoredUsers(): AppUserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    let list: AppUserAccount[] = raw ? JSON.parse(raw) : [];
    
    // Ensure seed users (like sltanr698@gmail.com and admin) exist in local storage
    let updated = false;
    for (const seed of SEED_USERS) {
      if (!list.some(u => u.email?.toLowerCase() === seed.email.toLowerCase())) {
        list.unshift(seed);
        updated = true;
      }
    }

    if (updated || !raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list));
    }
    return list;
  } catch {
    return SEED_USERS;
  }
}

export function saveUsers(users: AppUserAccount[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    broadcastDataChange('users');
  } catch (err) {
    console.error('Failed to save users locally', err);
  }
}

export function getStoredRequests(): VerificationRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRequests(requests: VerificationRequest[]): void {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
    broadcastDataChange('requests');
  } catch (err) {
    console.error('Failed to save requests locally', err);
  }
}

export function getAdminEmails(): string[] {
  try {
    const raw = localStorage.getItem(ADMIN_EMAILS_KEY);
    if (!raw) {
      const initial = [ADMIN_EMAIL.toLowerCase()];
      localStorage.setItem(ADMIN_EMAILS_KEY, JSON.stringify(initial));
      return initial;
    }
    const list: string[] = JSON.parse(raw);
    if (!list.map(e => e.toLowerCase()).includes(ADMIN_EMAIL.toLowerCase())) {
      list.push(ADMIN_EMAIL.toLowerCase());
    }
    return list;
  } catch {
    return [ADMIN_EMAIL.toLowerCase()];
  }
}

export function saveAdminEmails(emails: string[]): void {
  try {
    const clean = Array.from(new Set(emails.map(e => e.trim().toLowerCase())));
    if (!clean.includes(ADMIN_EMAIL.toLowerCase())) {
      clean.push(ADMIN_EMAIL.toLowerCase());
    }
    localStorage.setItem(ADMIN_EMAILS_KEY, JSON.stringify(clean));
    broadcastDataChange('admins');
  } catch (err) {
    console.error('Failed to save admin emails', err);
  }
}

export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) return true;
  const adminList = getAdminEmails().map(e => e.toLowerCase());
  return adminList.includes(cleanEmail);
}

// User is ONLY verified if they actually have a submitted PSN ID that has been approved with trophies
export function isUserVerified(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  return !!user?.isVerified && !user?.isBanned && !!user?.psnId;
}

export function isUserBanned(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) return false;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  return !!user?.isBanned;
}

// Ensure logged-in user is created/updated in the master users list instantly in Firestore + LocalStorage
export function syncCurrentUserRecord(user: { uid: string; email?: string | null; displayName?: string | null; photoURL?: string | null }): AppUserAccount {
  const users = getStoredUsers();
  const email = (user.email || '').trim().toLowerCase();
  const isSuperAdmin = email === ADMIN_EMAIL.toLowerCase();
  const adminList = getAdminEmails();
  const hasAdminRole = isSuperAdmin || adminList.includes(email);

  const existingIndex = users.findIndex(u => u.uid === user.uid || (u.email && u.email.toLowerCase() === email));

  let finalUser: AppUserAccount;

  if (existingIndex >= 0) {
    const existing = users[existingIndex];
    finalUser = {
      ...existing,
      uid: user.uid || existing.uid,
      email: user.email || existing.email,
      displayName: user.displayName || existing.displayName,
      photoURL: user.photoURL || existing.photoURL,
      lastLoginAt: new Date().toISOString(),
      role: hasAdminRole ? 'admin' : existing.role,
      verificationSecret: existing.verificationSecret || generateRandomSecret()
    };
    users[existingIndex] = finalUser;
  } else {
    finalUser = {
      uid: user.uid || `u_${Date.now()}`,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'لاعب جديد',
      photoURL: user.photoURL || undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isBanned: false,
      isVerified: false,
      role: hasAdminRole ? 'admin' : 'user',
      verificationSecret: generateRandomSecret()
    };
    users.unshift(finalUser);
  }

  saveUsers(users);

  // Sync to Cloud Firestore instantly
  try {
    if (db && finalUser.uid) {
      setDoc(doc(db, 'users', finalUser.uid), {
        uid: finalUser.uid,
        email: finalUser.email,
        displayName: finalUser.displayName,
        photoURL: finalUser.photoURL || null,
        createdAt: finalUser.createdAt,
        lastLoginAt: finalUser.lastLoginAt,
        isBanned: finalUser.isBanned || false,
        isVerified: finalUser.isVerified || false,
        psnId: finalUser.psnId || null,
        role: finalUser.role,
        verificationSecret: finalUser.verificationSecret,
        trophyStats: finalUser.trophyStats || null
      }, { merge: true }).catch((err) => {
        console.warn('Firestore user write notice:', err);
      });
    }
  } catch (err) {
    console.warn('Firestore user sync exception:', err);
  }

  return finalUser;
}

// Get or generate user verification secret
export function getUserSecret(email: string): string {
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user && user.verificationSecret) {
    return user.verificationSecret;
  }
  const secret = generateRandomSecret();
  if (user) {
    user.verificationSecret = secret;
    saveUsers(users);
  }
  return secret;
}

// Submit verification request with secret password - syncs to Firestore & LocalStorage
export function submitVerificationRequest(user: { email: string; displayName: string; uid?: string }, psnId: string): VerificationRequest {
  const requests = getStoredRequests();
  const secret = getUserSecret(user.email);
  
  const existingReq = requests.find(r => (r.userEmail.toLowerCase() === user.email.toLowerCase() || r.psnId.toLowerCase() === psnId.toLowerCase()) && r.status === 'pending');
  
  let targetReq: VerificationRequest;

  if (existingReq) {
    existingReq.psnId = psnId.trim();
    existingReq.verificationSecret = secret;
    existingReq.requestedAt = new Date().toISOString();
    saveRequests(requests);
    targetReq = existingReq;
  } else {
    const newReq: VerificationRequest = {
      id: `req_${Date.now()}`,
      userEmail: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      psnId: psnId.trim(),
      verificationSecret: secret,
      requestedAt: new Date().toISOString(),
      status: 'pending',
      notes: 'قام بإضافة حساب السوني وينتظر التحقق من كلمة السر'
    };
    requests.unshift(newReq);
    saveRequests(requests);
    targetReq = newReq;
  }

  const users = getStoredUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (userIdx >= 0) {
    users[userIdx].psnId = psnId.trim();
    users[userIdx].verificationSecret = secret;
    saveUsers(users);
    if (db && users[userIdx].uid) {
      setDoc(doc(db, 'users', users[userIdx].uid), {
        psnId: psnId.trim(),
        verificationSecret: secret
      }, { merge: true }).catch(() => {});
    }
  }

  // Push request to Firestore so Admin sees it across all sessions
  try {
    if (db && targetReq.id) {
      setDoc(doc(db, 'verification_requests', targetReq.id), {
        id: targetReq.id,
        userEmail: targetReq.userEmail,
        displayName: targetReq.displayName,
        psnId: targetReq.psnId,
        verificationSecret: targetReq.verificationSecret,
        requestedAt: targetReq.requestedAt,
        status: targetReq.status,
        notes: targetReq.notes || ''
      }, { merge: true }).catch((err) => {
        console.warn('Firestore request write notice:', err);
      });
    }
  } catch (err) {
    console.warn('Firestore request sync exception:', err);
  }

  return targetReq;
}

// Check if provided password matches request's verification secret exactly
export function verifySecretMatches(requestId: string, enteredSecret: string): boolean {
  const requests = getStoredRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return false;
  return req.verificationSecret.trim().toUpperCase() === enteredSecret.trim().toUpperCase();
}

// Approve verification with 4 trophy fields + level calculation
export function approveVerificationWithTrophies(
  requestId: string,
  enteredSecret: string,
  trophies: { platinum: number; gold: number; silver: number; bronze: number; level?: number },
  reviewerEmail: string
): { success: boolean; message: string } {
  const requests = getStoredRequests();
  const req = requests.find(r => r.id === requestId);

  if (!req) {
    return { success: false, message: 'طلب التوثيق غير موجود.' };
  }

  if (req.verificationSecret.trim().toUpperCase() !== enteredSecret.trim().toUpperCase()) {
    return {
      success: false,
      message: 'كلمة السر غير صحيحة! يرجى التأكد من الرسالة المستلمة عبر شبكة السوني.'
    };
  }

  const total = trophies.platinum + trophies.gold + trophies.silver + trophies.bronze;
  const trophyStats: TrophyStats = {
    platinum: trophies.platinum || 0,
    gold: trophies.gold || 0,
    silver: trophies.silver || 0,
    bronze: trophies.bronze || 0,
    level: trophies.level || Math.max(1, Math.floor((trophies.platinum * 300 + trophies.gold * 90 + trophies.silver * 30 + trophies.bronze * 15) / 100)),
    total
  };

  req.status = 'approved';
  req.reviewedAt = new Date().toISOString();
  req.reviewedBy = reviewerEmail;
  req.trophyStats = trophyStats;
  req.notes = 'تم التحقق من كلمة السر بنجاح والموافقة على توثيق الحساب وإدراجه في لوحة المتصدرين.';
  saveRequests(requests);

  // Sync approved request to Firestore
  try {
    if (db && req.id) {
      setDoc(doc(db, 'verification_requests', req.id), {
        status: 'approved',
        reviewedAt: req.reviewedAt,
        reviewedBy: req.reviewedBy,
        trophyStats,
        notes: req.notes
      }, { merge: true }).catch(() => {});
    }
  } catch {}

  // Update master users table
  const users = getStoredUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === req.userEmail.toLowerCase());
  if (userIdx >= 0) {
    users[userIdx].isVerified = true;
    users[userIdx].psnId = req.psnId;
    users[userIdx].trophyStats = trophyStats;
    saveUsers(users);

    try {
      if (db && users[userIdx].uid) {
        setDoc(doc(db, 'users', users[userIdx].uid), {
          isVerified: true,
          psnId: req.psnId,
          trophyStats
        }, { merge: true }).catch(() => {});
      }
    } catch {}
  }

  return { success: true, message: `تم توثيق حساب (${req.psnId}) بنجاح وربط إحصائيات التروفي في لوحة المتصدرين!` };
}

// Reject verification request
export function rejectVerificationRequest(requestId: string, reason?: string): boolean {
  const requests = getStoredRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return false;

  req.status = 'rejected';
  req.reviewedAt = new Date().toISOString();
  req.reviewedBy = ADMIN_EMAIL;
  req.notes = reason || 'تم رفض الطلب لعدم تطابق البيانات أو عدم إرسال الرسالة.';
  saveRequests(requests);

  try {
    if (db && req.id) {
      setDoc(doc(db, 'verification_requests', req.id), {
        status: 'rejected',
        reviewedAt: req.reviewedAt,
        reviewedBy: req.reviewedBy,
        notes: req.notes
      }, { merge: true }).catch(() => {});
    }
  } catch {}

  return true;
}

// Toggle ban status for a user
export function toggleUserBan(uid: string): { success: boolean; isBanned: boolean; message: string } {
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.uid === uid);
  if (idx < 0) return { success: false, isBanned: false, message: 'المستخدم غير موجود' };

  if (users[idx].email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, isBanned: false, message: 'لا يمكن حظر حساب مدير النظام الرئيسي' };
  }

  users[idx].isBanned = !users[idx].isBanned;
  saveUsers(users);

  try {
    if (db && users[idx].uid) {
      setDoc(doc(db, 'users', users[idx].uid), { isBanned: users[idx].isBanned }, { merge: true }).catch(() => {});
    }
  } catch {}

  return { 
    success: true, 
    isBanned: users[idx].isBanned, 
    message: users[idx].isBanned ? 'تم حظر المستخدم بنجاح' : 'تم فك حظر المستخدم' 
  };
}

// Admin Role Assignment directly to an existing user
export function promoteUserToAdmin(userEmail: string): { success: boolean; message: string } {
  const clean = userEmail.trim().toLowerCase();
  if (!clean || !clean.includes('@')) {
    return { success: false, message: 'يرجى اختيار مستخدم صالح' };
  }
  const current = getAdminEmails();
  if (current.includes(clean)) {
    return { success: false, message: 'هذا المستخدم مضاف بالفعل كمدير' };
  }
  current.push(clean);
  saveAdminEmails(current);

  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === clean);
  if (user) {
    user.role = 'admin';
    saveUsers(users);
    if (db && user.uid) {
      setDoc(doc(db, 'users', user.uid), { role: 'admin' }, { merge: true }).catch(() => {});
    }
  }

  // Also sync admin list document in Firestore
  try {
    if (db) {
      setDoc(doc(db, 'config', 'admins'), { emails: current }, { merge: true }).catch(() => {});
    }
  } catch {}

  return { success: true, message: `تمت ترقية المستخدم (${clean}) إلى مدير نظام بنجاح` };
}

// Remove Admin privileges from a user
export function demoteUserFromAdmin(emailToRemove: string): { success: boolean; message: string } {
  const clean = emailToRemove.trim().toLowerCase();
  if (clean === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, message: 'لا يمكن إزالة المدير الرئيسي للموقع' };
  }
  let current = getAdminEmails();
  current = current.filter(e => e.toLowerCase() !== clean);
  saveAdminEmails(current);

  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === clean);
  if (user) {
    user.role = 'user';
    saveUsers(users);
    if (db && user.uid) {
      setDoc(doc(db, 'users', user.uid), { role: 'user' }, { merge: true }).catch(() => {});
    }
  }

  try {
    if (db) {
      setDoc(doc(db, 'config', 'admins'), { emails: current }, { merge: true }).catch(() => {});
    }
  } catch {}

  return { success: true, message: `تمت إزالة صلاحيات الإدارة من (${clean})` };
}

// Global Cloud Firestore Real-time Listener to synchronize all users & verification requests across any devices
export function initGlobalFirestoreListeners() {
  if (typeof window === 'undefined' || !db) return () => {};

  // Fetch initial collection snapshot
  getDocs(collection(db, 'users')).then((snap) => {
    if (!snap.empty) {
      const cloudUsers: AppUserAccount[] = [];
      snap.forEach(docSnap => {
        const data = docSnap.data();
        if (data && data.email) {
          cloudUsers.push(data as AppUserAccount);
        }
      });
      const localUsers = getStoredUsers();
      const map = new Map<string, AppUserAccount>();
      localUsers.forEach(u => map.set(u.uid || u.email.toLowerCase(), u));
      cloudUsers.forEach(u => map.set(u.uid || u.email.toLowerCase(), u));
      const merged = Array.from(map.values());
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
        broadcastDataChange('users');
      } catch {}
    }
  }).catch(() => {});

  const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
    if (!snapshot.empty) {
      const cloudUsers: AppUserAccount[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data && data.email) {
          cloudUsers.push(data as AppUserAccount);
        }
      });
      const localUsers = getStoredUsers();
      const map = new Map<string, AppUserAccount>();
      localUsers.forEach(u => map.set(u.uid || u.email.toLowerCase(), u));
      cloudUsers.forEach(u => map.set(u.uid || u.email.toLowerCase(), u));
      const merged = Array.from(map.values());
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
        broadcastDataChange('users');
      } catch {}
    }
  }, (err) => {
    console.warn('Firestore users listener error:', err);
  });

  const unsubRequests = onSnapshot(collection(db, 'verification_requests'), (snapshot) => {
    if (!snapshot.empty) {
      const cloudReqs: VerificationRequest[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data && data.id) {
          cloudReqs.push(data as VerificationRequest);
        }
      });
      const localReqs = getStoredRequests();
      const map = new Map<string, VerificationRequest>();
      localReqs.forEach(r => map.set(r.id, r));
      cloudReqs.forEach(r => map.set(r.id, r));
      const merged = Array.from(map.values()).sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
      try {
        localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(merged));
        broadcastDataChange('requests');
      } catch {}
    }
  }, (err) => {
    console.warn('Firestore requests listener error:', err);
  });

  const unsubAdmins = onSnapshot(doc(db, 'config', 'admins'), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && Array.isArray(data.emails)) {
        const cloudAdmins: string[] = data.emails.map((e: string) => e.toLowerCase());
        if (!cloudAdmins.includes(ADMIN_EMAIL.toLowerCase())) {
          cloudAdmins.push(ADMIN_EMAIL.toLowerCase());
        }
        try {
          localStorage.setItem(ADMIN_EMAILS_KEY, JSON.stringify(cloudAdmins));
          broadcastDataChange('admins');
        } catch {}
      }
    }
  }, () => {});

  return () => {
    unsubUsers();
    unsubRequests();
    unsubAdmins();
  };
}
