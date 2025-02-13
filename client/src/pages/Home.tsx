import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Train } from "lucide-react";
import type { TrainSchedule } from "@/lib/schedules";
import { getNextTrain, getSchedules } from "@/lib/schedules";
import { useEffect, useState } from "react";

export default function Home() {
  const [inboundSchedules, setInboundSchedules] = useState<TrainSchedule[]>([]);
  const [outboundSchedules, setOutboundSchedules] = useState<TrainSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load schedules from static data
    setInboundSchedules(getSchedules('inbound'));
    setOutboundSchedules(getSchedules('outbound'));
    setLoading(false);
  }, []);

  const nextInbound = inboundSchedules ? getNextTrain(inboundSchedules) : null;
  const nextOutbound = outboundSchedules ? getNextTrain(outboundSchedules) : null;

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            MBTA Schedule Viewer
          </h1>
          <p className="text-muted-foreground">
            Current time: {currentTime} EST
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Train className="h-5 w-5" />
                Providence → South Station
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-20 w-full" />
              ) : nextInbound ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    Next train departs: {nextInbound.departureTime}
                  </div>
                  <div className="text-muted-foreground">
                    Arrives: {nextInbound.arrivalTime}
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No more trains scheduled today
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Train className="h-5 w-5" />
                South Station → Providence
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-20 w-full" />
              ) : nextOutbound ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    Next train departs: {nextOutbound.departureTime}
                  </div>
                  <div className="text-muted-foreground">
                    Arrives: {nextOutbound.arrivalTime}
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No more trains scheduled today
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}