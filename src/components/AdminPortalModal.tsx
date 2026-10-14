import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Lock, Unlock, User, Mail, Key, Eye, EyeOff, 
  Calendar, Clock, Phone, Scissors, Search, Filter, Download, 
  RefreshCw, CheckCircle2, AlertCircle, X, ChevronDown, Check,
  Copy, ExternalLink, Sparkles, AlertTriangle, FileText, Trash2,
  DollarSign, Users, Database, LogOut
} from 'lucide-react';
import { 
  SUPABASE_PROJECT_ID, 
  SUPABASE_URL,
  SUPABASE_SQL_SETUP,
  SALON_ADMIN_SQL_SETUP,
  fetchRecentAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  checkAdminAccountExists,
  registerSingleAdmin,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  AppointmentRecord,
  AdminSession
} from '../lib/supabase';
import { STYLISTS_DATA } from '../data/salonData';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  // Session & Auth state
  const [session, setSession] = useState<AdminSession | null>(null);
  const [slotTaken, setSlotTaken] = useState<boolean>(false);
  const [adminOwnerInfo, setAdminOwnerInfo] = useState<{ email: string; fullName: string; createdAt: string } | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Dashboard State
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<AppointmentRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'sql' | 'credentials'>('bookings');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stylistFilter, setStylistFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // UI state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // Initial Check on open
  useEffect(() => {
    if (isOpen) {
      checkAuthAndSlot();
    }
  }, [isOpen]);

  const checkAuthAndSlot = async () => {
    setAuthLoading(true);
    setAuthError(null);

    // 1. Check existing session
    const currentSession = getAdminSession();
    if (currentSession) {
      setSession(currentSession);
      setSlotTaken(true);
      loadBookings();
    }

    // 2. Check if the single slot is occupied
    const slotCheck = await checkAdminAccountExists();
    setSlotTaken(slotCheck.exists);
    if (slotCheck.adminInfo) {
      setAdminOwnerInfo(slotCheck.adminInfo);
      if (!loginEmail) {
        setLoginEmail(slotCheck.adminInfo.email);
      }
    }

    setAuthLoading(false);
  };

  const loadBookings = async () => {
    setLoadingData(true);
    setDataError(null);
    const res = await fetchRecentAppointments(100);
    if (res.success) {
      setAppointments(res.appointments);
      setLastUpdated(new Date());
    } else {
      setDataError(res.error || 'Failed to load bookings from Supabase');
    }
    setLoadingData(false);
  };

  // Handle Registration of Single Admin Slot
  const handleRegisterSingleSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAuthError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsRegistering(true);
    const res = await registerSingleAdmin({
      fullName: regName.trim(),
      email: regEmail.trim(),
      password: regPassword
    });

    setIsRegistering(false);

    if (!res.success) {
      setAuthError(res.error || 'Failed to register admin account.');
      return;
    }

    setAuthSuccessMsg('Admin account successfully created! Single slot is now locked.');
    setSlotTaken(true);
    const currentSession = getAdminSession();
    setSession(currentSession);
    loadBookings();
  };

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (!loginEmail.trim() || !loginPassword) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setIsLoggingIn(true);
    const res = await loginAdmin(loginEmail.trim(), loginPassword);
    setIsLoggingIn(false);

    if (!res.success || !res.session) {
      setAuthError(res.error || 'Invalid credentials.');
      return;
    }

    setSession(res.session);
    loadBookings();
  };

  const handleLogout = () => {
    logoutAdmin();
    setSession(null);
    setSelectedBooking(null);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setStatusUpdatingId(id);
    const res = await updateAppointmentStatus(id, newStatus);
    if (res.success) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert(`Could not update status: ${res.error}`);
    }
    setStatusUpdatingId(null);
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking record from Supabase?')) {
      return;
    }
    const res = await deleteAppointment(id);
    if (res.success) {
      setAppointments(prev => prev.filter(a => a.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
    } else {
      alert(`Could not delete: ${res.error}`);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        apt.client_name?.toLowerCase().includes(q) ||
        apt.client_email?.toLowerCase().includes(q) ||
        apt.client_phone?.toLowerCase().includes(q) ||
        apt.confirmation_code?.toLowerCase().includes(q) ||
        apt.service_name?.toLowerCase().includes(q) ||
        apt.stylist_name?.toLowerCase().includes(q);

      // Status
      const matchesStatus = statusFilter === 'all' || 
        (apt.status || 'confirmed').toLowerCase() === statusFilter.toLowerCase();

      // Stylist
      const matchesStylist = stylistFilter === 'all' || apt.stylist_id === stylistFilter;

      // Date
      let matchesDate = true;
      if (dateFilter === 'today') {
        const todayStr = new Date().toISOString().split('T')[0];
        matchesDate = apt.appointment_date === todayStr;
      } else if (dateFilter === 'upcoming') {
        const todayStr = new Date().toISOString().split('T')[0];
        matchesDate = (apt.appointment_date || '') >= todayStr;
      }

      return matchesSearch && matchesStatus && matchesStylist && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, stylistFilter, dateFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter(a => (a.status || 'confirmed') === 'confirmed').length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    const totalRevenue = appointments
      .filter(a => a.status !== 'cancelled')
      .reduce((sum, a) => sum + (Number(a.estimated_price) || 0), 0);

    return { total, confirmed, completed, totalRevenue };
  }, [appointments]);

  // Export CSV
  const handleExportCSV = () => {
    if (filteredAppointments.length === 0) return;

    const headers = [
      'Confirmation Code', 'Date', 'Time Slot', 'Client Name', 'Client Email', 
      'Client Phone', 'Service', 'Stylist', 'Hair Length', 'Chemical History', 
      'Add-ons', 'Estimated Price', 'Status', 'Notes', 'Created At'
    ];

    const rows = filteredAppointments.map(a => [
      `"${a.confirmation_code}"`,
      `"${a.appointment_date}"`,
      `"${a.time_slot}"`,
      `"${a.client_name}"`,
      `"${a.client_email}"`,
      `"${a.client_phone}"`,
      `"${a.service_name}"`,
      `"${a.stylist_name || 'Any Stylist'}"`,
      `"${a.hair_length || 'Standard'}"`,
      `"${(a.chemical_history || []).join('; ')}"`,
      `"${(a.add_ons || []).join('; ')}"`,
      `"$${a.estimated_price || 0}"`,
      `"${a.status || 'confirmed'}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${a.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `junko_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#171513] border border-[#3E3A34] rounded-lg max-w-5xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-auto max-h-[94vh] flex flex-col justify-between overflow-y-auto text-[#EAE4DC]"
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C847A] hover:text-[#F3EFEA] p-2 text-xl cursor-pointer z-20 transition-colors"
          title="Close Admin Panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C2925] pr-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] tracking-wide">
                  Junko Studio Admin Portal
                </h2>
                {session ? (
                  <span className="text-[10px] uppercase tracking-wider bg-[#3ECF8E]/20 text-[#3ECF8E] font-semibold px-2 py-0.5 rounded-full border border-[#3ECF8E]/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
                    Authorized Admin
                  </span>
                ) : slotTaken ? (
                  <span className="text-[10px] uppercase tracking-wider bg-[#C5A880]/20 text-[#C5A880] font-semibold px-2 py-0.5 rounded-full border border-[#C5A880]/30 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Slot Locked
                  </span>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider bg-[#E5A855]/20 text-[#E5A855] font-semibold px-2 py-0.5 rounded-full border border-[#E5A855]/40 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#E5A855]" />
                    1 Slot Available
                  </span>
                )}
              </div>
              <p className="text-xs text-[#9E9589]">
                Supabase Backend: <code className="text-[#C5A880] font-mono">{SUPABASE_PROJECT_ID}</code>
              </p>
            </div>
          </div>

          {/* Logged in user info or slot badge */}
          {session && (
            <div className="flex items-center gap-3 bg-[#1F1C18] border border-[#332F2A] px-3.5 py-1.5 rounded-md">
              <div className="text-right">
                <div className="text-xs font-medium text-[#F3EFEA]">{session.fullName}</div>
                <div className="text-[10px] text-[#8C847A]">{session.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-[#E57373] hover:text-[#FF8A80] hover:bg-[#E57373]/10 p-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                title="Log Out Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* BODY CONTENT */}
        <div className="py-4 flex-1">
          {authLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#9E9589]">
              <RefreshCw className="w-6 h-6 animate-spin text-[#C5A880]" />
              <p className="text-xs tracking-wider uppercase">Verifying Admin Slot & Credentials...</p>
            </div>
          ) : !session ? (
            /* ==============================================================
               UNAUTHENTICATED VIEW: SIGN-UP (1 SLOT) OR LOGIN FORM
               ============================================================== */
            <div className="max-w-md mx-auto py-4">
              {!slotTaken ? (
                /* CASE A: SINGLE SLOT AVAILABLE - SIGN UP */
                <div>
                  <div className="bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-lg p-4 mb-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] mb-2">
                      <Unlock className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg text-[#F3EFEA] mb-1">
                      Initial Admin Setup (Single Slot)
                    </h3>
                    <p className="text-xs text-[#B8AEA2] leading-relaxed">
                      Only <strong>one administrator account</strong> can ever be registered for this website. Once you register below, the slot will be permanently locked and no one else will be allowed to create an admin account.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSingleSlot} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9589] font-medium mb-1.5">
                        Administrator Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#7A7268] absolute left-3 top-3.5" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g., Deepika (Salon Director)"
                          className="w-full bg-[#1F1C18] border border-[#38332C] rounded-sm pl-10 pr-3 py-2.5 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9589] font-medium mb-1.5">
                        Admin Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#7A7268] absolute left-3 top-3.5" />
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="admin@junkohair.com"
                          className="w-full bg-[#1F1C18] border border-[#38332C] rounded-sm pl-10 pr-3 py-2.5 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9589] font-medium mb-1.5">
                        Master Password (min 6 chars) *
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 text-[#7A7268] absolute left-3 top-3.5" />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#1F1C18] border border-[#38332C] rounded-sm pl-10 pr-10 py-2.5 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-3 text-[#7A7268] hover:text-[#F3EFEA]"
                        >
                          {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9589] font-medium mb-1.5">
                        Confirm Master Password *
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 text-[#7A7268] absolute left-3 top-3.5" />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#1F1C18] border border-[#38332C] rounded-sm pl-10 pr-3 py-2.5 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                    </div>

                    {authError && (
                      <div className="p-3 bg-[#E57373]/10 border border-[#E57373]/30 rounded text-xs text-[#FF8A80] flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full py-3 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {isRegistering ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Locking Slot & Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Claim Slot & Register Admin</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* CASE B: SINGLE SLOT OCCUPIED - LOGIN ONLY */
                <div>
                  <div className="bg-[#1F1C18] border border-[#38332C] rounded-lg p-4 mb-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] mb-2">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg text-[#F3EFEA] mb-1">
                      Admin Portal Login
                    </h3>
                    <p className="text-xs text-[#9E9589] leading-relaxed">
                      Single admin slot is provisioned & registered
                      {adminOwnerInfo?.email && (
                        <span> for <strong className="text-[#C5A880]">{adminOwnerInfo.email}</strong></span>
                      )}. No additional sign-ups are allowed.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9589] font-medium mb-1.5">
                        Admin Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#7A7268] absolute left-3 top-3.5" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="admin@junkohair.com"
                          className="w-full bg-[#1F1C18] border border-[#38332C] rounded-sm pl-10 pr-3 py-2.5 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9E9589] font-medium mb-1.5">
                        Admin Password
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 text-[#7A7268] absolute left-3 top-3.5" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#1F1C18] border border-[#38332C] rounded-sm pl-10 pr-10 py-2.5 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-3 text-[#7A7268] hover:text-[#F3EFEA]"
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {authError && (
                      <div className="p-3 bg-[#E57373]/10 border border-[#E57373]/30 rounded text-xs text-[#FF8A80] flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full py-3 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {isLoggingIn ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Sign In to Admin Panel</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Reset Single Slot Emergency Notice for Owner */}
                  <div className="mt-6 pt-4 border-t border-[#2C2925] text-center">
                    {!showResetConfirmation ? (
                      <button
                        onClick={() => setShowResetConfirmation(true)}
                        className="text-[10px] text-[#7A7268] hover:text-[#9E9589] underline cursor-pointer"
                      >
                        Owner forgotten password or need to reset the single slot?
                      </button>
                    ) : (
                      <div className="p-3 bg-[#26201B] border border-[#4A3828] rounded text-left text-xs">
                        <p className="text-[#EAE4DC] font-medium mb-1">Owner Single-Slot Reset</p>
                        <p className="text-[11px] text-[#9E9589] mb-3">
                          Resetting will clear the local registered admin slot so you can create a fresh admin account. Bookings in Supabase will NOT be touched.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              localStorage.removeItem('junko_studio_admin_single_slot');
                              localStorage.removeItem('junko_studio_admin_session');
                              setSlotTaken(false);
                              setAdminOwnerInfo(null);
                              setShowResetConfirmation(false);
                            }}
                            className="bg-[#E57373] hover:bg-[#EF5350] text-black font-semibold text-[10px] uppercase px-3 py-1.5 rounded cursor-pointer"
                          >
                            Confirm & Clear Slot
                          </button>
                          <button
                            onClick={() => setShowResetConfirmation(false)}
                            className="text-[#9E9589] hover:text-[#F3EFEA] text-[10px] uppercase px-3 py-1.5 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ==============================================================
               AUTHENTICATED VIEW: FULL ADMIN DASHBOARD
               ============================================================== */
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2C2925] pb-2 text-xs">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`pb-2 font-medium uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'bookings'
                        ? 'border-b-2 border-[#C5A880] text-[#C5A880]'
                        : 'text-[#8C847A] hover:text-[#D8D0C5]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Client Bookings ({appointments.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('sql')}
                    className={`pb-2 font-medium uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'sql'
                        ? 'border-b-2 border-[#C5A880] text-[#C5A880]'
                        : 'text-[#8C847A] hover:text-[#D8D0C5]'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>SQL Schemas</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('credentials')}
                    className={`pb-2 font-medium uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'credentials'
                        ? 'border-b-2 border-[#C5A880] text-[#C5A880]'
                        : 'text-[#8C847A] hover:text-[#D8D0C5]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Slot & Security</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadBookings}
                    disabled={loadingData}
                    className="flex items-center gap-1 text-[11px] text-[#C5A880] hover:text-[#F3EFEA] bg-[#C5A880]/10 hover:bg-[#C5A880]/20 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingData ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    disabled={filteredAppointments.length === 0}
                    className="flex items-center gap-1 text-[11px] text-[#3ECF8E] hover:text-[#A5E5BF] bg-[#3ECF8E]/10 hover:bg-[#3ECF8E]/20 px-2.5 py-1 rounded transition-colors cursor-pointer disabled:opacity-40"
                    title="Export bookings to CSV"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {activeTab === 'bookings' && (
                <>
                  {/* Studio Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#1F1C18] border border-[#2E2A25] p-3 rounded-md">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C847A] flex items-center justify-between">
                        <span>Total Bookings</span>
                        <Users className="w-3 h-3 text-[#C5A880]" />
                      </div>
                      <div className="text-xl font-light text-[#F3EFEA] mt-1 font-serif">
                        {metrics.total}
                      </div>
                    </div>
                    <div className="bg-[#1F1C18] border border-[#2E2A25] p-3 rounded-md">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C847A] flex items-center justify-between">
                        <span>Confirmed</span>
                        <CheckCircle2 className="w-3 h-3 text-[#3ECF8E]" />
                      </div>
                      <div className="text-xl font-light text-[#3ECF8E] mt-1 font-serif">
                        {metrics.confirmed}
                      </div>
                    </div>
                    <div className="bg-[#1F1C18] border border-[#2E2A25] p-3 rounded-md">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C847A] flex items-center justify-between">
                        <span>Completed</span>
                        <Scissors className="w-3 h-3 text-[#79B4E3]" />
                      </div>
                      <div className="text-xl font-light text-[#79B4E3] mt-1 font-serif">
                        {metrics.completed}
                      </div>
                    </div>
                    <div className="bg-[#1F1C18] border border-[#2E2A25] p-3 rounded-md">
                      <div className="text-[10px] uppercase tracking-wider text-[#8C847A] flex items-center justify-between">
                        <span>Est. Booked Revenue</span>
                        <DollarSign className="w-3 h-3 text-[#E5A855]" />
                      </div>
                      <div className="text-xl font-light text-[#E5A855] mt-1 font-serif">
                        ${metrics.totalRevenue}
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-[#7A7268] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by client name, email, phone, code..."
                        className="w-full bg-[#1F1C18] border border-[#332F2A] rounded-sm pl-9 pr-3 py-2 text-xs text-[#F3EFEA] focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#1F1C18] border border-[#332F2A] rounded-sm px-2.5 py-2 text-xs text-[#EAE4DC] focus:border-[#C5A880] focus:outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <select
                        value={stylistFilter}
                        onChange={(e) => setStylistFilter(e.target.value)}
                        className="bg-[#1F1C18] border border-[#332F2A] rounded-sm px-2.5 py-2 text-xs text-[#EAE4DC] focus:border-[#C5A880] focus:outline-none"
                      >
                        <option value="all">All Stylists</option>
                        {STYLISTS_DATA.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>

                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="bg-[#1F1C18] border border-[#332F2A] rounded-sm px-2.5 py-2 text-xs text-[#EAE4DC] focus:border-[#C5A880] focus:outline-none"
                      >
                        <option value="all">All Dates</option>
                        <option value="today">Today Only</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                  </div>

                  {/* Bookings List / Table */}
                  {loadingData ? (
                    <div className="py-16 text-center text-[#9E9589] flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#C5A880]" />
                      <span className="text-xs">Fetching bookings from Supabase table...</span>
                    </div>
                  ) : dataError ? (
                    <div className="p-4 bg-[#E57373]/10 border border-[#E57373]/30 rounded text-xs text-[#FF8A80]">
                      <p className="font-semibold mb-1">Error fetching bookings:</p>
                      <p>{dataError}</p>
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-[#332F2A] rounded-md text-[#8C847A]">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50 text-[#C5A880]" />
                      <p className="text-sm text-[#EAE4DC]">No bookings match your current criteria.</p>
                      <p className="text-xs text-[#7A7268] mt-1">
                        When clients book an appointment on the website, their details appear here in real time.
                      </p>
                    </div>
                  ) : (
                    <div className="border border-[#2C2925] rounded-md overflow-hidden">
                      <div className="max-h-[50vh] overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#1C1916] text-[#8C847A] uppercase tracking-wider text-[10px] sticky top-0 z-10 border-b border-[#2C2925]">
                            <tr>
                              <th className="py-2.5 px-3">Code / Date</th>
                              <th className="py-2.5 px-3">Client</th>
                              <th className="py-2.5 px-3">Service & Stylist</th>
                              <th className="py-2.5 px-3">Price</th>
                              <th className="py-2.5 px-3">Status</th>
                              <th className="py-2.5 px-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#26231F]">
                            {filteredAppointments.map((apt) => (
                              <tr 
                                key={apt.id || apt.confirmation_code}
                                className="hover:bg-[#201D19] transition-colors"
                              >
                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-1.5 font-mono text-[#C5A880] font-semibold">
                                    <span>{apt.confirmation_code}</span>
                                    <button 
                                      onClick={() => handleCopy(apt.confirmation_code, apt.confirmation_code)}
                                      className="text-[#7A7268] hover:text-[#F3EFEA]"
                                      title="Copy code"
                                    >
                                      {copiedCode === apt.confirmation_code ? (
                                        <Check className="w-3 h-3 text-[#3ECF8E]" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                  <div className="text-[11px] text-[#A69E92] flex items-center gap-1 mt-0.5">
                                    <Calendar className="w-3 h-3 text-[#7A7268]" />
                                    <span>{apt.appointment_date}</span>
                                    <span className="text-[#7A7268]">•</span>
                                    <span>{apt.time_slot}</span>
                                  </div>
                                </td>

                                <td className="py-3 px-3">
                                  <div className="font-medium text-[#F3EFEA]">{apt.client_name}</div>
                                  <div className="text-[11px] text-[#8C847A] flex flex-col">
                                    <a href={`tel:${apt.client_phone}`} className="hover:text-[#C5A880] flex items-center gap-1">
                                      <Phone className="w-2.5 h-2.5" />
                                      {apt.client_phone}
                                    </a>
                                    <a href={`mailto:${apt.client_email}`} className="hover:text-[#C5A880] flex items-center gap-1">
                                      <Mail className="w-2.5 h-2.5" />
                                      {apt.client_email}
                                    </a>
                                  </div>
                                </td>

                                <td className="py-3 px-3 max-w-[200px]">
                                  <div className="font-medium text-[#EAE4DC] truncate" title={apt.service_name}>
                                    {apt.service_name}
                                  </div>
                                  <div className="text-[11px] text-[#C5A880] flex items-center gap-1">
                                    <Scissors className="w-2.5 h-2.5" />
                                    <span>{apt.stylist_name || 'Any Stylist'}</span>
                                  </div>
                                  {apt.hair_length && (
                                    <div className="text-[10px] text-[#8C847A]">
                                      Hair: {apt.hair_length}
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-3">
                                  <div className="font-semibold text-[#E5A855]">
                                    ${apt.estimated_price || 0}
                                  </div>
                                  {apt.add_ons && apt.add_ons.length > 0 && (
                                    <div className="text-[10px] text-[#8C847A]">
                                      +{apt.add_ons.length} add-on{apt.add_ons.length > 1 ? 's' : ''}
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-3">
                                  <select
                                    disabled={statusUpdatingId === apt.id}
                                    value={apt.status || 'confirmed'}
                                    onChange={(e) => apt.id && handleStatusChange(apt.id, e.target.value)}
                                    className={`text-[10px] uppercase font-semibold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                                      (apt.status || 'confirmed') === 'confirmed'
                                        ? 'bg-[#3ECF8E]/15 text-[#3ECF8E] border-[#3ECF8E]/30'
                                        : apt.status === 'completed'
                                        ? 'bg-[#79B4E3]/15 text-[#79B4E3] border-[#79B4E3]/30'
                                        : 'bg-[#E57373]/15 text-[#E57373] border-[#E57373]/30'
                                    }`}
                                  >
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>

                                <td className="py-3 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedBooking(apt)}
                                      className="px-2 py-1 bg-[#2C2925] hover:bg-[#38332C] text-[#EAE4DC] hover:text-[#F3EFEA] rounded text-[11px] transition-colors cursor-pointer"
                                      title="View complete client details"
                                    >
                                      View
                                    </button>
                                    {apt.id && (
                                      <button
                                        onClick={() => handleDeleteBooking(apt.id!)}
                                        className="p-1 text-[#7A7268] hover:text-[#E57373] transition-colors cursor-pointer"
                                        title="Delete booking"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Last updated footer indicator */}
                  <div className="flex items-center justify-between text-[11px] text-[#7A7268] pt-1">
                    <span>
                      Showing {filteredAppointments.length} of {appointments.length} total appointments
                    </span>
                    {lastUpdated && (
                      <span>
                        Last synced: {lastUpdated.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* Tab 2: SQL Schemas */}
              {activeTab === 'sql' && (
                <div className="space-y-4">
                  <div className="bg-[#1F1C18] border border-[#2E2A25] p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-[#F3EFEA]">Appointments Table Schema</h4>
                        <p className="text-xs text-[#8C847A]">Stores customer appointment bookings with RLS</p>
                      </div>
                      <button
                        onClick={() => handleCopy(SUPABASE_SQL_SETUP, 'sql_appointments')}
                        className="flex items-center gap-1.5 text-xs bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] px-3 py-1.5 rounded transition-colors cursor-pointer"
                      >
                        {copiedCode === 'sql_appointments' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode === 'sql_appointments' ? 'Copied' : 'Copy Appointments SQL'}</span>
                      </button>
                    </div>
                    <pre className="bg-[#121110] border border-[#26231F] p-3 rounded text-[11px] font-mono text-[#D8D0C5] overflow-x-auto max-h-48">
                      {SUPABASE_SQL_SETUP}
                    </pre>
                  </div>

                  <div className="bg-[#1F1C18] border border-[#2E2A25] p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-[#F3EFEA]">Single Admin Slot Table Schema (Optional)</h4>
                        <p className="text-xs text-[#8C847A]">Enforces single admin slot via <code>CONSTRAINT single_admin_slot CHECK (id = 1)</code></p>
                      </div>
                      <button
                        onClick={() => handleCopy(SALON_ADMIN_SQL_SETUP, 'sql_admin')}
                        className="flex items-center gap-1.5 text-xs bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] px-3 py-1.5 rounded transition-colors cursor-pointer"
                      >
                        {copiedCode === 'sql_admin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode === 'sql_admin' ? 'Copied' : 'Copy Admin SQL'}</span>
                      </button>
                    </div>
                    <pre className="bg-[#121110] border border-[#26231F] p-3 rounded text-[11px] font-mono text-[#D8D0C5] overflow-x-auto max-h-48">
                      {SALON_ADMIN_SQL_SETUP}
                    </pre>
                  </div>
                </div>
              )}

              {/* Tab 3: Slot & Security Status */}
              {activeTab === 'credentials' && (
                <div className="space-y-4">
                  <div className="bg-[#1F1C18] border border-[#2E2A25] p-4 rounded-md space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#F3EFEA]">
                      <ShieldCheck className="w-4 h-4 text-[#3ECF8E]" />
                      <span>Single Admin Slot Provisioning Status</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#171513] border border-[#26231F] rounded">
                        <span className="text-[#8C847A] block text-[10px] uppercase tracking-wider">Slot Allocation</span>
                        <span className="text-[#3ECF8E] font-semibold">1 of 1 Claimed & Sealed</span>
                      </div>
                      <div className="p-3 bg-[#171513] border border-[#26231F] rounded">
                        <span className="text-[#8C847A] block text-[10px] uppercase tracking-wider">Public Registration</span>
                        <span className="text-[#E57373] font-semibold">Permanently Disabled</span>
                      </div>
                      <div className="p-3 bg-[#171513] border border-[#26231F] rounded">
                        <span className="text-[#8C847A] block text-[10px] uppercase tracking-wider">Active Admin</span>
                        <span className="text-[#F3EFEA] font-medium">{session?.fullName} ({session?.email})</span>
                      </div>
                      <div className="p-3 bg-[#171513] border border-[#26231F] rounded">
                        <span className="text-[#8C847A] block text-[10px] uppercase tracking-wider">Session Initiated</span>
                        <span className="text-[#A69E92]">{new Date(session?.loggedInAt || '').toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#C5A880]/10 border border-[#C5A880]/20 rounded text-xs text-[#EAE4DC] flex items-start gap-2">
                      <Lock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#F3EFEA]">Strict Single-Slot Policy Enforced</p>
                        <p className="text-[11px] text-[#A69E92] mt-0.5">
                          The admin interface only allows this single registered administrator to log in. No external visitor can access booking records or create additional administrative accounts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Booking Drawer / Details Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-3 sm:p-6"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1A1815] border border-[#443E36] rounded-lg max-w-lg w-full p-5 sm:p-6 shadow-2xl relative text-xs text-[#EAE4DC] max-h-[85vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-4 right-4 text-[#8C847A] hover:text-[#F3EFEA] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-[#F3EFEA]">
                      Booking {selectedBooking.confirmation_code}
                    </h3>
                    <p className="text-[11px] text-[#8C847A]">
                      Created {new Date(selectedBooking.created_at || '').toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 divide-y divide-[#2A2621]">
                  {/* Client Info */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C847A] font-semibold block mb-1">
                      Client Contact
                    </span>
                    <div className="font-medium text-sm text-[#F3EFEA]">{selectedBooking.client_name}</div>
                    <div className="flex flex-col gap-1 mt-1 text-[#C5A880]">
                      <a href={`tel:${selectedBooking.client_phone}`} className="hover:underline flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        {selectedBooking.client_phone}
                      </a>
                      <a href={`mailto:${selectedBooking.client_email}`} className="hover:underline flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        {selectedBooking.client_email}
                      </a>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="pt-3 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block">Date & Time</span>
                      <span className="text-[#F3EFEA] font-medium">{selectedBooking.appointment_date} at {selectedBooking.time_slot}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block">Master Stylist</span>
                      <span className="text-[#C5A880] font-medium">{selectedBooking.stylist_name || 'Any Stylist'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block">Service Booked</span>
                      <span className="text-[#F3EFEA] font-medium">{selectedBooking.service_name}</span>
                    </div>
                  </div>

                  {/* Consultation Specs */}
                  <div className="pt-3 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C847A] font-semibold block">
                      Consultation Specs
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[#8C847A]">Hair Length:</span>{' '}
                        <span className="text-[#EAE4DC] capitalize">{selectedBooking.hair_length || 'Standard'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C847A]">Est. Price:</span>{' '}
                        <span className="text-[#E5A855] font-semibold">${selectedBooking.estimated_price}</span>
                      </div>
                    </div>
                    {selectedBooking.chemical_history && selectedBooking.chemical_history.length > 0 && (
                      <div className="text-[11px] pt-1">
                        <span className="text-[#8C847A] block text-[10px]">Chemical History:</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {selectedBooking.chemical_history.map((chem, idx) => (
                            <span key={idx} className="bg-[#2A2621] text-[#C5A880] px-1.5 py-0.5 rounded text-[10px]">
                              {chem}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedBooking.add_ons && selectedBooking.add_ons.length > 0 && (
                      <div className="text-[11px] pt-1">
                        <span className="text-[#8C847A] block text-[10px]">Add-ons Selected:</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {selectedBooking.add_ons.map((addon, idx) => (
                            <span key={idx} className="bg-[#2A2621] text-[#3ECF8E] px-1.5 py-0.5 rounded text-[10px]">
                              {addon}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedBooking.notes && (
                      <div className="text-[11px] pt-1">
                        <span className="text-[#8C847A] block text-[10px]">Client Notes:</span>
                        <p className="bg-[#121110] p-2 rounded text-[#A69E92] italic mt-0.5">
                          "{selectedBooking.notes}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions & Status */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block mb-1">
                        Status
                      </span>
                      <select
                        value={selectedBooking.status || 'confirmed'}
                        onChange={(e) => selectedBooking.id && handleStatusChange(selectedBooking.id, e.target.value)}
                        className="bg-[#26231F] border border-[#3E3830] text-xs text-[#EAE4DC] px-2 py-1 rounded focus:outline-none"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="px-4 py-2 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] font-semibold rounded text-xs transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
