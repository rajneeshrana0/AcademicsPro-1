import { Calendar } from "../../components/calendar";
import { CreateEventButton } from "../../components/create-event-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Event Calendar</h1>
            <p className="text-muted-foreground mt-2">View and manage upcoming events</p>
          </div>
          <CreateEventButton />
        </div>
        <Calendar />
      </div>
    </div>
  );
}