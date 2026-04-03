import { time } from "drizzle-orm/mysql-core";
import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),

    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }),

    email: varchar('email', { length: 322 }).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),

    password: varchar('password', { length: 66 }),
    salt: text('salt'),

    createAt: timestamp('create_at').defaultNow().notNull(),
    updateAt: timestamp('update_at').$onUpdate(() => new Date())
});
