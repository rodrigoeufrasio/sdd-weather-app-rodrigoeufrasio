interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Nenhuma cidade encontrada',
  description = 'Tente buscar outro nome ou refine a sua pesquisa.',
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-glass backdrop-blur-md"
    >
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-slate-300">{description}</p>
    </div>
  );
}
