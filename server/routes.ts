import type { Express } from "express";
import { createServer, type Server } from "http";

// Static schedule data from MBTA Providence/Stoughton Line
const providenceToSouthStation = [
  { departureTime: "4:25 AM", arrivalTime: "5:35 AM" },
  { departureTime: "4:45 AM", arrivalTime: "5:55 AM" },
  { departureTime: "5:45 AM", arrivalTime: "6:55 AM" },
  { departureTime: "6:25 AM", arrivalTime: "7:38 AM" },
  { departureTime: "7:00 AM", arrivalTime: "8:13 AM" },
  { departureTime: "7:45 AM", arrivalTime: "8:58 AM" },
  { departureTime: "8:25 AM", arrivalTime: "9:38 AM" },
  { departureTime: "9:30 AM", arrivalTime: "10:43 AM" },
  { departureTime: "11:30 AM", arrivalTime: "12:43 PM" },
  { departureTime: "1:30 PM", arrivalTime: "2:43 PM" },
  { departureTime: "3:30 PM", arrivalTime: "4:43 PM" },
  { departureTime: "4:20 PM", arrivalTime: "5:33 PM" },
  { departureTime: "5:00 PM", arrivalTime: "6:13 PM" },
  { departureTime: "5:40 PM", arrivalTime: "6:53 PM" },
  { departureTime: "6:25 PM", arrivalTime: "7:38 PM" },
  { departureTime: "7:30 PM", arrivalTime: "8:43 PM" },
  { departureTime: "8:40 PM", arrivalTime: "9:53 PM" },
  { departureTime: "10:00 PM", arrivalTime: "11:13 PM" },
  { departureTime: "11:55 PM", arrivalTime: "1:08 AM" }
];

const southStationToProvidence = [
  { departureTime: "4:25 AM", arrivalTime: "5:38 AM" },
  { departureTime: "5:05 AM", arrivalTime: "6:18 AM" },
  { departureTime: "6:10 AM", arrivalTime: "7:23 AM" },
  { departureTime: "6:45 AM", arrivalTime: "7:58 AM" },
  { departureTime: "7:30 AM", arrivalTime: "8:43 AM" },
  { departureTime: "8:15 AM", arrivalTime: "9:28 AM" },
  { departureTime: "9:00 AM", arrivalTime: "10:13 AM" },
  { departureTime: "10:35 AM", arrivalTime: "11:48 AM" },
  { departureTime: "12:35 PM", arrivalTime: "1:48 PM" },
  { departureTime: "2:35 PM", arrivalTime: "3:48 PM" },
  { departureTime: "3:45 PM", arrivalTime: "4:58 PM" },
  { departureTime: "4:30 PM", arrivalTime: "5:43 PM" },
  { departureTime: "5:10 PM", arrivalTime: "6:23 PM" },
  { departureTime: "5:50 PM", arrivalTime: "7:03 PM" },
  { departureTime: "6:35 PM", arrivalTime: "7:48 PM" },
  { departureTime: "7:40 PM", arrivalTime: "8:53 PM" },
  { departureTime: "9:10 PM", arrivalTime: "10:23 PM" },
  { departureTime: "10:40 PM", arrivalTime: "11:53 PM" },
  { departureTime: "11:55 PM", arrivalTime: "1:08 AM" }
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