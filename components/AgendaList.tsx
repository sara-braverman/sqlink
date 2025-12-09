'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Session } from '@/types/session';

interface AgendaListProps {
  sessions: Session[];
}

export default function AgendaList({ sessions }: AgendaListProps) {
  const [agendaSessions, setAgendaSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const agendaIds = JSON.parse(localStorage.getItem('agenda') || '[]');
    const filtered = sessions.filter((s) => agendaIds.includes(s.id));
    setAgendaSessions(filtered);
    setLoading(false);
  }, [sessions]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (agendaSessions.length === 0) {
    return <p className="text-gray-600">No sessions in your agenda yet.</p>;
  }

  return (
    <div className="grid gap-4">
      {agendaSessions.map((session) => (
        <Link
          key={session.id}
          href={`/sessions/${session.id}`}
          className="border rounded-lg p-6 hover:shadow-lg transition-shadow block"
        >
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-semibold">{session.title}</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {session.track}
            </span>
          </div>
          <p className="text-gray-600 mb-2">Speaker: {session.speaker}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>
              🕒 {new Date(session.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} -{' '}
              {new Date(session.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span>📍 {session.room}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
