import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  direction: text("direction").notNull(), // "inbound" or "outbound"
  departureTime: text("departure_time").notNull(),
  arrivalTime: text("arrival_time").notNull(),
});

export const insertScheduleSchema = createInsertSchema(schedules).pick({
  direction: true,
  departureTime: true,
  arrivalTime: true,
});

export type InsertSchedule = z.infer<typeof insertScheduleSchema>;
export type Schedule = typeof schedules.$inferSelect;
