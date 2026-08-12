interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ value, onChange, onSearch, disabled = false }: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    onSearch(trimmedValue);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 p-2 shadow-glass backdrop-blur-md"
    >
      <label htmlFor="city-search" className="sr-only">
        Buscar cidade
      </label>
      <input
        id="city-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar cidade"
        disabled={disabled}
        className="w-full bg-transparent px-4 py-2 text-base text-white placeholder:text-slate-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Buscar
      </button>
    </form>
  );
}
