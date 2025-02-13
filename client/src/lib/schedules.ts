import { format, parse, isAfter } from "date-fns";

export interface TrainSchedule {
  departureTime: string;
  arrivalTime: string;
}

export function getNextTrain(schedules: TrainSchedule[]): TrainSchedule | null {
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");

  for (const schedule of schedules) {
    const depTime = parse(schedule.departureTime, "h:mm aa", new Date());
    const scheduleDate = parse(
      `${today} ${schedule.departureTime}`,
      "yyyy-MM-dd h:mm aa",
      new Date()
    );

    if (isAfter(scheduleDate, now)) {
      return schedule;
    }
  }

  return schedules[0]; // Return first train of next day if no more trains today
}
