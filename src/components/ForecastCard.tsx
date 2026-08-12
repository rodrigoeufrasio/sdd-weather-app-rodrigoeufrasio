import { formatDayLabel } from '../lib/format';
import { formatTemperature } from '../lib/temperature';
import { getWeatherCodeInfo } from '../lib/weatherCodes';
import type { ForecastDay, Unit } from '../types/weather';

interface ForecastCardProps {
  day: ForecastDay;
  unit: Unit;
  index: number;
}

export default function ForecastCard({ day, unit, index }: ForecastCardProps) {
  const weatherInfo = getWeatherCodeInfo(day.weatherCode);
  const precipitationProbability = Number.isFinite(day.precipitationProbability)
    ? day.precipitationProbability
    : 0;
  const min = unit === 'celsius' ? day.min : (day.min * 9) / 5 + 32;
  const max = unit === 'celsius' ? day.max : (day.max * 9) / 5 + 32;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-glass backdrop-blur-md">
      <div className="text-sm font-medium text-slate-200">{formatDayLabel(day.date, index)}</div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-3xl" aria-hidden="true">
          {weatherInfo.icon}
        </span>
        <span className="text-xs text-slate-300">{weatherInfo.label}</span>
      </div>
      <div className="mt-4 text-lg font-semibold text-white">{formatTemperature(max, unit)}</div>
      <div className="text-sm text-slate-300">{formatTemperature(min, unit)}</div>
      <div className="mt-3 text-xs text-sky-200">{precipitationProbability}% chuva</div>
    </article>
  );
}
