import React, { useState, useMemo } from 'react';
import { Search, Briefcase, Building2 } from 'lucide-react';
import VacancyCard from '../components/VacancyCard';
import NativeAdCard from '../components/NativeAdCard';

export default function ExploreView({
  vacancies,
  currentUser,
  favorites,
  appliedIds,
  onToggleFavorite,
  onToggleApplied,
  onSelectVacancy,
  onApplyClick,
  onReportBroken,
  onOpenCompanyRegister,
  onTriggerToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [careerFilter, setCareerFilter] = useState('Todas');
  const [modalityFilter, setModalityFilter] = useState('Todas');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [onlyRemunerated, setOnlyRemunerated] = useState(false);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter(v => {
      if (v.status !== 'approved') return false;
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCareer = careerFilter === 'Todas' || v.careers.includes(careerFilter);
      const matchesModality = modalityFilter === 'Todas' || v.modality === modalityFilter;
      const matchesDept = departmentFilter === 'Todos' || v.department === departmentFilter;
      const matchesRemote = !onlyRemote || v.modality === 'Remoto';
      const matchesRemun = !onlyRemunerated || v.remunerated;
      return matchesSearch && matchesCareer && matchesModality && matchesDept && matchesRemote && matchesRemun;
    });
  }, [vacancies, searchQuery, careerFilter, modalityFilter, departmentFilter, onlyRemote, onlyRemunerated]);

  return (
    <div>
      {/* Editorial Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50/60 to-slate-100 rounded-3xl p-8 sm:p-12 border border-blue-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full mb-4">
                • Tu próximo paso empieza aquí
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
                Tu talento.<br />
                <span className="text-blue-600">Su próxima gran oportunidad.</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                Conecta con las empresas líderes de Honduras, gana experiencia real y realiza tu práctica profesional sin fricciones ni formularios interminables.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#buscador-vacantes"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-600/20 transition text-sm"
                >
                  Explorar vacantes ahora
                </a>
                {!currentUser && (
                  <button
                    onClick={onOpenCompanyRegister}
                    className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold rounded-xl transition text-sm"
                  >
                    Publicar vacante (Empresas)
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <Briefcase className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-2xl font-extrabold text-slate-900">{vacancies.filter(v => v.status === 'approved').length}</p>
                <p className="text-xs text-slate-500 font-medium">Plazas activas hoy</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                <p className="text-2xl font-extrabold text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Enlace directo</p>
              </div>
              <div className="col-span-2 bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">Cero burocracia</p>
                <p className="text-sm font-medium text-slate-200">
                  Sin subir archivos pesados. Postula directo en el portal oficial de cada empresa.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Empresas referentes en Honduras
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-slate-400 font-extrabold text-sm sm:text-base tracking-tight">
              <span>TIGO</span>
              <span>BANCO FICOHSA</span>
              <span>CERVECERÍA HONDUREÑA</span>
              <span>DIUNSA</span>
              <span>CORPORACIÓN DINANT</span>
              <span>GRUPO TERRA</span>
              <span>CM AIRLINES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Directory Section */}
      <section id="buscador-vacantes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Encuentra tu próxima práctica</h2>
            <p className="text-sm text-slate-500">Explora libremente las convocatorias abiertas en todo el país.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {filteredVacancies.length} vacantes disponibles
          </span>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Busca por puesto, empresa o palabra clave..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 outline-none text-sm"
              />
            </div>
            <select
              value={careerFilter}
              onChange={e => setCareerFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium bg-white text-slate-700 outline-none"
            >
              <option value="Todas">Todas las carreras</option>
              <option value="Informática Administrativa">Informática Administrativa</option>
              <option value="Administración de Empresas">Administración de Empresas</option>
              <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={modalityFilter}
              onChange={e => setModalityFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50"
            >
              <option value="Todas">Modalidad: Todas</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
            </select>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50"
            >
              <option value="Todos">Ciudad: Todas</option>
              <option value="Tegucigalpa">Tegucigalpa</option>
              <option value="San Pedro Sula">San Pedro Sula</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnlyRemote(!onlyRemote)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition ${onlyRemote ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                Solo Remoto
              </button>
              <button
                onClick={() => setOnlyRemunerated(!onlyRemunerated)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition ${onlyRemunerated ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                Remunerada
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVacancies.map((vacancy, idx) => (
            <React.Fragment key={vacancy.id}>
              <VacancyCard
                vacancy={vacancy}
                currentUser={currentUser}
                isFavorite={favorites.includes(vacancy.id)}
                isApplied={appliedIds.includes(vacancy.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleApplied={onToggleApplied}
                onSelectVacancy={onSelectVacancy}
                onApplyClick={onApplyClick}
                onReportBroken={onReportBroken}
              />
              {(idx + 1) % 4 === 0 && <NativeAdCard onTriggerToast={onTriggerToast} />}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}