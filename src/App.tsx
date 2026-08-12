import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { useWeather } from './hooks/useWeather';
import type { Unit } from './types/weather';

export default function App() {
  const { status, data, error, cities, search, selectCity, retry } = useWeather();
  const [searchText, setSearchText] = useState('');
  const [unit, setUnit] = useState<Unit>('celsius');

  const renderContent = () => {
    if (status === 'loading') {
      return <LoadingState />;
    }

    if (status === 'error') {
      return <ErrorState message={error ?? undefined} onRetry={retry} />;
    }

    if (status === 'empty') {
      return <EmptyState />;
    }

    if (status === 'success' && data) {
      return (
        <>
          <CurrentWeather city={data.city} current={data.current} unit={unit} />
          <div className="mt-6">
            <ForecastList forecast={data.forecast} unit={unit} />
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <main className="min-h-screen bg-night-900 bg-[radial-gradient(circle_at_top,_rgba(109,124,255,0.25),_transparent_35%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glass backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-accent-400">SDD Weather App</p>
              <h1 className="mt-1 text-2xl font-bold text-white">Previsão do tempo</h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchBar
                value={searchText}
                onChange={setSearchText}
                onSearch={(cityName) => {
                  setSearchText(cityName);
                  void search(cityName);
                }}
              />
              <UnitToggle unit={unit} onChange={setUnit} />
            </div>
          </div>
        </header>

        <div className="mt-6">
          {cities.length > 0 && status !== 'loading' && status !== 'error' ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => void selectCity(city)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
                >
                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ''}
                </button>
              ))}
            </div>
          ) : null}
          {renderContent()}
        </div>
      </div>
    </main>
  );
}
