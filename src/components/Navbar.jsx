import React from 'react';
import { GraduationCap, Sparkles, LogOut } from 'lucide-react';

export default function Navbar({
  currentUser,
  view,
  setView,
  favoritesCount,
  appliedCount,
  onOpenAuth,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
                  <span className="bg-slate-200 text-slate-700 text-xs px-1.5 py-0.2 rounded-full">{favoritesCount}</span>
                </button>
                <button
                  onClick={() => setView('applications')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${view === 'applications' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Mis postulaciones ({appliedCount})
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

        <div className="flex items-center gap-3">
          {!currentUser ? (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => onOpenAuth('register')}
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
                onClick={onLogout}
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
  );
}