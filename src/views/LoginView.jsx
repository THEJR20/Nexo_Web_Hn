import React, { useState } from 'react';
import { GraduationCap, X, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginView({
  authMode,
  setAuthMode,
  initialRole = 'estudiante',
  loginAlert,
  onClose,
  onQuickLogin,
  onAuthSubmit
}) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState(initialRole);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSubmit({
      mode: authMode,
      email: emailInput,
      password: passwordInput,
      name: nameInput,
      role: roleInput
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2.5 text-left">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-none">nexo</span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Portal Universitario</span>
            </div>
          </button>
          <button onClick={onClose} className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1">
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm"
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/20 transition text-sm"
            >
              {authMode === 'login' ? 'Entrar al Portal' : 'Completar Registro'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
              Acceso directo de prueba (1 Clic)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onQuickLogin('estudiante')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                🎓 Estudiante
              </button>
              <button onClick={() => onQuickLogin('empresa')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                🏢 Empresa (Ficohsa)
              </button>
              <button onClick={() => onQuickLogin('jefe')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                👨‍🏫 Jefe de Depto.
              </button>
              <button onClick={() => onQuickLogin('admin')} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg transition">
                👑 Administrador
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center">
          © 2026 Nexo Honduras. Conectando talento universitario sin fricciones.
        </p>
      </div>

      {/* Columna Derecha: Banner Publicitario */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white p-8 sm:p-16 flex flex-col justify-between">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold w-fit">
          <span>ESPACIO PUBLICITARIO DESTACADO</span>
        </div>

        <div className="my-12 max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Impulsa tu carrera profesional desde la universidad.
          </h2>
          <p className="text-blue-100 text-base leading-relaxed mb-8">
            Conecta directamente con las empresas líderes de Honduras. Sin intermediarios ni formularios interminables: encuentra tu plaza y postula en segundos.
          </p>

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