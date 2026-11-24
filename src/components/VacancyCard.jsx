import React from 'react';
import {
  MapPin, Briefcase, Clock, Bookmark, CheckCircle2,
  AlertTriangle, ExternalLink, Star, Flame
} from 'lucide-react';

export default function VacancyCard({
  vacancy,
  currentUser,
  isFavorite,
  isApplied,
  onToggleFavorite,
  onToggleApplied,
  onSelectVacancy,
  onApplyClick,
  onReportBroken
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between">
      <div>
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

          {currentUser && (
            <button
              onClick={() => onToggleFavorite(vacancy.id)}
              title="Guardar en favoritas"
              className={`p-2 rounded-xl border transition ${isFavorite ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-400 hover:text-slate-700'}`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>

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

        <div className="flex flex-wrap gap-1.5 mb-4">
          {vacancy.careers.map(c => (
            <span key={c} className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Cierra: {vacancy.closingDate}
          </span>

          {currentUser && (
            <button
              onClick={() => onToggleApplied(vacancy.id)}
              className={`font-semibold flex items-center gap-1 transition ${isApplied ? 'text-emerald-600' : 'text-slate-500 hover:text-blue-600'}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isApplied ? 'Ya apliqué' : 'Marcar que apliqué'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectVacancy(vacancy)}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
          >
            Ver más
          </button>
          <button
            onClick={() => onApplyClick(vacancy)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            Aplicar <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {currentUser && (
          <div className="mt-2.5 text-right">
            <button
              onClick={() => onReportBroken(vacancy.title)}
              className="text-[11px] text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 transition"
            >
              <AlertTriangle className="w-3 h-3" /> Reportar enlace roto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}