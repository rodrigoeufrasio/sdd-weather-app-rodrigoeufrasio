import { formatTemperature, toFahrenheit } from '../lib/temperature';
import { getWeatherCodeInfo } from '../lib/weatherCodes';
import type { City, CurrentWeather as CurrentWeatherType, Unit } from '../types/weather';

interface CurrentWeatherProps {
  city: City;
  current: CurrentWeatherType;
  unit: Unit;
}

export default function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const temperature = unit === 'celsius' ? current.temperature : toFahrenheit(current.temperature);
  const weatherInfo = getWeatherCodeInfo(current.weatherCode);

  const metrics = [
    { label: 'Umidade', value: `${current.humidity}%` },
    { label: 'Vento', value: `${current.windSpeed} km/h` },
    { label: 'Pressão', value: `${current.pressure} hPa` },
    { label: 'Precip.', value: `${current.precipitation} mm` },
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Agora</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{city.name}</h2>
          <p className="text-sm text-slate-300">
            {city.admin1 ? `${city.admin1}, ` : ''}
            {city.country}
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-white">
            {formatTemperature(temperature, unit)}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-4xl">{weatherInfo.icon}</span>
        <p className="text-lg text-slate-200">{weatherInfo.label}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-night-700/70 p-3"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</div>
            <div className="mt-2 text-lg font-semibold text-white">{metric.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
