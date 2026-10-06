export const starterProducts = [
  { id: 'p1', name: 'PlayStation 5 Slim', category: 'Console', platform: 'PS5', media: 'Física', price: 3499, stock: 8, discount: 0, active: true },
  { id: 'p2', name: 'EA Sports FC 26', category: 'Jogo', platform: 'PS5', media: 'Física', price: 299, stock: 18, discount: 10, active: true },
  { id: 'p3', name: 'Minecraft', category: 'Jogo', platform: 'PC', media: 'Digital', price: 129, stock: 0, discount: 0, active: true },
  { id: 'p4', name: 'Controle sem fio', category: 'Acessório', platform: 'PS5', media: 'Física', price: 399, stock: 12, discount: 0, active: true },
];
export const starterBundles = [{ id: 'b1', name: 'PS5 + FC 26', items: [{ productId: 'p1', quantity: 1 }, { productId: 'p2', quantity: 1 }], discount: 5, active: true }];
export const starterPromotions = [];
export const starterEvents = [];
export const money = amount => Number(amount || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const percent = value => Math.min(100, Math.max(0, Number(value) || 0));
export const productPrice = product => Number(product.price) * (1 - percent(product.discount) / 100);
export function bundlePrice(bundle, products) {
  const subtotal = bundle.items.reduce((sum, item) => sum + productPrice(products.find(p => p.id === item.productId) || { price: 0 }) * item.quantity, 0);
  return subtotal * (1 - percent(bundle.discount) / 100);
}
export function stockNeeds(lines, bundles, products) {
  const needs = new Map();
  for (const line of lines) {
    const parts = line.kind === 'bundle' ? (bundles.find(b => b.id === line.id)?.items || []) : [{ productId: line.id, quantity: 1 }];
    for (const part of parts) {
      const product = products.find(p => p.id === part.productId);
      if (product?.media !== 'Digital') needs.set(part.productId, (needs.get(part.productId) || 0) + part.quantity * line.quantity);
    }
  }
  return needs;
}
export function calculateSale({ lines, products, bundles, promotions, eventId, firstPurchase }) {
  const now = new Date().toISOString().slice(0, 10);
  let promotionValue = 0;
  const subtotal = lines.reduce((sum, line) => {
    const item = line.kind === 'bundle' ? bundles.find(b => b.id === line.id) : products.find(p => p.id === line.id);
    const lineTotal = item ? (line.kind === 'bundle' ? bundlePrice(item, products) : productPrice(item)) * line.quantity : 0;
    const applicable = promotions.filter(p => p.active && p.targetKind === line.kind && p.targetId === line.id && (!p.startsAt || p.startsAt <= now) && (!p.endsAt || p.endsAt >= now) && (!p.eventId || p.eventId === eventId));
    promotionValue += lineTotal * percent(applicable.reduce((sum, p) => sum + percent(p.discount), 0)) / 100;
    return sum + lineTotal;
  }, 0);
  const afterPromotion = subtotal - promotionValue;
  const firstDiscount = firstPurchase ? afterPromotion * 0.1 : 0;
  return { subtotal, promotionValue, firstDiscount, total: Math.max(0, afterPromotion - firstDiscount) };
}
