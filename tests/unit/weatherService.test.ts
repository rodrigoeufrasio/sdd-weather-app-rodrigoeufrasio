import { beforeEach, describe, expect, it, vi } from 'vitest';
import { searchCities, WeatherServiceError } from '../../src/services/weatherService';

describe('weatherService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('does not call the network when the query is blank', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    await expect(searchCities('   ')).resolves.toEqual([]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns an empty list when geocoding returns no results', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ results: [] }),
      }),
    );

    await expect(searchCities('Cidade inexistente')).resolves.toEqual([]);
  });

  it('throws a user-friendly error when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'bad' }),
      }),
    );

    await expect(searchCities('Lisboa')).rejects.toThrow(WeatherServiceError);
  });
});
