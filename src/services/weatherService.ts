import type { City, CurrentWeather, ForecastDay, WeatherData } from '../types/weather';

export class WeatherServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

const BASE_TIMEOUT_MS = 10_000;

async function fetchWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), BASE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new WeatherServiceError('Não foi possível obter os dados do clima.');
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new WeatherServiceError('A requisição demorou demais.');
    }

    if (error instanceof TypeError) {
      throw new WeatherServiceError('Falha de rede. Verifique sua conexão e tente novamente.');
    }

    if (error instanceof WeatherServiceError) {
      throw error;
    }

    throw new WeatherServiceError('Não foi possível carregar os dados do clima.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function searchCities(name: string): Promise<City[]> {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return [];
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmedName)}&count=5&language=pt&format=json`;

  const payload = await fetchWithTimeout<{ results?: Array<Record<string, unknown>> }>(url);
  const results = payload.results ?? [];

  return results.map((result, index) => ({
    id: Number(result.id ?? index),
    name: String(result.name ?? 'Cidade'),
    country: String(result.country ?? 'Desconhecido'),
    admin1: typeof result.admin1 === 'string' ? result.admin1 : undefined,
    latitude: Number(result.latitude ?? 0),
    longitude: Number(result.longitude ?? 0),
  }));
}

export async function getWeather(city: City): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(city.latitude));
  url.searchParams.set('longitude', String(city.longitude));
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,precipitation,weather_code',
  );
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
  );
  url.searchParams.set('forecast_days', '5');
  url.searchParams.set('timezone', 'auto');

  const payload = await fetchWithTimeout<{
    current?: {
      time?: string;
      temperature_2m?: number;
      relative_humidity_2m?: number;
      wind_speed_10m?: number;
      surface_pressure?: number;
      precipitation?: number;
      weather_code?: number;
    };
    daily?: {
      time?: string[];
      weather_code?: number[];
      temperature_2m_max?: number[];
      temperature_2m_min?: number[];
      precipitation_probability_max?: Array<number | null>;
    };
  }>(url.toString());

  const current = payload.current;
  const daily = payload.daily;

  if (
    !current ||
    !daily ||
    !daily.time ||
    !daily.weather_code ||
    !daily.temperature_2m_max ||
    !daily.temperature_2m_min
  ) {
    throw new WeatherServiceError('Resposta incompleta da previsão do tempo.');
  }

  const currentWeather: CurrentWeather = {
    time: current.time ?? new Date().toISOString(),
    temperature: current.temperature_2m ?? 0,
    humidity: current.relative_humidity_2m ?? 0,
    windSpeed: current.wind_speed_10m ?? 0,
    pressure: current.surface_pressure ?? 0,
    precipitation: current.precipitation ?? 0,
    weatherCode: current.weather_code ?? 0,
  };

  const forecast: ForecastDay[] = daily.time.map((date, index) => ({
    date,
    max: daily.temperature_2m_max?.[index] ?? 0,
    min: daily.temperature_2m_min?.[index] ?? 0,
    weatherCode: daily.weather_code?.[index] ?? 0,
    precipitationProbability: daily.precipitation_probability_max?.[index] ?? 0,
  }));

  return {
    city,
    current: currentWeather,
    forecast,
  };
}
