import { describe, expect, it } from 'vitest';
import { formatTemperature, toCelsius, toFahrenheit } from '../../src/lib/temperature';

describe('temperature conversion helpers', () => {
  it('converts Celsius to Fahrenheit', () => {
    expect(toFahrenheit(0)).toBe(32);
    expect(toFahrenheit(100)).toBe(212);
  });

  it('converts Fahrenheit to Celsius', () => {
    expect(toCelsius(32)).toBe(0);
    expect(toCelsius(212)).toBe(100);
  });

  it('formats values for display in the selected unit', () => {
    expect(formatTemperature(20, 'celsius')).toBe('20°C');
    expect(formatTemperature(68, 'fahrenheit')).toBe('68°F');
  });
});
