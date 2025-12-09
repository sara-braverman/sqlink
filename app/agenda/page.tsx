import AgendaList from '@/components/AgendaList';
import { getSessions } from '@/lib/sessions';
import Link from 'next/link';
import { Session } from '@/types/session';

export default function AgendaPage(): JSX.Element {
  const sessions: Session[] = getSessions();

  return (
    <main className="min-h-screen p-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Sessions
      </Link>
      <h1 className="text-4xl font-bold mb-8">My Agenda</h1>
      <AgendaList sessions={sessions} />
    </main>
  );
}
