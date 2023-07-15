import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-nile-local';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // stay signed in for a month
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // TODO: Add schema items here
  }),
  ui: {
    // TODO: enable setting values dynamically by role
    isAccessAllowed: () => true, // is access to keystone data dashboard allowed
  },
  // TODO: Add session values here
});
