const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('nexo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const normalizeVacancy = (v) => ({
  ...v,
  closingDate: v.closing_date ? v.closing_date.split('T')[0] : v.closingDate,
  externalUrl: v.external_url || v.externalUrl,
});

export const api = {
  // AUTH
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');
    return data;
  },

  async register(payload) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error en el registro');
    return data;
  },

  // VACANCIES CRUD
  async getPublicVacancies() {
    const res = await fetch(`${API_URL}/vacancies`);
    if (!res.ok) throw new Error('Error al cargar vacantes');
    return (await res.json()).map(normalizeVacancy);
  },

  async getMyVacancies() {
    const res = await fetch(`${API_URL}/vacancies/mine`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al cargar tus vacantes');
    return (await res.json()).map(normalizeVacancy);
  },

  async getAllAdminVacancies() {
    const res = await fetch(`${API_URL}/vacancies/admin/all`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al cargar vacantes de administración');
    return (await res.json()).map(normalizeVacancy);
  },

  async createVacancy(vacancyData) {
    const payload = {
      ...vacancyData,
      closing_date: vacancyData.closingDate || vacancyData.closing_date,
      external_url: vacancyData.externalUrl || vacancyData.external_url,
    };
    const res = await fetch(`${API_URL}/vacancies`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message.join(', ') : data.message);
    return normalizeVacancy(data);
  },

  async updateVacancy(id, vacancyData) {
    const payload = {
      ...vacancyData,
      ...(vacancyData.closingDate ? { closing_date: vacancyData.closingDate } : {}),
      ...(vacancyData.externalUrl ? { external_url: vacancyData.externalUrl } : {}),
    };
    const res = await fetch(`${API_URL}/vacancies/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al actualizar vacante');
    return normalizeVacancy(data);
  },

  async deleteVacancy(id) {
    const res = await fetch(`${API_URL}/vacancies/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al eliminar vacante');
    return data;
  },

  async moderateVacancy(id, updates) {
    const res = await fetch(`${API_URL}/vacancies/${id}/moderate`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al moderar vacante');
    return normalizeVacancy(data);
  },

  // INTERACTIONS (Favoritos, Aplicaciones y Clics)
  async getInteractions() {
    const res = await fetch(`${API_URL}/vacancies/interactions`, { headers: getAuthHeaders() });
    if (!res.ok) return { favorites: [], appliedIds: [] };
    return res.json();
  },

  async registerApplyClick(id) {
    const res = await fetch(`${API_URL}/vacancies/${id}/click`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al registrar postulación');
    return data;
  },

  async toggleFavorite(id) {
    const res = await fetch(`${API_URL}/vacancies/${id}/favorite`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al guardar favorito');
    return res.json();
  },

  async toggleApplied(id) {
    const res = await fetch(`${API_URL}/vacancies/${id}/applied`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al actualizar estado de postulación');
    return res.json();
  },

  // USERS CRUD
  async getUsers() {
    const res = await fetch(`${API_URL}/users`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Error al cargar usuarios');
    return res.json();
  },

  async updateMyProfile(profileData) {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al actualizar perfil');
    return data;
  },

  async updateUserStatus(id, updates) {
    const res = await fetch(`${API_URL}/users/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al actualizar usuario');
    return data;
  },

  async deleteUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar usuario');
    return res.json();
  },
};
