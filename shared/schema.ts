import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id").notNull(),
  browserName: text("browser_name"),
  os: text("os"),
  ipAddress: text("ip_address"),
  lastSeen: timestamp("last_seen").defaultNow(),
  fraudScore: integer("fraud_score").default(0),
  isFlagged: boolean("is_flagged").default(false),
});

export const fraudAlerts = pgTable("fraud_alerts", {
  id: serial("id").primaryKey(),
  visitorId: text("visitor_id").notNull(),
  reason: text("reason").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  severity: text("severity").notNull(),
});

export const insertVisitorSchema = createInsertSchema(visitors).omit({ 
  id: true, 
  lastSeen: true 
});

export const insertFraudAlertSchema = createInsertSchema(fraudAlerts).omit({ 
  id: true, 
  timestamp: true 
});

export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type InsertFraudAlert = z.infer<typeof insertFraudAlertSchema>;
export type Visitor = typeof visitors.$inferSelect;
export type FraudAlert = typeof fraudAlerts.$inferSelect;
