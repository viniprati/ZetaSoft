import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateSale, stockNeeds } from './commerce-model.js';
const products = [{ id: 'a', price: 100, discount: 0, stock: 3, media: 'Física' }, { id: 'b', price: 50, discount: 0, stock: 0, media: 'Digital' }];
const bundles = [{ id: 'kit', discount: 10, items: [{ productId: 'a', quantity: 1 }, { productId: 'b', quantity: 1 }] }];
test('desconto específico não reduz outros produtos e primeira compra aplica após promoção', () => {
  const result = calculateSale({ lines: [{ kind: 'product', id: 'a', quantity: 1 }, { kind: 'product', id: 'b', quantity: 1 }], products, bundles, promotions: [{ active: true, targetKind: 'product', targetId: 'a', discount: 20 }], firstPurchase: true });
  assert.equal(result.subtotal, 150);
  assert.equal(result.promotionValue, 20);
  assert.equal(result.firstDiscount, 13);
  assert.equal(result.total, 117);
});
test('bundle desconta componentes físicos do estoque', () => {
  const needs = stockNeeds([{ kind: 'bundle', id: 'kit', quantity: 2 }], bundles, products);
  assert.equal(needs.get('a'), 2);
  assert.equal(needs.has('b'), false);
});
