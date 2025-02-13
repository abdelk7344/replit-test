import { format, parse, isAfter, startOfDay, addDays } from "date-fns";

export interface TrainSchedule {
  departureTime: string;
  arrivalTime: string;
}

export function getNextTrain(schedules: TrainSchedule[]): TrainSchedule | null {
  // Get current time in EST/EDT
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  const tomorrow = format(addDays(now, 1), "yyyy-MM-dd");

  // Try to find next train today
  for (const schedule of schedules) {
    const scheduleDate = parse(
      `${today} ${schedule.departureTime}`,
      "yyyy-MM-dd h:mm aa",
      new Date()
    );

    if (isAfter(scheduleDate, now)) {
      return schedule;
    }
  }

  // If no trains today, return first train tomorrow
  if (schedules.length > 0) {
    return {
      ...schedules[0],
      departureTime: `Tomorrow at ${schedules[0].departureTime}`,
      arrivalTime: `Tomorrow at ${schedules[0].arrivalTime}`
    };
  }

  return null;
}