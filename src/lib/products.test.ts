import { describe, it, expect } from 'vitest';
import { products, cartTotal, discountPercent } from './products';
describe('SIPPIN offers', () => {
  it('prices all three bottles at $34', () => {
    expect(products.map(p => p.price)).toEqual([34, 34, 34]);
    expect(cartTotal({ sand: 2, forest: 1 })).toBe(102);
  });
  it('offers 10 percent off', () => expect(discountPercent).toBe(10));
});