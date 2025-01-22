import { relations } from "drizzle-orm";
import {
  pgTable as table,
  varchar,
  timestamp,
  numeric,
  uuid,
} from "drizzle-orm/pg-core";

// User
export const user = table("user", {
  id: uuid("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  avatarUrl: varchar("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  groups: many(group),
  expenses: many(expense),
}));

// Group
export const group = table("group", {
  id: uuid("id").primaryKey(),
  name: varchar("name").notNull(),
  currency: varchar("currency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  categories: varchar("categories").array(),
  creatorId: uuid("creator_id")
    .references(() => user.id)
    .notNull(),
});

// Expense
export const expense = table("expense", {
  id: uuid("id").primaryKey(),
  title: varchar("title").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  paidBy: uuid("paid_by")
    .references(() => user.id)
    .notNull(),
  groupId: uuid("group_id")
    .references(() => group.id)
    .notNull(),
});

// Expense Participants
// export const expenseParticipants = table(
//   "expense_participants",
//   {
//     expenseId: uuid("expense_id").references(() => expense.id),
//     userId: uuid("user_id").references(() => user.id),
//     amountOwed: numeric("amount_owed", { precision: 10, scale: 2 }).notNull(),
//   },
//   (table) => ({
//     pk: primaryKey({ columns: [table.expenseId, table.userId] }),
//   }),
// );
