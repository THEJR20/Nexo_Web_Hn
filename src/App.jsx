import React, { useState } from 'react';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { INITIAL_VACANCIES, INITIAL_USERS } from './data/mockData';
import Navbar from './components/Navbar';
import VacancyModal from './components/VacancyModal';
import NewVacancyModal from './components/NewVacancyModal';
import ExploreView from './views/ExploreView';
import LoginView from './views/LoginView';
import { StudentListView, StudentProfileView, StudentProView } from './views/StudentViews';
import B2BDashboardView from './views/B2BDashboardView';
import AdminDashboardView from './views/AdminDashboardView';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('explore');
  const [authMode, setAuthMode] = useState('login');
  const [initialAuthRole, setInitialAuthRole] = useState('estudiante');
  const [loginAlert, setLoginAlert] = useState('');

  const [vacancies, setVacancies] = useState(INITIAL_VACANCIES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [favorites, setFavorites] = useState([1]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [showNewVacancyModal, setShowNewVacancyModal] = useState(false);
  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenAuth = (mode, role = 'estudiante') => {
    setAuthMode(mode);
    setInitialAuthRole(role);
    setLoginAlert('');
    setView('login');
  };

  const handleQuickLogin = (role) => {
    const found = users.find(u => u.role === role && u.status === 'approved');
    if (found) {
      setCurrentUser(found);
      setLoginAlert('');
      setView(role === 'admin' ? 'admin' : (role === 'empresa' || role === 'jefe') ? 'b2b' : 'explore');
      triggerToast(`Bienvenido, ${found.name}`);
    }
  };

  const handleAuthSubmit = ({ mode, email, name, role }) => {
    if (mode === 'login') {
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        if (found.status === 'pending') {
          triggerToast('Tu cuenta de empresa/jefatura sigue pendiente de aprobación por el Administrador.', 'warning');
          return;
        }
        setCurrentUser(found);
        setLoginAlert('');
        setView(found.role === 'admin' ? 'admin' : (found.role === 'empresa' || found.role === 'jefe') ? 'b2b' : 'explore');
        triggerToast(`Sesión iniciada como ${found.name}`);
      } else {
        const tempUser = {
          id: Date.now(),
          name: email.split('@')[0],
          email,
          role: email.includes('admin') ? 'admin' : 'estudiante',
          status: 'approved',
          career: 'Informática Administrativa',
          cvUrl: ''
        };
        setCurrentUser(tempUser);
        setLoginAlert('');
        setView(tempUser.role === 'admin' ? 'admin' : 'explore');
        triggerToast(`Bienvenido a Nexo, ${tempUser.name}`);
      }
    } else {
      const isInstant = role === 'estudiante';
      const newUser = {
        id: Date.now(),
        name: name || 'Nuevo Usuario',
        email,
        role,
        status: isInstant ? 'approved' : 'pending',
        career: 'Informática Administrativa',
        cvUrl: '',
        lastVisit: 'Ahora',
        activeApplicant: false
      };
      setUsers([...users, newUser]);
      if (isInstant) {
        setCurrentUser(newUser);
        setLoginAlert('');
        setView('explore');
        triggerToast('¡Cuenta de estudiante activada de inmediato!');
      } else {
        triggerToast('Registro enviado. Tu cuenta queda Pendiente de aprobación por el Administrador.', 'warning');
        setAuthMode('login');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('explore');
    triggerToast('Has cerrado sesión. Ahora navegas en Modo Invitado.');
  };

  const handleApplyClick = (vacancy) => {
    if (!currentUser) {
      setLoginAlert('Inicia sesión o crea tu cuenta gratis para aplicar a esta vacante.');
      setAuthMode('login');
      setView('login');
      setSelectedVacancy(null);
      return;
    }
    setVacancies(prev => prev.map(v => v.id === vacancy.id ? { ...v, clicks: v.clicks + 1 } : v));
    if (!appliedIds.includes(vacancy.id)) {
      setAppliedIds([...appliedIds, vacancy.id]);
    }
    triggerToast(`Redirigiendo a ${vacancy.company}... (Clic registrado en métricas)`);
    window.open(vacancy.externalUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleFavorite = (id) => {
    if (!currentUser) return;
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    triggerToast(favorites.includes(id) ? 'Eliminada de tus favoritas' : 'Guardada en tus favoritas');
  };

  const toggleApplied = (id) => {
    if (!currentUser) return;
    setAppliedIds(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    if (!appliedIds.includes(id)) triggerToast('Marcada como "Ya apliqué"');
  };

  const handleCreateVacancy = (newVac) => {
    const companyName = currentUser.company || newVac.company;
    const activeCount = vacancies.filter(v => v.company === companyName && v.status === 'approved').length;
    if (currentUser.role === 'empresa' && activeCount >= 1) {
      triggerToast('Límite alcanzado: El plan gratuito permite máximo 1 vacante activa a la vez.', 'warning');
      return;
    }

    const created = {
      id: Date.now(),
      title: newVac.title,
      company: currentUser.role === 'jefe' ? `${newVac.company} (Vía Jefatura)` : companyName,
      department: newVac.department,
      modality: newVac.modality,
      schedule: newVac.schedule,
      careers: [newVac.careers],
      closingDate: newVac.closingDate,
      source: currentUser.role === 'jefe' ? 'Jefe de Departamento' : 'Portal Directo',
      externalUrl: newVac.externalUrl || 'https://www.google.com',
      status: 'pending',
      featured: false,
      urgent: false,
      clicks: 0,
      remunerated: true,
      requirements: newVac.requirements,
      description: newVac.description
    };
    setVacancies([created, ...vacancies]);
    setShowNewVacancyModal(false);
    triggerToast('Vacante publicada. Queda en estado "Pendiente de revisión" por el Admin.');
  };

  if (view === 'login') {
    return (
      <LoginView
        authMode={authMode}
        setAuthMode={setAuthMode}
        initialRole={initialAuthRole}
        loginAlert={loginAlert}
        onClose={() => { setView('explore'); setLoginAlert(''); }}
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
            vacancies={vacancies}
            currentUser={currentUser}
            favorites={favorites}
            appliedIds={appliedIds}
            onToggleFavorite={toggleFavorite}
            onToggleApplied={toggleApplied}
            onSelectVacancy={setSelectedVacancy}
            onApplyClick={handleApplyClick}
            onReportBroken={(title) => triggerToast(`Reporte enviado al Admin: enlace en "${title}" será revisado.`, 'warning')}
            onOpenCompanyRegister={() => handleOpenAuth('register', 'empresa')}
            onTriggerToast={triggerToast}
          />
        )}

        {view === 'favorites' && currentUser && (
          <StudentListView
            title="Mis Vacantes Favoritas"
            subtitle="Ofertas que has guardado para revisar más tarde."
            items={vacancies.filter(v => favorites.includes(v.id))}
            onApply={handleApplyClick}
          />
        )}

        {view === 'applications' && currentUser && (
          <StudentListView
            title="Historial de Postulaciones"
            subtitle="Vacantes en las que has hecho clic en aplicar o marcaste como enviadas."
            items={vacancies.filter(v => appliedIds.includes(v.id))}
            onApply={handleApplyClick}
          />
        )}

        {view === 'profile' && currentUser && (
          <StudentProfileView currentUser={currentUser} onTriggerToast={triggerToast} />
        )}

        {view === 'pro' && <StudentProView onTriggerToast={triggerToast} />}

        {view === 'b2b' && currentUser && (
          <B2BDashboardView
            currentUser={currentUser}
            vacancies={vacancies}
            onOpenNewModal={() => setShowNewVacancyModal(true)}
          />
        )}

        {view === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboardView
            users={users}
            vacancies={vacancies}
            onToggleFlag={(id, field) => setVacancies(prev => prev.map(v => v.id === id ? { ...v, [field]: !v[field] } : v))}
            onVacancyStatus={(id, status) => {
              setVacancies(prev => prev.map(v => v.id === id ? { ...v, status } : v));
              triggerToast(status === 'approved' ? 'Vacante aprobada y visible al público' : 'Vacante rechazada');
            }}
            onUserApproval={(id, status) => {
              setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
              triggerToast(status === 'approved' ? 'Cuenta aprobada exitosamente' : 'Cuenta rechazada');
            }}
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
        onClose={() => setShowNewVacancyModal(false)}
        onCreate={handleCreateVacancy}
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