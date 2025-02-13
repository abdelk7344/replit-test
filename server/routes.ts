import type { Express } from "express";
import { createServer, type Server } from "http";

// Static schedule data
const providenceToSouthStation = [
  { departureTime: "6:25 AM", arrivalTime: "7:38 AM" },
  { departureTime: "7:00 AM", arrivalTime: "8:13 AM" },
  { departureTime: "7:45 AM", arrivalTime: "8:58 AM" },
  { departureTime: "8:25 AM", arrivalTime: "9:38 AM" },
];

const southStationToProvidence = [
  { departureTime: "6:10 AM", arrivalTime: "7:23 AM" },
  { departureTime: "7:00 AM", arrivalTime: "8:13 AM" },
  { departureTime: "8:15 AM", arrivalTime: "9:28 AM" },
  { departureTime: "9:00 AM", arrivalTime: "10:13 AM" },
];

export function registerRoutes(app: Express): Server {
  app.get("/api/schedules/inbound", (_req, res) => {
    res.json(providenceToSouthStation);
  });

  app.get("/api/schedules/outbound", (_req, res) => {
    res.json(southStationToProvidence);
  });

  const httpServer = createServer(app);
  return httpServer;
}
