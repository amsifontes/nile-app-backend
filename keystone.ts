import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';

import { User } from './schemas/User';
import { Product } from './schemas/Product';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-nile-local';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // stay signed in for a month
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in initial roles here
  },
});

export default withAuth(
  config({
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
      User,
      Product,
    }),
    ui: {
      // Show UI only if session available and logged in
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data, // is access to keystone data dashboard allowed
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
