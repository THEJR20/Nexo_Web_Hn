import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NewVacancyModal({ isOpen, onClose, onCreate }) {
  const [newVac, setNewVac] = useState({
    title: '',
    company: '',
    department: 'Tegucigalpa',
    modality: 'Híbrido',
    schedule: 'Tiempo Completo',
    careers: 'Informática Administrativa',
    closingDate: '2026-12-30',
    externalUrl: '',
    requirements: 'Estudiante de último año.',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newVac);
    setNewVac({
      title: '', company: '', department: 'Tegucigalpa', modality: 'Híbrido',
      schedule: 'Tiempo Completo', careers: 'Informática Administrativa',
      closingDate: '2026-12-30', externalUrl: '', requirements: 'Estudiante de último año.', description: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-700 rounded-xl absolute top-5 right-5"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-extrabold text-slate-900 mb-4">Publicar Nueva Práctica</h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
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
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Carrera Principal</label>
            <select value={newVac.careers} onChange={e => setNewVac({ ...newVac, careers: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
              <option value="Informática Administrativa">Informática Administrativa</option>
              <option value="Administración de Empresas">Administración de Empresas</option>
              <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
            </select>
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
  );
}