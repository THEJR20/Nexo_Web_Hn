import React, { useState, useEffect } from 'react';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { api } from './services/api';
import Navbar from './components/Navbar';
import VacancyModal from './components/VacancyModal';
import NewVacancyModal from './components/NewVacancyModal';
import ExploreView from './views/ExploreView';
import LoginView from './views/LoginView';
import { StudentListView, StudentProfileView, StudentProView } from './views/StudentViews';
import B2BDashboardView from './views/B2BDashboardView';
import AdminDashboardView from './views/AdminDashboardView';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nexo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [view, setView] = useState('explore');
  const [authMode, setAuthMode] = useState('login');
  const [initialAuthRole, setInitialAuthRole] = useState('estudiante');
  const [loginAlert, setLoginAlert] = useState('');

  const [vacancies, setVacancies] = useState([]);
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [showNewVacancyModal, setShowNewVacancyModal] = useState(false);
  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Cargar datos reales desde PostgreSQL (Neon)
  const loadAppData = async (user) => {
    try {
      if (user?.role === 'admin') {
        const [allVacs, allUsers] = await Promise.all([
          api.getAllAdminVacancies(),
          api.getUsers(),
        ]);
        setVacancies(allVacs);
        setUsers(allUsers);
      } else if (user?.role === 'empresa' || user?.role === 'jefe') {
        const [pubVacs, myVacs] = await Promise.all([
          api.getPublicVacancies(),
          api.getMyVacancies(),
        ]);
        const merged = [...myVacs, ...pubVacs.filter((p) => !myVacs.some((m) => m.id === p.id))];
        setVacancies(merged);
      } else {
        const pubVacs = await api.getPublicVacancies();
        setVacancies(pubVacs);
      }

      if (user) {
        const inter = await api.getInteractions();
        setFavorites(inter.favorites || []);
        setAppliedIds(inter.appliedIds || []);
      } else {
        setFavorites([]);
        setAppliedIds([]);
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error sincronizando datos con el servidor API', 'warning');
    }
  };

  useEffect(() => {
    loadAppData(currentUser);
  }, [currentUser?.id, currentUser?.role]);

  const handleOpenAuth = (mode, role = 'estudiante') => {
    setAuthMode(mode);
    setInitialAuthRole(role);
    setLoginAlert('');
    setView('login');
  };

  const handleQuickLogin = async (role) => {
    const credentials = {
      estudiante: 'carlos.martinez@estudiante.hn',
      empresa: 'reclutamiento@ficohsa.com',
      jefe: 'coordinacion.sistemas@universidad.hn',
      admin: 'admin@portal.com',
    };
    try {
      const res = await api.login(credentials[role], '123456');
      localStorage.setItem('nexo_token', res.access_token);
      localStorage.setItem('nexo_user', JSON.stringify(res.user));
      setCurrentUser(res.user);
      setLoginAlert('');
      setView(role === 'admin' ? 'admin' : role === 'empresa' || role === 'jefe' ? 'b2b' : 'explore');
      triggerToast(`Bienvenido, ${res.user.name}`);
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  const handleAuthSubmit = async ({ mode, email, password, name, role }) => {
    try {
      if (mode === 'login') {
        const res = await api.login(email, password);
        localStorage.setItem('nexo_token', res.access_token);
        localStorage.setItem('nexo_user', JSON.stringify(res.user));
        setCurrentUser(res.user);
        setLoginAlert('');
        setView(res.user.role === 'admin' ? 'admin' : res.user.role === 'empresa' || res.user.role === 'jefe' ? 'b2b' : 'explore');
        triggerToast(`Sesión iniciada como ${res.user.name}`);
      } else {
        const res = await api.register({
          name,
          email,
          password,
          role,
          company_name: role === 'empresa' ? name : undefined,
        });
        if (res.status === 'pending') {
          triggerToast(res.message, 'warning');
          setAuthMode('login');
        } else {
          localStorage.setItem('nexo_token', res.access_token);
          localStorage.setItem('nexo_user', JSON.stringify(res.user));
          setCurrentUser(res.user);
          setLoginAlert('');
          setView('explore');
          triggerToast('¡Cuenta de estudiante activada de inmediato!');
        }
      }
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexo_token');
    localStorage.removeItem('nexo_user');
    setCurrentUser(null);
    setView('explore');
    triggerToast('Has cerrado sesión. Ahora navegas en Modo Invitado.');
  };

  // APLICAR (Incrementa clics en Neon y registra postulación)
  const handleApplyClick = async (vacancy) => {
    if (!currentUser) {
      setLoginAlert('Inicia sesión o crea tu cuenta gratis para aplicar a esta vacante.');
      setAuthMode('login');
      setView('login');
      setSelectedVacancy(null);
      return;
    }
    try {
      const { redirectUrl } = await api.registerApplyClick(vacancy.id);
      setVacancies((prev) => prev.map((v) => (v.id === vacancy.id ? { ...v, clicks: v.clicks + 1 } : v)));
      if (!appliedIds.includes(vacancy.id)) {
        setAppliedIds([...appliedIds, vacancy.id]);
      }
      triggerToast(`Redirigiendo a ${vacancy.company}...`);
      window.open(redirectUrl || vacancy.externalUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  // FAVORITOS EN DB
  const toggleFavorite = async (id) => {
    if (!currentUser) return;
    try {
      const res = await api.toggleFavorite(id);
      setFavorites((prev) => (res.is_favorite ? [...prev, id] : prev.filter((f) => f !== id)));
      triggerToast(res.is_favorite ? 'Guardada en tus favoritas' : 'Eliminada de tus favoritas');
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  // POSTULACIÓN MANUAL EN DB
  const toggleApplied = async (id) => {
    if (!currentUser) return;
    try {
      const res = await api.toggleApplied(id);
      setAppliedIds((prev) => (res.has_applied ? [...prev, id] : prev.filter((a) => a !== id)));
      if (res.has_applied) triggerToast('Marcada como "Ya apliqué"');
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  // CREATE & UPDATE VACANCY EN DB
  const handleSaveVacancy = async (formData, editingId = null) => {
    try {
      if (editingId) {
        const updated = await api.updateVacancy(editingId, formData);
        setVacancies((prev) => prev.map((v) => (v.id === editingId ? updated : v)));
        triggerToast('Vacante actualizada en Neon (enviada a revisión).');
      } else {
        const created = await api.createVacancy(formData);
        setVacancies([created, ...vacancies]);
        triggerToast('Vacante guardada en Neon. Queda "Pendiente de revisión".');
      }
      setEditingVacancy(null);
      setShowNewVacancyModal(false);
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  // DELETE VACANCY EN DB
  const handleDeleteVacancy = async (id, title) => {
    if (!window.confirm(`¿Seguro que deseas eliminar la vacante "${title}" de forma permanente?`)) return;
    try {
      await api.deleteVacancy(id);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
      triggerToast('Vacante eliminada permanentemente de Neon.');
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  // MODERACIÓN ADMIN VACANTES
  const handleModeration = async (id, updates, successMsg) => {
    try {
      const updated = await api.moderateVacancy(id, updates);
      setVacancies((prev) => prev.map((v) => (v.id === id ? updated : v)));
      if (successMsg) triggerToast(successMsg);
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  // MODERACIÓN ADMIN USUARIOS
  const handleUserApproval = async (id, status) => {
    try {
      const updated = await api.updateUserStatus(id, { status });
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      triggerToast(status === 'approved' ? 'Cuenta aprobada en Neon' : 'Cuenta rechazada');
    } catch (err) {
      triggerToast(err.message, 'warning');
    }
  };

  if (view === 'login') {
    return (
      <LoginView
        authMode={authMode}
        setAuthMode={setAuthMode}
        initialRole={initialAuthRole}
        loginAlert={loginAlert}
        onClose={() => {
          setView('explore');
          setLoginAlert('');
        }}
        onQuickLogin={handleQuickLogin}
        onAuthSubmit={handleAuthSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
          <span>{toast.msg}</span>
        </div>
      )}

      <Navbar
        currentUser={currentUser}
        view={view}
        setView={setView}
        favoritesCount={favorites.length}
        appliedCount={appliedIds.length}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {view === 'explore' && (
          <ExploreView
            vacancies={vacancies.filter((v) => v.status === 'approved')}
            currentUser={currentUser}
            favorites={favorites}
            appliedIds={appliedIds}
            onToggleFavorite={toggleFavorite}
            onToggleApplied={toggleApplied}
            onSelectVacancy={setSelectedVacancy}
            onApplyClick={handleApplyClick}
            onReportBroken={(title) =>
              triggerToast(`Reporte enviado al Admin: enlace en "${title}" será revisado.`, 'warning')
            }
            onOpenCompanyRegister={() => handleOpenAuth('register', 'empresa')}
            onTriggerToast={triggerToast}
          />
        )}

        {view === 'favorites' && currentUser && (
          <StudentListView
            title="Mis Vacantes Favoritas"
            subtitle="Ofertas guardadas en tu cuenta."
            items={vacancies.filter((v) => favorites.includes(v.id))}
            onApply={handleApplyClick}
          />
        )}

        {view === 'applications' && currentUser && (
          <StudentListView
            title="Historial de Postulaciones"
            subtitle="Vacantes en las que has hecho clic en aplicar o marcaste como enviadas."
            items={vacancies.filter((v) => appliedIds.includes(v.id))}
            onApply={handleApplyClick}
          />
        )}

        {view === 'profile' && currentUser && (
          <StudentProfileView
            currentUser={currentUser}
            onUpdateUser={(updatedUser) => {
              setCurrentUser(updatedUser);
              localStorage.setItem('nexo_user', JSON.stringify(updatedUser));
            }}
            onTriggerToast={triggerToast}
          />
        )}

        {view === 'pro' && <StudentProView onTriggerToast={triggerToast} />}

        {view === 'b2b' && currentUser && (
          <B2BDashboardView
            currentUser={currentUser}
            vacancies={vacancies}
            onOpenNewModal={() => {
              setEditingVacancy(null);
              setShowNewVacancyModal(true);
            }}
            onEditVacancy={(vac) => {
              setEditingVacancy(vac);
              setShowNewVacancyModal(true);
            }}
            onDeleteVacancy={handleDeleteVacancy}
          />
        )}

        {view === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboardView
            users={users}
            vacancies={vacancies}
            onToggleFlag={(id, field) => {
              const target = vacancies.find((v) => v.id === id);
              if (target) handleModeration(id, { [field]: !target[field] });
            }}
            onVacancyStatus={(id, status) =>
              handleModeration(
                id,
                { status },
                status === 'approved' ? 'Vacante aprobada y visible al público' : 'Vacante rechazada',
              )
            }
            onDeleteVacancy={handleDeleteVacancy}
            onUserApproval={handleUserApproval}
          />
        )}
      </main>

      <VacancyModal
        vacancy={selectedVacancy}
        onClose={() => setSelectedVacancy(null)}
        onApply={handleApplyClick}
      />

      <NewVacancyModal
        isOpen={showNewVacancyModal}
        editingVacancy={editingVacancy}
        onClose={() => {
          setShowNewVacancyModal(false);
          setEditingVacancy(null);
        }}
        onSave={handleSaveVacancy}
      />

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <GraduationCap className="w-4 h-4 text-blue-600" /> Nexo - Portal Universitario Honduras
          </div>
          <p>Directorio ágil de prácticas profesionales • Cero almacenamiento de archivos</p>
        </div>
      </footer>
    </div>
  );
}
