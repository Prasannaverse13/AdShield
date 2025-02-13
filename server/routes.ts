import type { Express } from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertVisitorSchema, insertFraudAlertSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // WebSocket connection handling
  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.type === 'VISITOR_UPDATE') {
          const visitor = await storage.getVisitor(message.visitorId);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'VISITOR_UPDATED', visitor }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket error:', error);
      }
    });
  });

  // API Routes
  app.get('/api/visitors', async (_req, res) => {
    const visitors = await storage.getVisitors();
    res.json(visitors);
  });

  app.post('/api/visitors', async (req, res) => {
    const parseResult = insertVisitorSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid visitor data', details: parseResult.error });
    }
    const visitor = await storage.createVisitor(parseResult.data);

    // Broadcast to WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'NEW_VISITOR', visitor }));
      }
    });

    res.json(visitor);
  });

  app.get('/api/fraud-alerts', async (_req, res) => {
    const alerts = await storage.getFraudAlerts();
    res.json(alerts);
  });

  app.post('/api/fraud-alerts', async (req, res) => {
    const parseResult = insertFraudAlertSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid alert data', details: parseResult.error });
    }
    const alert = await storage.createFraudAlert(parseResult.data);

    // Broadcast alert to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'NEW_ALERT', alert }));
      }
    });

    res.json(alert);
  });

  return httpServer;
}