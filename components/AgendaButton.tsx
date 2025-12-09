'use client';

import { useState, useEffect } from 'react';

interface AgendaButtonProps {
  sessionId: string;
}

export default function AgendaButton({ sessionId }: AgendaButtonProps) {
  const [isInAgenda, setIsInAgenda] = useState(false);

  useEffect(() => {
    const agenda = JSON.parse(localStorage.getItem('agenda') || '[]');
    setIsInAgenda(agenda.includes(sessionId));
  }, [sessionId]);

  const toggleAgenda = () => {
    const agenda = JSON.parse(localStorage.getItem('agenda') || '[]');
    if (isInAgenda) {
      const updated = agenda.filter((id: string) => id !== sessionId);
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
