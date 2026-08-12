export function formatDayLabel(date: string, index: number): string {
  if (index === 0) return 'Hoje';
  if (index === 1) return 'Amanhã';

  const day = new Date(date);
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(day);
}
