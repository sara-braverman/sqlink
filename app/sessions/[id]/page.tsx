import { getSessionById, getSessions } from '@/lib/sessions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AgendaButton from '@/components/AgendaButton';
import { Session } from '@/types/session';

export function generateStaticParams(): { id: string }[] {
  const sessions: Session[] = getSessions();
  return sessions.map((session: Session): { id: string } => ({ id: session.id }));
}

export default function SessionPage({ params }: { params: { id: string } }): JSX.Element {
  const session: Session | undefined = getSessionById(params.id);

  if (!session) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Sessions
        </Link>
        <Link href="/agenda" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
          My Agenda
        </Link>
      </div>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{session.title}</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {session.track}
          </span>
        </div>
        <AgendaButton sessionId={session.id} />
        <div className="space-y-4 text-lg mt-6">
          <p><strong>Speaker:</strong> {session.speaker}</p>
          <p><strong>Room:</strong> {session.room}</p>
          <p>
            <strong>Time:</strong> {new Date(session.startTime).toLocaleString('en-US', { 
              dateStyle: 'long', 
              timeStyle: 'short' 
            })} - {new Date(session.endTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          <div>
            <strong>Description:</strong>
            <p className="mt-2 text-gray-700">{session.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
