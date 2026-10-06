export const demoUsers = [
  { id: 'gerente', name: 'Beatriz Martins', role: 'Gerente', email: 'gerente@zetasoft.demo', password: 'demo123' },
  { id: 'supervisor', name: 'Fernanda Lima', role: 'Supervisor', email: 'supervisor@zetasoft.demo', password: 'demo123' },
  { id: 'atendente', name: 'João Santos', role: 'Atendente', email: 'atendente@zetasoft.demo', password: 'demo123' },
];
export const rolePages = {
  Gerente: ['dashboard', 'clients', 'survey', 'catalog', 'sales', 'promotions', 'events', 'reports', 'team', 'history', 'settings'],
  Supervisor: ['dashboard', 'clients', 'survey', 'catalog', 'sales', 'promotions', 'events', 'reports', 'team'],
  Atendente: ['dashboard', 'clients', 'survey', 'catalog', 'sales', 'events'],
};
export const canVisit = (role, page) => !!rolePages[role]?.includes(page);
export function authenticateDemo(email, password) {
  return demoUsers.find(user => user.email === email.trim().toLowerCase() && user.password === password) || null;
}
