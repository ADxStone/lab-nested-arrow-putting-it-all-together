const { createLoginTracker } = require('../index');

describe('createLoginTracker', () => {
  test('returns attempt messages and successful login within 3 attempts', () => {
    const tracker = createLoginTracker({ username: 'alice', password: 'secret' });
    expect(tracker('wrong')).toBe('Attempt 1: Login failed');
    expect(tracker('nope')).toBe('Attempt 2: Login failed');
    expect(tracker('secret')).toBe('Login successful');
  });

  test('locks account after more than 3 failed attempts', () => {
    const tracker = createLoginTracker({ username: 'bob', password: 'pw' });
    expect(tracker('1')).toBe('Attempt 1: Login failed');
    expect(tracker('2')).toBe('Attempt 2: Login failed');
    expect(tracker('3')).toBe('Attempt 3: Login failed');
    expect(tracker('4')).toBe('Account locked due to too many failed login attempts');
    // subsequent calls remain locked
    expect(tracker('pw')).toBe('Account locked due to too many failed login attempts');
  });
});
