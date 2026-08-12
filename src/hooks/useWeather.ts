import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getWeather, searchCities, WeatherServiceError } from '../services/weatherService';
import type { City, WeatherData } from '../types/weather';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export function useWeather() {
  const [status, setStatus] = useState<WeatherStatus>('idle');
  const [data, setData] = useState<WeatherData | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const lastActionRef = useRef<{ type: 'search' | 'select'; value: string | City } | null>(null);

  const search = useCallback(async (cityName: string) => {
    const trimmed = cityName.trim();
    setQuery(trimmed);
    setError(null);

    if (!trimmed) {
      setCities([]);
      setStatus('empty');
      lastActionRef.current = { type: 'search', value: trimmed };
      return;
    }

    setStatus('loading');
    lastActionRef.current = { type: 'search', value: trimmed };

    try {
      const results = await searchCities(trimmed);
      setCities(results);

      if (results.length === 0) {
        setSelectedCity(null);
        setStatus('empty');
        return;
      }

      const firstCity = results[0];
      setSelectedCity(firstCity);
      const weather = await getWeather(firstCity);
      setData(weather);
      setStatus('success');
    } catch (caughtError) {
      const message =
        caughtError instanceof WeatherServiceError
          ? caughtError.message
          : 'Não foi possível carregar o clima.';
      setError(message);
      setStatus('error');
    }
  }, []);

  const selectCity = useCallback(async (city: City) => {
    setSelectedCity(city);
    setError(null);
    setStatus('loading');
    lastActionRef.current = { type: 'select', value: city };

    try {
      const weather = await getWeather(city);
      setData(weather);
      setStatus('success');
    } catch (caughtError) {
      const message =
        caughtError instanceof WeatherServiceError
          ? caughtError.message
          : 'Não foi possível carregar o clima.';
      setError(message);
      setStatus('error');
    }
  }, []);

  const retry = useCallback(() => {
    if (!lastActionRef.current) {
      setStatus('idle');
      return;
    }

    if (lastActionRef.current.type === 'search') {
      void search(String(lastActionRef.current.value));
      return;
    }

    void selectCity(lastActionRef.current.value as City);
  }, [search, selectCity]);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    const cityInCities = cities.some((city) => city.id === selectedCity.id);
    if (!cityInCities) {
      setCities((current) => [...current, selectedCity]);
    }
  }, [cities, selectedCity]);

  return useMemo(
    () => ({
      status,
      data,
      cities,
      error,
      query,
      selectedCity,
      search,
      selectCity,
      retry,
    }),
    [status, data, cities, error, query, selectedCity, search, selectCity, retry],
  );
}
