
let sessions = [];

export const createSession = (user) => {
  const session = {
    id: Math.ceil(Math.random() * 10000).toString(),
    user,
  };
  sessions.push(session);
  return Promise.resolve(session);
};

export const getSession = (id) => {
  const session = sessions.find((s) => s.id === id);
  if (!session) return Promise.resolve(null);
  return Promise.resolve(session);
};

export const removeSession = (id) => {
  const session = sessions.find((session) => session.id === id);
  if (!session) return Promise.reject(new Error('Session not found'));
  sessions = sessions.filter((session) => session.id !== id);
  return Promise.resolve(session);
};
