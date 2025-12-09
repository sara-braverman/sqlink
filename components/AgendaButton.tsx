'use client';

import { useState, useEffect } from 'react';

interface AgendaButtonProps {
  sessionId: string;
}

export default function AgendaButton({ sessionId }: AgendaButtonProps): JSX.Element {
  const [isInAgenda, setIsInAgenda] = useState<boolean>(false);

  useEffect((): void => {
    const agenda: string[] = JSON.parse(localStorage.getItem('agenda') || '[]');
    setIsInAgenda(agenda.includes(sessionId));
  }, [sessionId]);

  const toggleAgenda = (): void => {
    const agenda: string[] = JSON.parse(localStorage.getItem('agenda') || '[]');
    if (isInAgenda) {
      const updated: string[] = agenda.filter((id: string): boolean => id !== sessionId);
      localStorage.setItem('agenda', JSON.stringify(updated));
      setIsInAgenda(false);
    } else {
      agenda.push(sessionId);
      localStorage.setItem('agenda', JSON.stringify(agenda));
      setIsInAgenda(true);
    }
  };

  return (
    <button
      onClick={toggleAgenda}
      className={`px-6 py-3 rounded-lg font-semibold ${
        isInAgenda
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {isInAgenda ? 'Remove from my agenda' : 'Add to my agenda'}
    </button>
  );
}
