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

  // Format current time for comparison
  const currentTimeString = currentTimeEST.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  console.log('Current time (EST):', currentTimeString);

  // Try to find next train today
  for (const schedule of schedules) {
    console.log('Checking schedule:', schedule.departureTime);

    // Parse the times for comparison
    const [scheduleTime, schedulePeriod] = schedule.departureTime.split(' ');
    const [currentTime, currentPeriod] = currentTimeString.split(' ');

    // Convert to 24-hour format for comparison
    const [scheduleHour, scheduleMinute] = scheduleTime.split(':').map(Number);
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);

    // Convert to minutes since midnight for easier comparison
    const scheduleMinutes = (scheduleHour % 12 + (schedulePeriod === 'PM' ? 12 : 0)) * 60 + scheduleMinute;
    const currentMinutes = (currentHour % 12 + (currentPeriod === 'PM' ? 12 : 0)) * 60 + currentMinute;

    console.log('Schedule minutes:', scheduleMinutes, 'Current minutes:', currentMinutes);

    if (scheduleMinutes > currentMinutes) {
      console.log('Found next train:', schedule.departureTime);
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