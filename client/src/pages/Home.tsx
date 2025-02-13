import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Train } from "lucide-react";
import type { TrainSchedule } from "@/lib/schedules";
import { getNextTrain } from "@/lib/schedules";

export default function Home() {
  const { data: inboundSchedules, isLoading: inboundLoading } = useQuery<
    TrainSchedule[]
  >({
    queryKey: ["/api/schedules/inbound"],
  });

  const { data: outboundSchedules, isLoading: outboundLoading } = useQuery<
    TrainSchedule[]
  >({
    queryKey: ["/api/schedules/outbound"],
  });

  const nextInbound = inboundSchedules ? getNextTrain(inboundSchedules) : null;
  const nextOutbound = outboundSchedules ? getNextTrain(outboundSchedules) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Hello, Abdelmonem Khedr
          </h1>
          <p className="text-muted-foreground">
            Here are your next available trains
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
              {inboundLoading ? (
                <Skeleton className="h-20 w-full" />
              ) : nextInbound ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    Departure: {nextInbound.departureTime}
                  </div>
                  <div className="text-muted-foreground">
                    Arrival: {nextInbound.arrivalTime}
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
              {outboundLoading ? (
                <Skeleton className="h-20 w-full" />
              ) : nextOutbound ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    Departure: {nextOutbound.departureTime}
                  </div>
                  <div className="text-muted-foreground">
                    Arrival: {nextOutbound.arrivalTime}
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
