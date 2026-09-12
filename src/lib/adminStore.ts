import { AppUserAccount, VerificationRequest, TrophyStats } from '../types';

export const ADMIN_EMAIL = 'mfb.15.f@gmail.com';

const USERS_STORAGE_KEY = 'kachi_all_users_v2';
const REQUESTS_STORAGE_KEY = 'kachi_verification_requests_v2';
const ADMIN_EMAILS_KEY = 'kachi_admin_emails_v2';

// Generates an unguessable 6-digit verification secret code (e.g. "KC-8492")
export function generateRandomSecret(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `KC-${num}`;
}

// Initial sample users if none exist in localStorage
const INITIAL_USERS: AppUserAccount[] = [
  {
    uid: 'admin_root',
    email: 'mfb.15.f@gmail.com',
    displayName: 'Hamody (المدير)',
    photoURL: undefined,
    createdAt: '2026-01-10T12:00:00Z',
    lastLoginAt: '2026-09-12T10:30:00Z',
    isBanned: false,
    isVerified: true,
    psnId: 'HamoDyMFB',
    role: 'admin',
    verificationSecret: 'KC-7721',
    trophyStats: {
      platinum: 64,
      gold: 240,
      silver: 810,
      bronze: 2150,
      level: 462,
      total: 3264
    }
  },
  {
    uid: 'user_falcon_999',
    email: 'falcon.ksa@gmail.com',
    displayName: 'فهد الحربي',
    createdAt: '2026-02-01T08:30:00Z',
    lastLoginAt: '2026-09-11T16:20:00Z',
    isBanned: false,
    isVerified: true,
    psnId: 'FALCON_KSA_999',
    role: 'user',
    verificationSecret: 'KC-4921',
    trophyStats: {
      platinum: 42,
      gold: 185,
      silver: 620,
      bronze: 1890,
      level: 395,
      total: 2737
    }
  },
  {
    uid: 'user_samurai_jed',
    email: 'jeddah.gamer@hotmail.com',
    displayName: 'عمر الغامدي',
    createdAt: '2026-02-14T14:15:00Z',
    lastLoginAt: '2026-09-10T22:15:00Z',
    isBanned: false,
    isVerified: true,
    psnId: 'SAMURAI_JEDDAH',
    role: 'user',
    verificationSecret: 'KC-3319',
    trophyStats: {
      platinum: 28,
      gold: 112,
      silver: 430,
      bronze: 1340,
      level: 310,
      total: 1910
    }
  },
  {
    uid: 'user_riyadh_x',
    email: 'sultan.ps@gmail.com',
    displayName: 'سلطان القحطاني',
    createdAt: '2026-03-01T10:00:00Z',
    lastLoginAt: '2026-09-12T08:45:00Z',
    isBanned: false,
    isVerified: false,
    psnId: 'RIYADH_ELITE_X',
    role: 'user',
    verificationSecret: 'KC-8842'
  },
  {
    uid: 'user_khobar_sniper',
    email: 'tariq.khobar@gmail.com',
    displayName: 'طارق الشرقية',
    createdAt: '2026-03-05T19:20:00Z',
    lastLoginAt: '2026-09-12T09:10:00Z',
    isBanned: false,
    isVerified: false,
    psnId: 'KHOBAR_SNIPER',
    role: 'user',
    verificationSecret: 'KC-1529'
  }
];

const INITIAL_REQUESTS: VerificationRequest[] = [
  {
    id: 'req_001',
    userEmail: 'sultan.ps@gmail.com',
    displayName: 'سلطان القحطاني',
    psnId: 'RIYADH_ELITE_X',
    verificationSecret: 'KC-8842',
    requestedAt: '2026-09-11T14:30:00Z',
    status: 'pending',
    notes: 'قام بإضافة حساب HamoDyMFB بالسوني'
  },
  {
    id: 'req_002',
    userEmail: 'tariq.khobar@gmail.com',
    displayName: 'طارق الشرقية',
    psnId: 'KHOBAR_SNIPER',
    verificationSecret: 'KC-1529',
    requestedAt: '2026-09-12T05:10:00Z',
    status: 'pending',
    notes: 'طلب جديد للتوثيق'
  },
  {
    id: 'req_003',
    userEmail: 'falcon.ksa@gmail.com',
    displayName: 'فهد الحربي',
    psnId: 'FALCON_KSA_999',
    verificationSecret: 'KC-4921',
    requestedAt: '2026-02-01T09:00:00Z',
    status: 'approved',
    reviewedAt: '2026-02-01T11:00:00Z',
    reviewedBy: ADMIN_EMAIL,
    trophyStats: {
      platinum: 42,
      gold: 185,
      silver: 620,
      bronze: 1890,
      level: 395,
      total: 2737
    },
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
  } catch (err) {
    console.error('Failed to save admin emails', err);
  }
}

export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) return true;
  const list = getAdminEmails();
  return list.includes(cleanEmail);
}

export function addAdminEmail(email: string): { success: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    return { success: false, message: 'يرجى إدخال البريد الإلكتروني.' };
  }

  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return { success: false, message: 'هذا البريد غير مسجل في المنصة. يجب على المستخدم تسجيل الدخول للموقع أولاً.' };
  }

  const admins = getAdminEmails();
  if (admins.includes(cleanEmail)) {
    return { success: false, message: 'هذا الحساب يمتلك صلاحية الإدارة بالفعل.' };
  }

  admins.push(cleanEmail);
  saveAdminEmails(admins);

  // Update user role
  user.role = 'admin';
  saveUsers(users);

  return { success: true, message: `تمت إضافة ${cleanEmail} إلى فريق الإدارة بنجاح.` };
}

export function removeAdminEmail(email: string): { success: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, message: 'لا يمكن إزالة مدير النظام الرئيسي.' };
  }

  const admins = getAdminEmails().filter(e => e !== cleanEmail);
  saveAdminEmails(admins);

  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (user) {
    user.role = 'user';
    saveUsers(users);
  }

  return { success: true, message: `تمت إزالة صلاحية الإدارة عن ${cleanEmail}.` };
}

// Sync logged-in Firebase user into store
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
  if (!req) return { success: false, message: 'الطلب غير موجود.' };

  if (!verifySecretMatches(requestId, enteredSecret)) {
    return { success: false, message: 'كلمة السر غير صحيحة! يرجى التأكد من كلمة السر المرسلة من حساب اللاعب في السوني.' };
  }

  const plat = Math.max(0, Number(trophies.platinum) || 0);
  const gold = Math.max(0, Number(trophies.gold) || 0);
  const silver = Math.max(0, Number(trophies.silver) || 0);
  const bronze = Math.max(0, Number(trophies.bronze) || 0);
  const total = plat + gold + silver + bronze;

  // Calculate trophy level based on PlayStation formula points if not provided:
  // bronze=15, silver=30, gold=90, plat=300
  const calculatedPoints = (bronze * 15) + (silver * 30) + (gold * 90) + (plat * 300);
  const calculatedLevel = trophies.level && Number(trophies.level) > 0 
    ? Number(trophies.level) 
    : Math.max(1, Math.floor(calculatedPoints / 600) + 1);

  const trophyStats: TrophyStats = {
    platinum: plat,
    gold,
    silver,
    bronze,
    level: calculatedLevel,
    total
  };

  req.status = 'approved';
  req.reviewedAt = new Date().toISOString();
  req.reviewedBy = reviewerEmail;
  req.trophyStats = trophyStats;
  saveRequests(requests);

  // Update user in users list
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === req.userEmail.toLowerCase());
  if (user) {
    user.isVerified = true;
    user.psnId = req.psnId;
    user.trophyStats = trophyStats;
    saveUsers(users);
  }

  return { success: true, message: `تم توثيق حساب اللاعب ${req.psnId} بنجاح وإدراجه في لوحة المتصدرين!` };
}

export function rejectVerificationRequest(requestId: string, reason?: string): boolean {
  const requests = getStoredRequests();
  const req = requests.find(r => r.id === requestId);
  if (!req) return false;

  req.status = 'rejected';
  req.reviewedAt = new Date().toISOString();
  if (reason) req.notes = reason;
  saveRequests(requests);

  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === req.userEmail.toLowerCase());
  if (user) {
    user.isVerified = false;
    saveUsers(users);
  }

  return true;
}

export function toggleUserBan(uid: string): { success: boolean; isBanned: boolean } {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index === -1) return { success: false, isBanned: false };

  if (users[index].email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, isBanned: false };
  }

  users[index].isBanned = !users[index].isBanned;
  saveUsers(users);
  return { success: true, isBanned: users[index].isBanned };
}

export function isUserVerified(email?: string | null): boolean {
  if (!email) return false;
  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return true;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return !!user?.isVerified;
}

export function isUserBanned(email?: string | null): boolean {
  if (!email) return false;
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return !!user?.isBanned;
}
