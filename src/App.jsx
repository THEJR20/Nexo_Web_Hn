import React, { useState, useMemo } from 'react';
import {
  Search, MapPin, Clock, Briefcase, Building2, GraduationCap,
  ShieldCheck, Bookmark, CheckCircle2, AlertTriangle, ExternalLink,
  PlusCircle, Users, BarChart3, LogOut, LogIn, UserPlus, Sparkles,
  Filter, X, ChevronRight, Award, Flame, Eye, Check, Ban, Link as LinkIcon,
  Menu, Bell, Star, ArrowRight
} from 'lucide-react';

// --- MOCK DATA (HONDURAS) ---
const INITIAL_VACANCIES = [
  {
    id: 1,
    title: 'Practicante de Desarrollo Full-Stack',
    company: 'Tigo Honduras',
    department: 'Tegucigalpa',
    modality: 'Híbrido',
    schedule: 'Tiempo Completo',
    careers: ['Informática Administrativa', 'Ingeniería en Sistemas'],
    closingDate: '2026-12-10',
    source: 'Portal Corporativo Tigo',
    externalUrl: 'https://www.tigo.com.hn',
    status: 'approved',
    featured: true,
    urgent: true,
    clicks: 142,
    remunerated: true,
    requirements: 'Conocimientos básicos en React, Node.js y bases de datos SQL. Cursando último año de carrera.',
    description: 'Únete al equipo de canales digitales para apoyar en la mejora de servicios web y APIs internas.'
  },
  {
    id: 2,
    title: 'Pasante de Inteligencia de Negocios (BI)',
    company: 'Banco Ficohsa',
    department: 'Tegucigalpa',
    modality: 'Presencial',
    schedule: 'Medio Tiempo',
    careers: ['Informática Administrativa', 'Administración de Empresas'],
    closingDate: '2026-12-05',
    source: 'Ficohsa Talento',
    externalUrl: 'https://www.ficohsa.com',
    status: 'approved',
    featured: true,
    urgent: false,
    clicks: 98,
    remunerated: true,
    requirements: 'Manejo intermedio-avanzado de Excel, Power BI y consultas SQL básicas.',
    description: 'Apoyo en la creación de tableros ejecutivos y análisis de indicadores financieros.'
  },
  {
    id: 3,
    title: 'Practicante de Logística y Cadena de Suministro',
    company: 'Cervecería Hondureña',
    department: 'San Pedro Sula',
    modality: 'Presencial',
    schedule: 'Tiempo Completo',
    careers: ['Administración de Empresas'],
    closingDate: '2026-12-15',
    source: 'LinkedIn Empleos',
    externalUrl: 'https://www.cerveceriahondurena.com',
    status: 'approved',
    featured: false,
    urgent: true,
    clicks: 76,
    remunerated: true,
    requirements: 'Estudiante de último año de Administración. Capacidad analítica y disponibilidad de horario.',
    description: 'Seguimiento a rutas de distribución, control de inventarios y optimización de tiempos de entrega.'
  },
  {
    id: 4,
    title: 'Soporte Técnico e Infraestructura TI',
    company: 'CM Airlines',
    department: 'Tegucigalpa',
    modality: 'Presencial',
    schedule: 'Tiempo Completo',
    careers: ['Informática Administrativa', 'Ingeniería en Sistemas'],
    closingDate: '2026-12-01',
    source: 'Correo Institucional',
    externalUrl: 'https://www.cmairlines.com',
    status: 'approved',
    featured: false,
    urgent: false,
    clicks: 64,
    remunerated: false,
    requirements: 'Conocimientos en redes, mantenimiento preventivo de equipos y atención a usuarios.',
    description: 'Soporte operativo en estaciones aeroportuarias y oficinas administrativas.'
  },
  {
    id: 5,
    title: 'Asistente de Comercio Electrónico (E-Commerce)',
    company: 'Diunsa',
    department: 'San Pedro Sula',
    modality: 'Remoto',
    schedule: 'Medio Tiempo',
    careers: ['Administración de Empresas', 'Informática Administrativa'],
    closingDate: '2026-12-20',
    source: 'Portal Diunsa',
    externalUrl: 'https://www.diunsa.hn',
    status: 'approved',
    featured: false,
    urgent: false,
    clicks: 115,
    remunerated: true,
    requirements: 'Interés en marketing digital, gestión de catálogos web y atención al cliente.',
    description: 'Gestión de inventario en tienda en línea, actualización de promociones y análisis de conversión.'
  },
  {
    id: 6,
    title: 'Practicante de Auditoría Interna y Procesos',
    company: 'Corporación Dinant',
    department: 'Tegucigalpa',
    modality: 'Híbrido',
    schedule: 'Tiempo Completo',
    careers: ['Administración de Empresas'],
    closingDate: '2026-12-18',
    source: 'Jefatura de Departamento',
    externalUrl: 'https://www.dinant.com',
    status: 'approved',
    featured: false,
    urgent: false,
    clicks: 53,
    remunerated: true,
    requirements: 'Excel avanzado, redacción de informes ejecutivos y conocimientos de control interno.',
    description: 'Apoyo en levantamiento de procesos administrativos y verificación de cumplimiento.'
  },
  {
    id: 7,
    title: 'Analista Junior de Seguridad Informática',
    company: 'Grupo Terra',
    department: 'Tegucigalpa',
    modality: 'Remoto',
    schedule: 'Tiempo Completo',
    careers: ['Informática Administrativa', 'Ingeniería en Sistemas'],
    closingDate: '2026-12-22',
    source: 'Portal Grupo Terra',
    externalUrl: 'https://www.grupoterra.com',
    status: 'pending',
    featured: false,
    urgent: false,
    clicks: 0,
    remunerated: true,
    requirements: 'Conocimientos en fundamentos de ciberseguridad, Active Directory y monitoreo.',
    description: 'Monitoreo de alertas de seguridad y apoyo en políticas de acceso organizacional.'
  }
];

const INITIAL_USERS = [
  { id: 1, name: 'Carlos Martínez', email: 'carlos.martinez@estudiante.hn', role: 'estudiante', status: 'approved', career: 'Informática Administrativa', cvUrl: 'https://linkedin.com/in/carlos-martinez-hn', lastVisit: '2026-11-23 18:10', activeApplicant: true },
  { id: 2, name: 'Reclutamiento Ficohsa', email: 'reclutamiento@ficohsa.com', role: 'empresa', status: 'approved', company: 'Banco Ficohsa', plan: 'free', lastVisit: '2026-11-23 14:20', activeApplicant: false },
  { id: 3, name: 'Coordinación Sistemas UNAH', email: 'coordinacion.sistemas@universidad.hn', role: 'jefe', status: 'approved', department: 'Informática Administrativa', lastVisit: '2026-11-22 09:45', activeApplicant: false },
  { id: 4, name: 'Administrador Nexo', email: 'admin@portal.com', role: 'admin', status: 'approved', lastVisit: '2026-11-23 18:25', activeApplicant: false },
  { id: 5, name: 'Talento Humano Lacthosa', email: 'rrhh@lacthosa.com', role: 'empresa', status: 'pending', company: 'Lacthosa', plan: 'free', lastVisit: '2026-11-23 11:00', activeApplicant: false },
];

export default function App() {
  // --- STATE ---
  const [currentUser, setCurrentUser] = useState(null); // null = Modo Invitado (Guest)
  const [view, setView] = useState('explore'); // 'explore' | 'login' | 'favorites' | 'applications' | 'profile' | 'pro' | 'b2b' | 'admin'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginAlert, setLoginAlert] = useState('');

  // Data State
  const [vacancies, setVacancies] = useState(INITIAL_VACANCIES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [favorites, setFavorites] = useState([1]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [careerFilter, setCareerFilter] = useState('Todas');
  const [modalityFilter, setModalityFilter] = useState('Todas');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [onlyRemunerated, setOnlyRemunerated] = useState(false);

  // Auth Form State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('estudiante');

  // New Vacancy Form State (B2B / Jefe)
  const [showNewVacancyModal, setShowNewVacancyModal] = useState(false);
  const [newVac, setNewVac] = useState({
    title: '',
    company: '',
    department: 'Tegucigalpa',
    modality: 'Híbrido',
    schedule: 'Tiempo Completo',
    careers: 'Informática Administrativa',
    closingDate: '2026-12-30',
    externalUrl: '',
    requirements: '',
    description: ''
  });

  // Helper Toast
  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // --- AUTH HANDLERS ---
  const handleQuickLogin = (role) => {
    const found = users.find(u => u.role === role && u.status === 'approved');
    if (found) {
      setCurrentUser(found);
      setLoginAlert('');
      if (role === 'admin') setView('admin');
      else if (role === 'empresa' || role === 'jefe') setView('b2b');
      else setView('explore');
      triggerToast(`Bienvenido, ${found.name}`);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      const found = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase());
      if (found) {
        if (found.status === 'pending') {
          triggerToast('Tu cuenta de empresa/jefatura sigue pendiente de aprobación por el Administrador.', 'warning');
          return;
        }
        setCurrentUser(found);
        setLoginAlert('');
        if (found.role === 'admin') setView('admin');
        else if (found.role === 'empresa' || found.role === 'jefe') setView('b2b');
        else setView('explore');
        triggerToast(`Sesión iniciada como ${found.name}`);
      } else {
        // Fallback rápido para pruebas
        const tempUser = {
          id: Date.now(),
          name: emailInput.split('@')[0],
          email: emailInput,
          role: emailInput.includes('admin') ? 'admin' : 'estudiante',
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
      // Registro
      const isInstant = roleInput === 'estudiante';
      const newUser = {
        id: Date.now(),
        name: nameInput || 'Nuevo Usuario',
        email: emailInput,
        role: roleInput,
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

  // --- INTERACTION HANDLERS (CON BLOQUEO EN MODO INVITADO) ---
  const handleApplyClick = (vacancy) => {
    if (!currentUser) {
      setLoginAlert('Inicia sesión o crea tu cuenta gratis para aplicar a esta vacante.');
      setAuthMode('login');
      setView('login');
      setSelectedVacancy(null);
      return;
    }
    // Incrementar métrica de clics
    setVacancies(prev => prev.map(v => v.id === vacancy.id ? { ...v, clicks: v.clicks + 1 } : v));
    if (!appliedIds.includes(vacancy.id)) {
      setAppliedIds([...appliedIds, vacancy.id]);
    }
    triggerToast(`Redirigiendo a ${vacancy.company}... (Clic registrado en métricas)`);
    window.open(vacancy.externalUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleFavorite = (id) => {
    if (!currentUser) return;
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      triggerToast('Eliminada de tus favoritas');
    } else {
      setFavorites([...favorites, id]);
      triggerToast('Guardada en tus vacantes favoritas');
    }
  };

  const toggleApplied = (id) => {
    if (!currentUser) return;
    if (appliedIds.includes(id)) {
      setAppliedIds(appliedIds.filter(a => a !== id));
    } else {
      setAppliedIds([...appliedIds, id]);
      triggerToast('Marcada como "Ya apliqué" en tu historial');
    }
  };

  const handleReportBroken = (title) => {
    if (!currentUser) return;
    triggerToast(`Reporte enviado al Administrador: enlace en "${title}" será revisado.`, 'warning');
  };

  // --- B2B & ADMIN HANDLERS ---
  const handleCreateVacancy = (e) => {
    e.preventDefault();
    const companyVacancies = vacancies.filter(v => v.company === (currentUser.company || newVac.company) && v.status === 'approved');
    if (currentUser.role === 'empresa' && companyVacancies.length >= 1) {
      triggerToast('Límite alcanzado: El plan gratuito permite máximo 1 vacante activa a la vez.', 'warning');
      return;
    }

    const created = {
      id: Date.now(),
      title: newVac.title,
      company: currentUser.role === 'jefe' ? `${newVac.company} (Vía Jefatura)` : (currentUser.company || newVac.company),
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

  const handleAdminVacancyStatus = (id, status) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    triggerToast(status === 'approved' ? 'Vacante aprobada y visible al público' : 'Vacante rechazada');
  };

  const handleAdminToggleFlag = (id, field) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, [field]: !v[field] } : v));
  };

  const handleAdminUserApproval = (id, status) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    triggerToast(status === 'approved' ? 'Cuenta aprobada exitosamente' : 'Cuenta rechazada');
  };

  // --- FILTERED VACANCIES ---
  const filteredVacancies = useMemo(() => {
    return vacancies.filter(v => {
      if (v.status !== 'approved') return false;
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCareer = careerFilter === 'Todas' || v.careers.includes(careerFilter);
      const matchesModality = modalityFilter === 'Todas' || v.modality === modalityFilter;
      const matchesDept = departmentFilter === 'Todos' || v.department === departmentFilter;
      const matchesRemote = !onlyRemote || v.modality === 'Remoto';
      const matchesRemun = !onlyRemunerated || v.remunerated;
      return matchesSearch && matchesCareer && matchesModality && matchesDept && matchesRemote && matchesRemun;
    });
  }, [vacancies, searchQuery, careerFilter, modalityFilter, departmentFilter, onlyRemote, onlyRemunerated]);

  // --- RENDER: NATIVE AD PLACEHOLDER ---
  const NativeAdCard = () => (
    <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 border border-blue-800/50 shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30">
          Patrocinado
        </span>
        <Sparkles className="w-4 h-4 text-blue-400" />
      </div>
      <div>
        <h4 className="text-lg font-bold leading-snug mb-1">
          Certifícate en Cloud & SQL antes de tu práctica
        </h4>
        <p className="text-slate-300 text-sm mb-4">
          Descuento del 50% para estudiantes universitarios en Honduras. Mejora tu perfil técnico hoy.
        </p>
      </div>
      <button
        onClick={() => triggerToast('Abriendo enlace del patrocinador...')}
        className="w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-blue-50 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
      >
        Ver beneficio estudiantil <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );

  // --- RENDER: LOGIN / REGISTER SPLIT SCREEN ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row">
        {/* Columna Izquierda: Formulario */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setView('explore'); setLoginAlert(''); }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-none">nexo</span>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Portal Universitario</span>
              </div>
            </button>
            <button
              onClick={() => { setView('explore'); setLoginAlert(''); }}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1"
            >
              Volver a explorar <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-w-md w-full mx-auto my-8">
            {loginAlert && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="font-medium">{loginAlert}</p>
              </div>
            )}

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {authMode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta en Nexo'}
            </h1>
            <p className="text-slate-500 text-sm mb-6">
              {authMode === 'login'
                ? 'Ingresa tus credenciales para gestionar tus postulaciones o vacantes.'
                : 'Regístrate gratis. Los estudiantes obtienen acceso inmediato.'}
            </p>

            {/* Tabs Login / Registro */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-2 text-sm font-semibold rounded-lg transition ${authMode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`py-2 text-sm font-semibold rounded-lg transition ${authMode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Crear Cuenta
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nombre completo o Empresa</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      placeholder="Ej. Ana María López"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Tipo de Cuenta (Rol)</label>
                    <select
                      value={roleInput}
                      onChange={e => setRoleInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm bg-white"
                    >
                      <option value="estudiante">Estudiante Universitario (Acceso inmediato)</option>
                      <option value="empresa">Empresa / Reclutador (Requiere aprobación)</option>
                      <option value="jefe">Jefe de Departamento (Requiere aprobación)</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/20 transition text-sm"
              >
                {authMode === 'login' ? 'Entrar al Portal' : 'Completar Registro'}
              </button>
            </form>

            {/* Acceso Rápido Demo */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
                Acceso directo de prueba (1 Clic)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleQuickLogin('estudiante')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                  🎓 Estudiante
                </button>
                <button onClick={() => handleQuickLogin('empresa')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                  🏢 Empresa (Ficohsa)
                </button>
                <button onClick={() => handleQuickLogin('jefe')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                  👨‍🏫 Jefe de Depto.
                </button>
                <button onClick={() => handleQuickLogin('admin')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                  👑 Administrador
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            © 2026 Nexo Honduras. Conectando talento universitario sin fricciones.
          </p>
        </div>

        {/* Columna Derecha: Banner Publicitario Split-Screen */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white p-8 sm:p-16 flex flex-col justify-between relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-semibold w-fit">
            <span>ESPACIO PUBLICITARIO DESTACADO</span>
          </div>

          <div className="my-12 max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Impulsa tu carrera profesional desde la universidad.
            </h2>
            <p className="text-blue-100 text-base leading-relaxed mb-8">
              Conecta directamente con las empresas líderes de Honduras. Sin intermediarios ni formularios interminables: encuentra tu plaza y postula en segundos.
            </p>

            {/* Tarjeta Mock de Patrocinador Premium */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <span className="text-[10px] uppercase tracking-widest text-blue-200 font-bold">Aliado Tecnológico</span>
              <h3 className="text-xl font-bold mt-1 mb-2">Becas de Inglés Corporativo & Tech</h3>
              <p className="text-sm text-blue-100 mb-4">
                Prepárate para entrevistas multinacionales con programas intensivos diseñados para practicantes.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-white underline">
                Conocer convocatoria 2026 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-blue-200">
            <span>+120 Vacantes activas</span>
            <span>•</span>
            <span>Tegucigalpa & San Pedro Sula</span>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP SHELL (GUEST & AUTHENTICATED) ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button onClick={() => setView('explore')} className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-none">nexo</span>
                <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Portal Universitario</span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setView('explore')}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${view === 'explore' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Explorar vacantes
              </button>

              {currentUser?.role === 'estudiante' && (
                <>
                  <button
                    onClick={() => setView('favorites')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${view === 'favorites' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Mis favoritas
                    <span className="bg-slate-200 text-slate-700 text-xs px-1.5 py-0.2 rounded-full">{favorites.length}</span>
                  </button>
                  <button
                    onClick={() => setView('applications')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${view === 'applications' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Mis postulaciones ({appliedIds.length})
                  </button>
                  <button
                    onClick={() => setView('profile')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${view === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Mi CV / Perfil
                  </button>
                  <button
                    onClick={() => setView('pro')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition text-amber-600 hover:bg-amber-50 flex items-center gap-1`}
                  >
                    <Sparkles className="w-4 h-4" /> Plan Pro
                  </button>
                </>
              )}

              {(currentUser?.role === 'empresa' || currentUser?.role === 'jefe') && (
                <button
                  onClick={() => setView('b2b')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${view === 'b2b' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Panel de Gestión B2B
                </button>
              )}

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => setView('admin')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${view === 'admin' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Consola Administrador
                </button>
              )}
            </nav>
          </div>

          {/* Right Auth / Profile Actions */}
          <div className="flex items-center gap-3">
            {!currentUser ? (
              <>
                <button
                  onClick={() => { setAuthMode('login'); setLoginAlert(''); setView('login'); }}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setLoginAlert(''); setView('login'); }}
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
                >
                  Crear cuenta
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                  <p className="text-[11px] font-medium text-blue-600 capitalize">{currentUser.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* VIEW 1: EXPLORE (PUBLIC GUEST MODE + STUDENT DASHBOARD) */}
        {view === 'explore' && (
          <div>
            {/* Editorial Hero Section */}
            <section className="bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50/60 to-slate-100 rounded-3xl p-8 sm:p-12 border border-blue-100 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full mb-4">
                      • Tu próximo paso empieza aquí
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
                      Tu talento.<br />
                      <span className="text-blue-600">Su próxima gran oportunidad.</span>
                    </h1>
                    <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                      Conecta con las empresas líderes de Honduras, gana experiencia real y realiza tu práctica profesional sin fricciones ni formularios interminables.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="#buscador-vacantes"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/20 transition text-sm"
                      >
                        Explorar vacantes ahora
                      </a>
                      {!currentUser && (
                        <button
                          onClick={() => { setAuthMode('register'); setRoleInput('empresa'); setView('login'); }}
                          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold rounded-xl transition text-sm"
                        >
                          Publicar vacante (Empresas)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Editorial Bento Stats */}
                  <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                      <Briefcase className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-2xl font-extrabold text-slate-900">{vacancies.filter(v => v.status === 'approved').length}</p>
                      <p className="text-xs text-slate-500 font-medium">Plazas activas hoy</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                      <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                      <p className="text-2xl font-extrabold text-slate-900">100%</p>
                      <p className="text-xs text-slate-500 font-medium">Enlace directo</p>
                    </div>
                    <div className="col-span-2 bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
                      <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">Cero burocracia</p>
                      <p className="text-sm font-medium text-slate-200">
                        Sin subir archivos pesados. Postula directo en el portal oficial de cada empresa.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Proof Bar (Empresas de Honduras) */}
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Empresas referentes en Honduras
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-slate-400 font-extrabold text-sm sm:text-base tracking-tight">
                    <span>TIGO</span>
                    <span>BANCO FICOHSA</span>
                    <span>CERVECERÍA HONDUREÑA</span>
                    <span>DIUNSA</span>
                    <span>CORPORACIÓN DINANT</span>
                    <span>GRUPO TERRA</span>
                    <span>CM AIRLINES</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Search & Directory Section */}
            <section id="buscador-vacantes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Encuentra tu próxima práctica</h2>
                  <p className="text-sm text-slate-500">Explora libremente las convocatorias abiertas en todo el país.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {filteredVacancies.length} vacantes disponibles
                </span>
              </div>

              {/* Search & Select Filters Box */}
              <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Busca por puesto, empresa o palabra clave..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm"
                    />
                  </div>
                  <select
                    value={careerFilter}
                    onChange={e => setCareerFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium bg-white text-slate-700 outline-none"
                  >
                    <option value="Todas">Todas las carreras</option>
                    <option value="Informática Administrativa">Informática Administrativa</option>
                    <option value="Administración de Empresas">Administración de Empresas</option>
                    <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
                  </select>
                </div>

                {/* Dropdowns & Quick Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <select
                    value={modalityFilter}
                    onChange={e => setModalityFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50"
                  >
                    <option value="Todas">Modalidad: Todas</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                  </select>
                  <select
                    value={departmentFilter}
                    onChange={e => setDepartmentFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50"
                  >
                    <option value="Todos">Ciudad: Todas</option>
                    <option value="Tegucigalpa">Tegucigalpa</option>
                    <option value="San Pedro Sula">San Pedro Sula</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOnlyRemote(!onlyRemote)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition ${onlyRemote ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                      Solo Remoto
                    </button>
                    <button
                      onClick={() => setOnlyRemunerated(!onlyRemunerated)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition ${onlyRemunerated ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                      Remunerada
                    </button>
                  </div>
                </div>
              </div>

              {/* Vacancies Grid + Native Ad Injection every 4 items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVacancies.map((vacancy, idx) => (
                  <React.Fragment key={vacancy.id}>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-extrabold text-blue-700 text-sm">
                              {vacancy.company.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                {vacancy.company}
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                              </span>
                              <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                                {vacancy.title}
                              </h3>
                            </div>
                          </div>

                          {/* VISIBILIDAD CONDICIONAL: Solo muestra Favoritos si hay sesión activa */}
                          {currentUser && (
                            <button
                              onClick={() => toggleFavorite(vacancy.id)}
                              title="Guardar en favoritas"
                              className={`p-2 rounded-xl border transition ${favorites.includes(vacancy.id) ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-400 hover:text-slate-700'}`}
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </button>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {vacancy.department}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {vacancy.modality}
                          </span>
                          {vacancy.remunerated && (
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                              Remunerada
                            </span>
                          )}
                          {vacancy.featured && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                              <Star className="w-3 h-3 fill-current" /> Destacada
                            </span>
                          )}
                          {vacancy.urgent && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                              <Flame className="w-3 h-3" /> Urgente
                            </span>
                          )}
                        </div>

                        {/* Careers */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {vacancy.careers.map(c => (
                            <span key={c} className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer & Actions */}
                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Cierra: {vacancy.closingDate}
                          </span>

                          {/* VISIBILIDAD CONDICIONAL: Solo muestra "Marcar que apliqué" si hay sesión activa */}
                          {currentUser && (
                            <button
                              onClick={() => toggleApplied(vacancy.id)}
                              className={`font-semibold flex items-center gap-1 transition ${appliedIds.includes(vacancy.id) ? 'text-emerald-600' : 'text-slate-500 hover:text-blue-600'}`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {appliedIds.includes(vacancy.id) ? 'Ya apliqué' : 'Marcar que apliqué'}
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedVacancy(vacancy)}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
                          >
                            Ver más
                          </button>
                          <button
                            onClick={() => handleApplyClick(vacancy)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            Aplicar <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>

                        {/* VISIBILIDAD CONDICIONAL: Solo muestra "Reportar enlace roto" si hay sesión activa */}
                        {currentUser && (
                          <div className="mt-2.5 text-right">
                            <button
                              onClick={() => handleReportBroken(vacancy.title)}
                              className="text-[11px] text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 transition"
                            >
                              <AlertTriangle className="w-3 h-3" /> Reportar enlace roto
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inyección de Publicidad Nativa cada 4 tarjetas */}
                    {(idx + 1) % 4 === 0 && <NativeAdCard />}
                  </React.Fragment>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: STUDENT FAVORITES & APPLICATIONS */}
        {(view === 'favorites' || view === 'applications') && currentUser && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              {view === 'favorites' ? 'Mis Vacantes Favoritas' : 'Historial de Postulaciones'}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {view === 'favorites'
                ? 'Ofertas que has guardado para revisar más tarde.'
                : 'Vacantes en las que has hecho clic en aplicar o marcaste como enviadas.'}
            </p>
            <div className="space-y-4">
              {vacancies
                .filter(v => (view === 'favorites' ? favorites.includes(v.id) : appliedIds.includes(v.id)))
                .map(v => (
                  <div key={v.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-blue-600">{v.company}</span>
                      <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                      <p className="text-xs text-slate-500">{v.department} • {v.modality}</p>
                    </div>
                    <button
                      onClick={() => handleApplyClick(v)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition inline-flex items-center gap-1.5 w-fit"
                    >
                      Ir al enlace <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              {((view === 'favorites' && favorites.length === 0) || (view === 'applications' && appliedIds.length === 0)) && (
                <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                  Aún no tienes registros en esta sección. Explora las vacantes disponibles para comenzar.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: STUDENT PROFILE (SIN SUBIDA DE ARCHIVOS PDF) */}
        {view === 'profile' && currentUser && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Mi Perfil Universitario</h2>
              <p className="text-sm text-slate-500 mb-6">
                Optimizado para carga rápida: enlaza tu CV en Google Drive o LinkedIn sin subir archivos pesados.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerToast('Perfil actualizado correctamente');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Carrera</label>
                  <select
                    defaultValue={currentUser.career}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Informática Administrativa">Informática Administrativa</option>
                    <option value="Administración de Empresas">Administración de Empresas</option>
                    <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Enlace a Portafolio o CV Externo (Google Drive / LinkedIn)
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      defaultValue={currentUser.cvUrl}
                      placeholder="https://drive.google.com/file/d/..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Por política de eficiencia del portal, no se almacenan documentos PDF locales.
                  </p>
                </div>
                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700">
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 4: STUDENT PRO PLAN (INFORMATIVO) */}
        {view === 'pro' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Nexo Pro Estudiantes
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">Un paso adelante en tu carrera</h2>
              <p className="text-sm text-slate-500">
                Conoce los beneficios diseñados para destacar frente a los reclutadores en Honduras.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Plan Gratuito</h3>
                <p className="text-3xl font-extrabold text-slate-900 my-3">L 0 <span className="text-xs font-normal text-slate-500">/ siempre</span></p>
                <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                  <li>✓ Acceso completo al directorio de vacantes</li>
                  <li>✓ Filtros por carrera y modalidad</li>
                  <li>✓ Guardado de favoritas e historial</li>
                </ul>
                <button disabled className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-sm">
                  Tu plan actual
                </button>
              </div>
              <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-lg">
                <h3 className="text-lg font-bold text-amber-400">Plan Pro Estudiantil</h3>
                <p className="text-3xl font-extrabold my-3">Próximamente</p>
                <ul className="space-y-2.5 text-sm text-slate-300 mb-6">
                  <li>★ Acceso anticipado 24h a vacantes nuevas</li>
                  <li>★ Alertas instantáneas por WhatsApp / Correo</li>
                  <li>★ Navegación libre de anuncios</li>
                  <li>★ Plantillas de CV revisadas por expertos</li>
                </ul>
                <button
                  onClick={() => triggerToast('Te hemos añadido a la lista de espera de Nexo Pro')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                >
                  Unirme a la lista de espera
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: B2B DASHBOARD (EMPRESA & JEFE DE DEPARTAMENTO) */}
        {view === 'b2b' && currentUser && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {currentUser.role === 'jefe' ? 'Panel de Jefatura de Departamento' : 'Panel de Reclutamiento B2B'}
                </h2>
                <p className="text-sm text-slate-500">
                  {currentUser.role === 'jefe'
                    ? 'Publica convocatorias en nombre de empresas aliadas de la facultad.'
                    : 'Gestiona tus vacantes activas y mide los clics recibidos.'}
                </p>
              </div>
              <button
                onClick={() => setShowNewVacancyModal(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 w-fit shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                {currentUser.role === 'jefe' ? 'Publicar en nombre de empresa' : 'Publicar nueva vacante'}
              </button>
            </div>

            {/* Table of B2B Vacancies */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Vacante</th>
                      <th className="px-6 py-4">Empresa / Fuente</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Clics en Aplicar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vacancies.slice(0, 5).map(v => (
                      <tr key={v.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-bold text-slate-900">{v.title}</td>
                        <td className="px-6 py-4 text-slate-600">{v.company}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${v.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {v.status === 'approved' ? 'Activa' : 'Pendiente de revisión'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-extrabold text-blue-600">{v.clicks} clics</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {view === 'admin' && currentUser?.role === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Consola de Administración Nexo</h2>
              <p className="text-sm text-slate-500">Métricas generales, aprobación de cuentas y moderación de vacantes.</p>
            </div>

            {/* System Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Total Usuarios</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{users.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Estudiantes Activos (Clics)</p>
                <p className="text-3xl font-extrabold text-blue-600 mt-1">
                  {users.filter(u => u.activeApplicant).length}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Vacantes Activas</p>
                <p className="text-3xl font-extrabold text-emerald-600 mt-1">
                  {vacancies.filter(v => v.status === 'approved').length}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase">Pendientes de Revisión</p>
                <p className="text-3xl font-extrabold text-amber-600 mt-1">
                  {vacancies.filter(v => v.status === 'pending').length + users.filter(u => u.status === 'pending').length}
                </p>
              </div>
            </div>

            {/* Moderation: Vacancies & Tags */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900">Moderación de Vacantes y Etiquetas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Vacante / Empresa</th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="px-6 py-3">Etiquetas</th>
                      <th className="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vacancies.map(v => (
                      <tr key={v.id}>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{v.title}</p>
                          <p className="text-xs text-slate-500">{v.company}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            v.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                            v.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleAdminToggleFlag(v.id, 'featured')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${v.featured ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                          >
                            ★ Destacada
                          </button>
                          <button
                            onClick={() => handleAdminToggleFlag(v.id, 'urgent')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${v.urgent ? 'bg-rose-100 border-rose-300 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                          >
                            🔥 Urgente
                          </button>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleAdminVacancyStatus(v.id, 'approved')}
                            className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
                            title="Aprobar"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAdminVacancyStatus(v.id, 'rejected')}
                            className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100"
                            title="Rechazar"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Moderation: User Accounts */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900">Control de Cuentas y Última Visita</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Usuario</th>
                      <th className="px-6 py-3">Rol</th>
                      <th className="px-6 py-3">Última Visita</th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="px-6 py-3">Aprobación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(u => (
                      <tr key={u.id}>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </td>
                        <td className="px-6 py-4 capitalize font-medium">{u.role}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{u.lastVisit}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleAdminUserApproval(u.id, 'approved')}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => handleAdminUserApproval(u.id, 'rejected')}
                            className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-200"
                          >
                            Rechazar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: VACANCY DETAILS ("VER MÁS") */}
      {selectedVacancy && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedVacancy(null)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl absolute top-5 right-5"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{selectedVacancy.company}</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">{selectedVacancy.title}</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium">{selectedVacancy.department}</span>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium">{selectedVacancy.modality}</span>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium">{selectedVacancy.schedule}</span>
            </div>
            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Descripción del puesto</h4>
                <p>{selectedVacancy.description}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Requisitos</h4>
                <p>{selectedVacancy.requirements}</p>
              </div>
              <p className="text-xs text-slate-400">Fuente: {selectedVacancy.source} • Cierra: {selectedVacancy.closingDate}</p>
            </div>
            <button
              onClick={() => handleApplyClick(selectedVacancy)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md"
            >
              Aplicar en sitio externo <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL: NEW VACANCY (B2B / JEFE) */}
      {showNewVacancyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewVacancyModal(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl absolute top-5 right-5"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Publicar Nueva Práctica</h3>
            <form onSubmit={handleCreateVacancy} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Título del Puesto</label>
                <input required type="text" value={newVac.title} onChange={e => setNewVac({ ...newVac, title: e.target.value })} placeholder="Ej. Practicante de Desarrollo Web" className="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Empresa</label>
                <input required type="text" value={newVac.company} onChange={e => setNewVac({ ...newVac, company: e.target.value })} placeholder="Nombre de la empresa" className="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Ciudad</label>
                  <select value={newVac.department} onChange={e => setNewVac({ ...newVac, department: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                    <option value="Tegucigalpa">Tegucigalpa</option>
                    <option value="San Pedro Sula">San Pedro Sula</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Modalidad</label>
                  <select value={newVac.modality} onChange={e => setNewVac({ ...newVac, modality: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Enlace externo de aplicación</label>
                <input required type="url" value={newVac.externalUrl} onChange={e => setNewVac({ ...newVac, externalUrl: e.target.value })} placeholder="https://..." className="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Descripción y Requisitos</label>
                <textarea required rows="3" value={newVac.description} onChange={e => setNewVac({ ...newVac, description: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                Enviar a revisión
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
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