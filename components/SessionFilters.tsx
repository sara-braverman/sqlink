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
}: SessionFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <select
        value={selectedTrack}
        onChange={(e) => onTrackChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">All Tracks</option>
        {tracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>

      <select
        value={selectedTime}
        onChange={(e) => onTimeChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">All Times</option>
        <option value="morning">Morning (9:00 - 12:00)</option>
        <option value="afternoon">Afternoon (12:00 - 17:00)</option>
        <option value="evening">Evening (17:00+)</option>
      </select>
    </div>
  );
}
