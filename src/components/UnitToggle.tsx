import type { Unit } from '../types/weather';

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      role="group"
      aria-label="Unidade de temperatura"
      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 shadow-glass backdrop-blur-md"
    >
      {(['celsius', 'fahrenheit'] as const).map((option) => {
        const isActive = option === unit;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              isActive ? 'bg-accent-500 text-white shadow-lg' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            {option === 'celsius' ? '°C' : '°F'}
          </button>
        );
      })}
    </div>
  );
}
