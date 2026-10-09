export const products = [
  { id: 'sand', name: 'Sand Beige', price: 34 },
  { id: 'forest', name: 'Forest', price: 34 },
  { id: 'midnight', name: 'Midnight', price: 34 },
] as const;
export const discountPercent = 10;
export function cartTotal(cart: Record<string, number>) {
  return products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);
}