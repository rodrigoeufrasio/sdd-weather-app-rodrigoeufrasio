import type { ForecastDay, Unit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: Unit;
}

export default function ForecastList({ forecast, unit }: ForecastListProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glass backdrop-blur-md sm:p-5">
      <div className="mb-4 text-lg font-semibold text-white">Previsão para 5 dias</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.map((day, index) => (
          <ForecastCard key={day.date} day={day} unit={unit} index={index} />
        ))}
      </div>
    </section>
  );
}
