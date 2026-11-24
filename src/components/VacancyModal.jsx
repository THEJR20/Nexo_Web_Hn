import React from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function VacancyModal({ vacancy, onClose, onApply }) {
  if (!vacancy) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-700 rounded-xl absolute top-5 right-5"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{vacancy.company}</span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">{vacancy.title}</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium">{vacancy.department}</span>
          <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium">{vacancy.modality}</span>
          <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg font-medium">{vacancy.schedule}</span>
        </div>
        <div className="space-y-4 text-sm text-slate-600 mb-6">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Descripción del puesto</h4>
            <p>{vacancy.description}</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Requisitos</h4>
            <p>{vacancy.requirements}</p>
          </div>
          <p className="text-xs text-slate-400">Fuente: {vacancy.source} • Cierra: {vacancy.closingDate}</p>
        </div>
        <button
          onClick={() => onApply(vacancy)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md"
        >
          Aplicar en sitio externo <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}