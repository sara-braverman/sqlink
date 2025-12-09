'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Session } from '@/types/session';
import SessionFilters from './SessionFilters';

interface SessionsListProps {
  sessions: Session[];
}

function getTimeOfDay(startTime: string): string {
  const hour = new Date(startTime).getHours();
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
}

export default function SessionsList({ sessions }: SessionsListProps) {
  const [selectedTrack, setSelectedTrack] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = Array.from(new Set(sessions.map((s) => s.track)));

  const filteredSessions = sessions.filter((session) => {
    if (selectedTrack && session.track !== selectedTrack) return false;
    if (selectedTime && getTimeOfDay(session.startTime) !== selectedTime) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return session.title.toLowerCase().includes(query) || session.speaker.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search by title or speaker..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <SessionFilters
        tracks={tracks}
        selectedTrack={selectedTrack}
        selectedTime={selectedTime}
        onTrackChange={setSelectedTrack}
        onTimeChange={setSelectedTime}
      />
      <div className="grid gap-4">
        {filteredSessions.map((session) => (
          <Link key={session.id} href={`/sessions/${session.id}`} className="border rounded-lg p-6 hover:shadow-lg transition-shadow block">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-semibold">{session.title}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {session.track}
              </span>
            </div>
            <p className="text-gray-600 mb-2">Speaker: {session.speaker}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>🕒 {new Date(session.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(session.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              <span>📍 {session.room}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
