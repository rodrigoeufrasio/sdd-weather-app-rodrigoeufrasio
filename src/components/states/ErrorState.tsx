interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Não foi possível carregar os dados.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center shadow-glass backdrop-blur-md"
    >
      <p className="text-lg font-semibold text-white">Algo deu errado</p>
      <p className="mt-2 text-slate-200">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-400"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
