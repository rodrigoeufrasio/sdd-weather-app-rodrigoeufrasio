import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EmptyState from '../../src/components/states/EmptyState';
import ErrorState from '../../src/components/states/ErrorState';
import LoadingState from '../../src/components/states/LoadingState';

describe('state components', () => {
  it('exposes the empty state as an assistive status', () => {
    render(<EmptyState />);

    expect(screen.getByRole('status')).toHaveTextContent('Nenhuma cidade encontrada');
  });

  it('exposes the loading state as an assistive status', () => {
    render(<LoadingState />);

    expect(screen.getByRole('status')).toHaveTextContent('Carregando previsão do tempo...');
  });

  it('renders a retry action in the error state', () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);

    expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado');
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
  });
});
