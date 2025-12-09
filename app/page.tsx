import { getSessions } from '@/lib/sessions';
import SessionsList from '@/components/SessionsList';
import { Session } from '@/types/session';
import Link from 'next/link';

// Home page - Server Component
export default function Home(): JSX.Element {
  const sessions: Session[] = getSessions();

  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">Sessions</h1>
        <Link href="/agenda" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
          My Agenda
        </Link>
      </div>
      <SessionsList sessions={sessions} />
    </main>
  )
}
