import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import EmptyState from './components/states/EmptyState';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import UnitToggle from './components/UnitToggle';
import { mockWeatherData } from './data/mockWeather';
import type { Unit } from './types/weather';

export default function App() {
  const [search, setSearch] = useState('');
  const [unit, setUnit] = useState<Unit>('celsius');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'empty' | 'error'>(
    'success',
  );

  const handleSearch = (_city: string) => {
    setStatus('loading');

    window.setTimeout(() => {
      setStatus('success');
    }, 500);
  };

  const renderContent = () => {
    if (status === 'loading') {
      return <LoadingState />;
    }

    if (status === 'error') {
      return <ErrorState onRetry={() => setStatus('success')} />;
    }

    if (status === 'empty') {
      return <EmptyState />;
    }

    if (status === 'success') {
      return (
        <>
          <CurrentWeather
            city={mockWeatherData.city}
            current={mockWeatherData.current}
            unit={unit}
          />
          <div className="mt-6">
            <ForecastList forecast={mockWeatherData.forecast} unit={unit} />
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
              <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
              <UnitToggle unit={unit} onChange={setUnit} />
            </div>
          </div>
        </header>

        <div className="mt-6">{renderContent()}</div>
      </div>
    </main>
  );
}
