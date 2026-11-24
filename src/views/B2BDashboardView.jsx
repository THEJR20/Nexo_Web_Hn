import React from 'react';
import { PlusCircle } from 'lucide-react';

export default function B2BDashboardView({ currentUser, vacancies, onOpenNewModal }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {currentUser.role === 'jefe' ? 'Panel de Jefatura de Departamento' : 'Panel de Reclutamiento B2B'}
          </h2>
          <p className="text-sm text-slate-500">
            {currentUser.role === 'jefe'
              ? 'Publica convocatorias en nombre de empresas aliadas de la facultad.'
              : 'Gestiona tus vacantes activas y mide los clics recibidos (Plan gratuito: 1 vacante activa).'}
          </p>
        </div>
        <button
          onClick={onOpenNewModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 w-fit shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          {currentUser.role === 'jefe' ? 'Publicar en nombre de empresa' : 'Publicar nueva vacante'}
        </button>
      </div>

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
              {vacancies.map(v => (
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
  );
}