import { render, screen, fireEvent } from '@testing-library/react';
import SessionFilters from '@/components/SessionFilters';

describe('SessionFilters', () => {
  const mockOnTrackChange = jest.fn();
  const mockOnTimeChange = jest.fn();
  const tracks = ['Frontend', 'Backend', 'DevOps'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders track and time filters', () => {
    render(
      <SessionFilters
        tracks={tracks}
        selectedTrack=""
        selectedTime=""
        onTrackChange={mockOnTrackChange}
        onTimeChange={mockOnTimeChange}
      />
    );

    expect(screen.getByText('All Tracks')).toBeInTheDocument();
    expect(screen.getByText('All Times')).toBeInTheDocument();
  });

  test('calls onTrackChange when track is selected', () => {
    render(
      <SessionFilters
        tracks={tracks}
        selectedTrack=""
        selectedTime=""
        onTrackChange={mockOnTrackChange}
        onTimeChange={mockOnTimeChange}
      />
    );

    const trackSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(trackSelect, { target: { value: 'Frontend' } });
    expect(mockOnTrackChange).toHaveBeenCalledWith('Frontend');
  });

  test('calls onTimeChange when time is selected', () => {
    render(
      <SessionFilters
        tracks={tracks}
        selectedTrack=""
        selectedTime=""
        onTrackChange={mockOnTrackChange}
        onTimeChange={mockOnTimeChange}
      />
    );

    const timeSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(timeSelect, { target: { value: 'morning' } });
    expect(mockOnTimeChange).toHaveBeenCalledWith('morning');
  });
});
