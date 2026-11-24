import React from 'react';
import { Check, Ban } from 'lucide-react';

export default function AdminDashboardView({
  users,
  vacancies,
  onToggleFlag,
  onVacancyStatus,
  onUserApproval
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Consola de Administración Nexo</h2>
        <p className="text-sm text-slate-500">Métricas generales, aprobación de cuentas y moderación de vacantes.</p>
      </div>

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

      {/* Moderación de Vacantes */}
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
                      onClick={() => onToggleFlag(v.id, 'featured')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${v.featured ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      ★ Destacada
                    </button>
                    <button
                      onClick={() => onToggleFlag(v.id, 'urgent')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${v.urgent ? 'bg-rose-100 border-rose-300 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      🔥 Urgente
                    </button>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => onVacancyStatus(v.id, 'approved')} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100" title="Aprobar">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => onVacancyStatus(v.id, 'rejected')} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100" title="Rechazar">
                      <Ban className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Control de Cuentas */}
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
                    <button onClick={() => onUserApproval(u.id, 'approved')} className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700">
                      Aprobar
                    </button>
                    <button onClick={() => onUserApproval(u.id, 'rejected')} className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-200">
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
  );
}