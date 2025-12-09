'use client';

interface SessionFiltersProps {
  tracks: string[];
  selectedTrack: string;
  selectedTime: string;
  onTrackChange: (track: string) => void;
  onTimeChange: (time: string) => void;
}

export default function SessionFilters({
  tracks,
  selectedTrack,
  selectedTime,
  onTrackChange,
  onTimeChange,
}: SessionFiltersProps): JSX.Element {
  const times = [
    { value: 'morning', label: 'Morning (9:00-12:00)' },
    { value: 'afternoon', label: 'Afternoon (12:00-17:00)' },
    { value: 'evening', label: 'Evening (17:00+)' },
  ];

  return (
    <div className="w-full mb-6">
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2">Track:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTrackChange('')}
            className={`px-4 py-2 rounded-lg border ${
              selectedTrack === '' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            All Tracks
          </button>
          {tracks.map((track: string) => (
            <button
              key={track}
              onClick={() => onTrackChange(track)}
              className={`px-4 py-2 rounded-lg border ${
                selectedTrack === track ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Time:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTimeChange('')}
            className={`px-4 py-2 rounded-lg border ${
              selectedTime === '' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            All Times
          </button>
          {times.map((time) => (
            <button
              key={time.value}
              onClick={() => onTimeChange(time.value)}
              className={`px-4 py-2 rounded-lg border ${
                selectedTime === time.value ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
