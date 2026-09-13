import { AppUserAccount, VerificationRequest, TrophyStats } from '../types';

export const ADMIN_EMAIL = 'mfb.15.f@gmail.com';

const USERS_STORAGE_KEY = 'kachi_all_users_v3';
const REQUESTS_STORAGE_KEY = 'kachi_verification_requests_v3';
const ADMIN_EMAILS_KEY = 'kachi_admin_emails_v3';

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

// Initial sample users: Empty by default so only real authenticated and verified players appear
const INITIAL_USERS: AppUserAccount[] = [];
const INITIAL_REQUESTS: VerificationRequest[] = [];

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
    broadcastDataChange('users');
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
    broadcastDataChange('requests');
  } catch (err) {
    console.error('Failed to save requests', err);
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

export function isUserVerified(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) return true;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  return !!user?.isVerified && !user?.isBanned;
}

export function isUserBanned(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) return false;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  return !!user?.isBanned;
}

// Ensure logged-in user is created/updated in the master users list instantly
export function syncCurrentUserRecord(user: { uid: string; email?: string | null; displayName?: string | null; photoURL?: string | null }): AppUserAccount {
  const users = getStoredUsers();
  const email = (user.email || '').trim().toLowerCase();
  const isSuperAdmin = email === ADMIN_EMAIL.toLowerCase();
  const adminList = getAdminEmails();
  const hasAdminRole = isSuperAdmin || adminList.includes(email);

  const existingIndex = users.findIndex(u => u.uid === user.uid || (u.email && u.email.toLowerCase() === email));

  if (existingIndex >= 0) {
    const existing = users[existingIndex];
    const updated: AppUserAccount = {
      ...existing,
      email: user.email || existing.email,
      displayName: user.displayName || existing.displayName,
      lastLoginAt: new Date().toISOString(),
      role: hasAdminRole ? 'admin' : existing.role,
      verificationSecret: existing.verificationSecret || generateRandomSecret()
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
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    isBanned: false,
    isVerified: isSuperAdmin,
    role: hasAdminRole ? 'admin' : 'user',
    verificationSecret: generateRandomSecret()
  };

  users.unshift(newUser);
  saveUsers(users);
  return newUser;
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

// Submit verification request with secret password
export function submitVerificationRequest(user: { email: string; displayName: string; uid?: string }, psnId: string): VerificationRequest {
  const requests = getStoredRequests();
  const secret = getUserSecret(user.email);
  
  const existingReq = requests.find(r => (r.userEmail.toLowerCase() === user.email.toLowerCase() || r.psnId.toLowerCase() === psnId.toLowerCase()) && r.status === 'pending');
  if (existingReq) {
    existingReq.psnId = psnId.trim();
    existingReq.verificationSecret = secret;
    existingReq.requestedAt = new Date().toISOString();
    saveRequests(requests);
    return existingReq;
  }

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

  const users = getStoredUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (userIdx >= 0) {
    users[userIdx].psnId = psnId.trim();
    users[userIdx].verificationSecret = secret;
    saveUsers(users);
  }

  return newReq;
}

// Check if provided password matches request's verification secret
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

  // Verify that the entered secret matches the generated user password
  if (req.verificationSecret.trim().toUpperCase() !== enteredSecret.trim().toUpperCase()) {
    return {
      success: false,
      message: `كلمة السر غير صحيحة! كلمة السر المسجلة في النظام لهذا الطلب هي (${req.verificationSecret}). يرجى التأكد من الرسالة المرسلة في حساب السوني.`
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

  // Update master users table
  const users = getStoredUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === req.userEmail.toLowerCase());
  if (userIdx >= 0) {
    users[userIdx].isVerified = true;
    users[userIdx].psnId = req.psnId;
    users[userIdx].trophyStats = trophyStats;
    saveUsers(users);
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
  return { 
    success: true, 
    isBanned: users[idx].isBanned, 
    message: users[idx].isBanned ? 'تم حظر المستخدم بنجاح' : 'تم فك حظر المستخدم' 
  };
}

// Admin Email Management
export function addAdminEmail(newEmail: string): { success: boolean; message: string } {
  const clean = newEmail.trim().toLowerCase();
  if (!clean || !clean.includes('@')) {
    return { success: false, message: 'يرجى إدخال بريد إلكتروني صحيح' };
  }
  const current = getAdminEmails();
  if (current.includes(clean)) {
    return { success: false, message: 'هذا البريد مضاف بالفعل كمدير' };
  }
  current.push(clean);
  saveAdminEmails(current);

  // Also update user record role if exists
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === clean);
  if (user) {
    user.role = 'admin';
    saveUsers(users);
  }

  return { success: true, message: `تمت إضافة (${clean}) كمدير نظام بنجاح` };
}

export function removeAdminEmail(emailToRemove: string): { success: boolean; message: string } {
  const clean = emailToRemove.trim().toLowerCase();
  if (clean === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, message: 'لا يمكن حذف المدير الرئيسي للموقع' };
  }
  let current = getAdminEmails();
  current = current.filter(e => e.toLowerCase() !== clean);
  saveAdminEmails(current);

  // Update user record role
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === clean);
  if (user) {
    user.role = 'user';
    saveUsers(users);
  }

  return { success: true, message: `تمت إزالة صلاحيات الإدارة من (${clean})` };
}
