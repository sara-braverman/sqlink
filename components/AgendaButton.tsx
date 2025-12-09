'use client';

import { useState, useEffect } from 'react';

interface AgendaButtonProps {
  sessionId: string;
}

// Button to add/remove sessions from agenda (localStorage)
export default function AgendaButton({ sessionId }: AgendaButtonProps): JSX.Element {
  const [isInAgenda, setIsInAgenda] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    const agenda: string[] = JSON.parse(localStorage.getItem('agenda') || '[]');
    setIsInAgenda(agenda.includes(sessionId));
    setIsLoading(false);
  }, [sessionId]);

  // Toggles session in/out of agenda
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

  if (isLoading) {
    return (
      <button
        disabled
        className="px-6 py-3 rounded-lg font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

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
