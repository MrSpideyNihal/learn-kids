import { ANIMALS } from './animals';
import { describe, expect, it } from 'vitest';

describe('Animal Asset Registry', () => {
  it('should have at least 8 animals', () => {
    expect(ANIMALS.length).toBeGreaterThanOrEqual(8);
  });

  it('should have valid and consistent registry items', () => {
    ANIMALS.forEach((animal) => {
      expect(animal.id).toBeTruthy();
      expect(animal.displayName).toBeTruthy();
      expect(animal.imageUrl).toContain('.svg');
      expect(animal.audioUrl).toBeTruthy();
      expect(animal.category).toBeTruthy();

      const { matchObjects } = animal;
      expect(matchObjects.food).toContain('.svg');
      expect(matchObjects.foodName).toBeTruthy();
      expect(matchObjects.habitat).toContain('.svg');
      expect(matchObjects.habitatName).toBeTruthy();
      expect(matchObjects.object).toContain('.svg');
      expect(matchObjects.objectName).toBeTruthy();
    });
  });
});
