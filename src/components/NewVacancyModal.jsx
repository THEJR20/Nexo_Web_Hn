import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle } from 'lucide-react';

export default function NewVacancyModal({ isOpen, onClose, onSave, editingVacancy = null }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    department: 'Tegucigalpa',
    modality: 'Híbrido',
    schedule: 'Tiempo Completo',
    careers: ['Informática Administrativa'],
    closingDate: '',
    externalUrl: '',
    requirements: '',
    description: '',
    remunerated: true,
  });

  useEffect(() => {
    if (editingVacancy) {
      setFormData({
        title: editingVacancy.title || '',
        company: editingVacancy.company?.replace(' (Vía Jefatura)', '') || '',
        department: editingVacancy.department || 'Tegucigalpa',
        modality: editingVacancy.modality || 'Híbrido',
        schedule: editingVacancy.schedule || 'Tiempo Completo',
        careers: editingVacancy.careers || ['Informática Administrativa'],
        closingDate: editingVacancy.closingDate || '',
        externalUrl: editingVacancy.externalUrl || '',
        requirements: editingVacancy.requirements || '',
        description: editingVacancy.description || '',
        remunerated: editingVacancy.remunerated ?? true,
      });
    } else {
      setFormData({
        title: '',
        company: '',
        department: 'Tegucigalpa',
        modality: 'Híbrido',
        schedule: 'Tiempo Completo',
        careers: ['Informática Administrativa'],
        closingDate: '',
        externalUrl: '',
        requirements: '',
        description: '',
        remunerated: true,
      });
    }
  }, [editingVacancy, isOpen]);

  if (!isOpen) return null;

  const handleCareerToggle = (career) => {
    setFormData((prev) => ({
      ...prev,
      careers: prev.careers.includes(career)
        ? prev.careers.filter((c) => c !== career)
        : [...prev.careers, career],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.careers.length === 0) return;
    onSave(formData, editingVacancy?.id);
  };

  const availableCareers = [
    'Informática Administrativa',
    'Ingeniería en Sistemas',
    'Administración de Empresas',
    'Contaduría Pública',
    'Mercadotecnia',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {editingVacancy ? <Save className="w-5 h-5 text-blue-400" /> : <PlusCircle className="w-5 h-5 text-blue-400" />}
            {editingVacancy ? 'Editar Vacante de Práctica' : 'Publicar Nueva Vacante'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título del Puesto *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej. Practicante de Desarrollo Web"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Empresa / Institución *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Ej. Banco Atlántida"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad / Departamento *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="Tegucigalpa">Tegucigalpa</option>
                <option value="San Pedro Sula">San Pedro Sula</option>
                <option value="La Ceiba">La Ceiba</option>
                <option value="Comayagua">Comayagua</option>
                <option value="Choluteca">Choluteca</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Modalidad *</label>
              <select
                value={formData.modality}
                onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Horario *</label>
              <select
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de Cierre *</label>
              <input
                type="date"
                required
                value={formData.closingDate}
                onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Enlace Oficial de Postulación (URL) *</label>
            <input
              type="url"
              required
              value={formData.externalUrl}
              onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
              placeholder="https://empresa.hn/carreras/practica"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Carreras Afines *</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {availableCareers.map((career) => {
                const selected = formData.careers.includes(career);
                return (
                  <button
                    type="button"
                    key={career}
                    onClick={() => handleCareerToggle(career)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {career}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Requisitos Principales *</label>
            <textarea
              rows={2}
              required
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Ej. Cursando último año, conocimientos en Excel/SQL..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descripción de Actividades *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe las funciones del practicante..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.remunerated}
              onChange={(e) => setFormData({ ...formData, remunerated: e.target.checked })}
              className="rounded text-blue-600"
            />
            Práctica profesional remunerada / con apoyo económico
          </label>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingVacancy ? 'Guardar Cambios' : 'Enviar a Revisión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
