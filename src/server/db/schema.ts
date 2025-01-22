import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  numeric,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

// User
export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  avatarUrl: varchar("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});
export const userRelations = relations(user, ({ many }) => ({
  expenses: many(expense),
  groups: many(userToGroup),
}));

// Expense
export const expense = pgTable("expense", {
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
export const expenseRelations = relations(expense, ({ one }) => ({
  paidBy: one(user, {
    fields: [expense.paidBy],
    references: [user.id],
  }),
  groupId: one(group, {
    fields: [expense.groupId],
    references: [group.id],
  }),
}));

// Group
export const group = pgTable("group", {
  id: uuid("id").primaryKey(),
  name: varchar("name").notNull(),
  currency: varchar("currency").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  categories: varchar("categories").array(),
  creatorId: uuid("creator_id")
    .references(() => user.id)
    .notNull(),
});
export const groupRelations = relations(group, ({ one, many }) => ({
  creator: one(user, {
    fields: [group.creatorId],
    references: [user.id],
  }),
  expenses: many(expense),
  members: many(userToGroup),
}));

// User to Group (Many to Many)
export const userToGroup = pgTable(
  "user_to_group",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    groupId: uuid("group_id")
      .notNull()
      .references(() => group.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  }),
);
export const userToGroupRelations = relations(userToGroup, ({ one }) => ({
  user: one(user, {
    fields: [userToGroup.userId],
    references: [user.id],
  }),
  group: one(group, {
    fields: [userToGroup.groupId],
    references: [group.id],
  }),
}));

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
