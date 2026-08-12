export default function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-glass backdrop-blur-md"
    >
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent-400 border-t-transparent" />
      <p className="mt-4 text-lg font-medium text-white">Carregando previsão do tempo...</p>
    </div>
  );
}
