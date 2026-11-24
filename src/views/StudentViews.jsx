import React from 'react';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

export function StudentListView({ title, subtitle, items, onApply }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{title}</h2>
      <p className="text-sm text-slate-500 mb-6">{subtitle}</p>
      <div className="space-y-4">
        {items.map(v => (
          <div key={v.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600">{v.company}</span>
              <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
              <p className="text-xs text-slate-500">{v.department} • {v.modality}</p>
            </div>
            <button
              onClick={() => onApply(v)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition inline-flex items-center gap-1.5 w-fit"
            >
              Ir al enlace <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            Aún no tienes registros en esta sección. Explora las vacantes disponibles para comenzar.
          </div>
        )}
      </div>
    </div>
  );
}

export function StudentProfileView({ currentUser, onTriggerToast }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Mi Perfil Universitario</h2>
        <p className="text-sm text-slate-500 mb-6">
          Optimizado para carga rápida: enlaza tu CV en Google Drive o LinkedIn sin subir archivos pesados.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onTriggerToast('Perfil actualizado correctamente');
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo</label>
            <input type="text" defaultValue={currentUser.name} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Carrera</label>
            <select defaultValue={currentUser.career} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
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
  );
}

export function StudentProView({ onTriggerToast }) {
  return (
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
            onClick={() => onTriggerToast('Te hemos añadido a la lista de espera de Nexo Pro')}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
          >
            Unirme a la lista de espera
          </button>
        </div>
      </div>
    </div>
  );
}