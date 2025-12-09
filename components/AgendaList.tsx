'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Session } from '@/types/session';

interface AgendaListProps {
  sessions: Session[];
}

function hasTimeConflict(session: Session, otherSessions: Session[]): boolean {
  const start = new Date(session.startTime).getTime();
  const end = new Date(session.endTime).getTime();
  
  return otherSessions.some((other) => {
    if (other.id === session.id) return false;
    const otherStart = new Date(other.startTime).getTime();
    const otherEnd = new Date(other.endTime).getTime();
    return (start < otherEnd && end > otherStart);
  });
}

export default function AgendaList({ sessions }: AgendaListProps): JSX.Element {
  const [agendaSessions, setAgendaSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): void => {
    const agendaIds: string[] = JSON.parse(localStorage.getItem('agenda') || '[]');
    const filtered: Session[] = sessions.filter((s: Session): boolean => agendaIds.includes(s.id));
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
      {agendaSessions.map((session: Session): JSX.Element => {
        const hasConflict: boolean = hasTimeConflict(session, agendaSessions);
        return (
          <Link
            key={session.id}
            href={`/sessions/${session.id}`}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow block"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{session.title}</h2>
                {hasConflict && <span className="text-xl">⚠️</span>}
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {session.track}
              </span>
            </div>
            <p className="text-gray-600 mb-2">Speaker: {session.speaker}</p>
            {hasConflict && (
              <p className="text-orange-600 text-sm mb-2 font-semibold">⚠️ Time conflict with another session</p>
            )}
            <div className="flex gap-4 text-sm text-gray-500">
              <span>
                🕒 {new Date(session.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} -{' '}
                {new Date(session.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span>📍 {session.room}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
