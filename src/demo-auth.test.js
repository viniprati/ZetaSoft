import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authenticateDemo, canVisit } from './demo-auth.js';
test('cada login de demo identifica seu perfil', () => {
  assert.equal(authenticateDemo('gerente@zetasoft.demo', 'demo123')?.role, 'Gerente');
  assert.equal(authenticateDemo('supervisor@zetasoft.demo', 'demo123')?.role, 'Supervisor');
  assert.equal(authenticateDemo('atendente@zetasoft.demo', 'demo123')?.role, 'Atendente');
  assert.equal(authenticateDemo('gerente@zetasoft.demo', 'errada'), null);
});
test('áreas variam por perfil', () => {
  assert.equal(canVisit('Gerente', 'settings'), true);
  assert.equal(canVisit('Supervisor', 'reports'), true);
  assert.equal(canVisit('Supervisor', 'settings'), false);
  assert.equal(canVisit('Atendente', 'sales'), true);
  assert.equal(canVisit('Atendente', 'reports'), false);
});
