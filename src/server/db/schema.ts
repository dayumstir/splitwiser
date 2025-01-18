import { relations } from "drizzle-orm";
import {
  pgTable as table,
  serial,
  varchar,
  timestamp,
  numeric,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// User
export const user = table("user", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  trips: many(trip),
  expenses: many(expense),
}));

// Trip
export const trip = table("trip", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  currency: varchar("currency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  categories: varchar("categories").array(),
  creatorId: integer("creator_id")
    .references(() => user.id)
    .notNull(),
});

// Expense
export const expense = table("expense", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  paidBy: integer("paid_by")
    .references(() => user.id)
    .notNull(),
  tripId: integer("trip_id")
    .references(() => trip.id)
    .notNull(),
});

// Expense Participants
export const expenseParticipants = table(
  "expense_participants",
  {
    expenseId: integer("expense_id").references(() => expense.id),
    userId: integer("user_id").references(() => user.id),
    amountOwed: numeric("amount_owed", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.expenseId, table.userId] }),
  }),
);
