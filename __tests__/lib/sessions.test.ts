import { getSessions, getSessionById } from '@/lib/sessions';

describe('sessions library', () => {
  test('getSessions returns array of sessions', () => {
    const sessions = getSessions();
    expect(Array.isArray(sessions)).toBe(true);
    expect(sessions.length).toBeGreaterThan(0);
  });

  test('each session has required fields', () => {
    const sessions = getSessions();
    const session = sessions[0];
    expect(session).toHaveProperty('id');
    expect(session).toHaveProperty('title');
    expect(session).toHaveProperty('speaker');
    expect(session).toHaveProperty('track');
    expect(session).toHaveProperty('startTime');
    expect(session).toHaveProperty('endTime');
    expect(session).toHaveProperty('room');
    expect(session).toHaveProperty('description');
  });

  test('getSessionById returns correct session', () => {
    const session = getSessionById('s1');
    expect(session).toBeDefined();
    expect(session?.id).toBe('s1');
    expect(session?.title).toBe('Modern React Patterns');
  });

  test('getSessionById returns undefined for invalid id', () => {
    const session = getSessionById('invalid-id');
    expect(session).toBeUndefined();
  });
});
