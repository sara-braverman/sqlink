import { Session } from '@/types/session';
import sessionsData from '@/data/sessions.json';

export function getSessions(): Session[] {
  return sessionsData as Session[];
}

export function getSessionById(id: string): Session | undefined {
  return (sessionsData as Session[]).find((session) => session.id === id);
}
