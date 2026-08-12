import { describe, expect, it } from 'vitest';
import { getWeatherCodeInfo } from '../../src/lib/weatherCodes';

describe('weatherCodes helpers', () => {
  it('returns the expected label and icon for a known code', () => {
    expect(getWeatherCodeInfo(0)).toEqual({ label: 'Céu limpo', icon: '☀️' });
    expect(getWeatherCodeInfo(3)).toEqual({ label: 'Encoberto', icon: '☁️' });
  });

  it('returns a fallback for unknown codes', () => {
    expect(getWeatherCodeInfo(999)).toEqual({ label: 'Condição variável', icon: '🌤️' });
  });
});
