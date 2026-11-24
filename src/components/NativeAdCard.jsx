import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

export default function NativeAdCard({ onTriggerToast }) {
  return (
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
        onClick={() => onTriggerToast('Abriendo enlace del patrocinador...')}
        className="w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-blue-50 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
      >
        Ver beneficio estudiantil <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}