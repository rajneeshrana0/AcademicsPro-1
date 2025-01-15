"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarUI } from "./ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalendarDays, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  useEffect(() => {
    if (date) {
      const dayEvents = events.filter(
        (event) =>
          format(new Date(event.startDate), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      );
      setSelectedDayEvents(dayEvents);
    }
  }, [date, events]);

  const futureEvents = events.filter((event) => isFuture(new Date(event.startDate)));
  const pastEvents = events.filter((event) => isPast(new Date(event.endDate)));

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {format(new Date(event.startDate), "MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{event.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {format(new Date(event.startDate), "h:mm a")} -{" "}
            {format(new Date(event.endDate), "h:mm a")}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="md:sticky md:top-8 h-fit">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view events</CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Events for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length === 0 ? (
              <p className="text-muted-foreground">No events scheduled for this day.</p>
            ) : (
              <div className="space-y-4">
                {selectedDayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-4 mt-4">
              {futureEvents.length === 0 ? (
                <p className="text-muted-foreground">No upcoming events.</p>
              ) : (
                futureEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-4 mt-4">
              {pastEvents.length === 0 ? (
                <p className="text-muted-foreground">No past events.</p>
              ) : (
                pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}