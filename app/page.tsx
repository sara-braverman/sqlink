import { getSessions } from '@/lib/sessions';
import SessionsList from '@/components/SessionsList';
import { Session } from '@/types/session';

export default function Home(): JSX.Element {
  const sessions: Session[] = getSessions();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Sessions</h1>
      <SessionsList sessions={sessions} />
    </main>
  )
}
