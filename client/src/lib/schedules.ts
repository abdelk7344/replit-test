import { format, parse, isAfter } from "date-fns";

export interface TrainSchedule {
  departureTime: string;
  arrivalTime: string;
}

export function getNextTrain(schedules: TrainSchedule[]): TrainSchedule | null {
  // Get current time in EST/EDT
  const now = new Date();

  // Convert current time to EST/EDT for comparison
  const currentTimeEST = new Date(now.toLocaleString("en-US", {
    timeZone: "America/New_York"
  }));

  // Try to find next train today
  for (const schedule of schedules) {
    // Parse the departure time into a Date object for today
    const [time, period] = schedule.departureTime.split(' ');
    const [hours, minutes] = time.split(':');

    const scheduleDate = new Date(currentTimeEST);
    scheduleDate.setHours(
      period === 'PM' && hours !== '12' 
        ? parseInt(hours) + 12 
        : period === 'AM' && hours === '12'
        ? 0
        : parseInt(hours),
      parseInt(minutes),
      0,
      0
    );

    if (isAfter(scheduleDate, currentTimeEST)) {
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