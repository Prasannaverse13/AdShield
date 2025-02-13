import { visitors, fraudAlerts, type Visitor, type InsertVisitor, type FraudAlert, type InsertFraudAlert } from "@shared/schema";

export interface IStorage {
  getVisitors(): Promise<Visitor[]>;
  getVisitor(visitorId: string): Promise<Visitor | undefined>;
  createVisitor(visitor: InsertVisitor): Promise<Visitor>;
  updateVisitor(visitorId: string, update: Partial<InsertVisitor>): Promise<Visitor>;
  getFraudAlerts(): Promise<FraudAlert[]>;
  createFraudAlert(alert: InsertFraudAlert): Promise<FraudAlert>;
}

export class MemStorage implements IStorage {
  private visitors: Map<string, Visitor>;
  private fraudAlerts: Map<number, FraudAlert>;
  private currentAlertId: number;

  constructor() {
    this.visitors = new Map();
    this.fraudAlerts = new Map();
    this.currentAlertId = 1;
  }

  async getVisitors(): Promise<Visitor[]> {
    return Array.from(this.visitors.values());
  }

  async getVisitor(visitorId: string): Promise<Visitor | undefined> {
    return this.visitors.get(visitorId);
  }

  async createVisitor(insertVisitor: InsertVisitor): Promise<Visitor> {
    const visitor: Visitor = {
      id: this.visitors.size + 1,
      visitorId: insertVisitor.visitorId,
      browserName: insertVisitor.browserName ?? null,
      os: insertVisitor.os ?? null,
      ipAddress: insertVisitor.ipAddress ?? null,
      lastSeen: new Date(),
      fraudScore: insertVisitor.fraudScore ?? 0,
      isFlagged: insertVisitor.isFlagged ?? false,
    };
    this.visitors.set(visitor.visitorId, visitor);
    return visitor;
  }

  async updateVisitor(visitorId: string, update: Partial<InsertVisitor>): Promise<Visitor> {
    const existing = this.visitors.get(visitorId);
    if (!existing) {
      throw new Error("Visitor not found");
    }
    const updated = { 
      ...existing,
      ...update,
      browserName: update.browserName ?? existing.browserName,
      os: update.os ?? existing.os,
      ipAddress: update.ipAddress ?? existing.ipAddress,
      fraudScore: update.fraudScore ?? existing.fraudScore,
      isFlagged: update.isFlagged ?? existing.isFlagged,
      lastSeen: new Date()
    };
    this.visitors.set(visitorId, updated);
    return updated;
  }

  async getFraudAlerts(): Promise<FraudAlert[]> {
    return Array.from(this.fraudAlerts.values());
  }

  async createFraudAlert(insertAlert: InsertFraudAlert): Promise<FraudAlert> {
    const alert: FraudAlert = {
      id: this.currentAlertId++,
      visitorId: insertAlert.visitorId,
      reason: insertAlert.reason,
      severity: insertAlert.severity,
      timestamp: new Date(),
    };
    this.fraudAlerts.set(alert.id, alert);
    return alert;
  }
}

export const storage = new MemStorage();