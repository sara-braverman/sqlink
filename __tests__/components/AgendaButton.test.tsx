import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgendaButton from '@/components/AgendaButton';

describe('AgendaButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders "Add to my agenda" button initially', async () => {
    render(<AgendaButton sessionId="s1" />);
    await waitFor(() => {
      expect(screen.getByText('Add to my agenda')).toBeInTheDocument();
    });
  });

  test('adds session to agenda when clicked', async () => {
    render(<AgendaButton sessionId="s1" />);
    const button = await screen.findByText('Add to my agenda');
    fireEvent.click(button);
    
    const agenda = JSON.parse(localStorage.getItem('agenda') || '[]');
    expect(agenda).toContain('s1');
  });

  test('removes session from agenda when clicked again', async () => {
    localStorage.setItem('agenda', JSON.stringify(['s1']));
    render(<AgendaButton sessionId="s1" />);
    
    const button = await screen.findByText('Remove from my agenda');
    fireEvent.click(button);
    
    const agenda = JSON.parse(localStorage.getItem('agenda') || '[]');
    expect(agenda).not.toContain('s1');
  });
});
