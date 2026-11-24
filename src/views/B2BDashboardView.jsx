import React from 'react';
import { Plus, Building2, MousePointerClick, Clock, CheckCircle2, XCircle, Pencil, Trash2 } from 'lucide-react';

export default function B2BDashboardView({ currentUser, vacancies, onOpenNewModal, onEditVacancy, onDeleteVacancy }) {
  const myVacancies = vacancies.filter((v) => v.created_by === currentUser.id);
  const totalClicks = myVacancies.reduce((acc, v) => acc + (v.clicks || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {currentUser.role === 'jefe' ? 'Panel Jefatura de Departamento' : 'Panel Empresarial'}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            {currentUser.company_name || currentUser.department_name || currentUser.name}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Plan actual: <strong className="uppercase text-slate-800">{currentUser.plan_type || 'free'}</strong>
          </p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Publicar Vacante
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" /> Mis Vacantes Publicadas
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{myVacancies.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <MousePointerClick className="w-4 h-4 text-emerald-600" /> Clics hacia Postulación
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{totalClicks}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Activas en Directorio
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {myVacancies.filter((v) => v.status === 'approved').length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 font-bold text-slate-900">
          Gestión de Mis Vacantes
        </div>

        {myVacancies.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Aún no has creado vacantes. Haz clic en <strong>Publicar Vacante</strong> para comenzar.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {myVacancies.map((v) => (
              <div key={v.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{v.title}</h3>
                    {v.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" /> Aprobada
                      </span>
                    )}
                    {v.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        <Clock className="w-3 h-3" /> En Revisión
                      </span>
                    )}
                    {v.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                        <XCircle className="w-3 h-3" /> Rechazada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {v.department} • {v.modality} • Cierra: {v.closingDate} • <strong>{v.clicks} clics</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditVacancy(v)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button
                    onClick={() => onDeleteVacancy(v.id, v.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
