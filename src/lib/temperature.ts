export type TemperatureUnit = 'celsius' | 'fahrenheit';

export function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function convertTemperature(value: number, unit: TemperatureUnit): number {
  return unit === 'celsius' ? value : toFahrenheit(value);
}

export function unitLabel(unit: TemperatureUnit): string {
  return unit === 'celsius' ? '°C' : '°F';
}

export function formatTemperature(value: number, unit: TemperatureUnit): string {
  const normalized = Math.round(value);

  return `${normalized}${unitLabel(unit)}`;
}
