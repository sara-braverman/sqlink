import { Session } from '@/types/session';
import sessionsData from '@/data/sessions.json';

// Fetches all sessions from JSON
export function getSessions(): Session[] {
  return sessionsData as Session[];
}

// Fetches a single session by ID
export function getSessionById(id: string): Session | undefined {
  return (sessionsData as Session[]).find((session) => session.id === id);
}
