import EventCard from "@/components/EventCard";
import React, { Suspense } from "react";

async function eventData() {
  const response = await fetch("https://qevent-backend.labs.crio.do/events");
  return response.json();
}

export default async function EventsPage() {
  const dataList = await eventData();

  return (
    <div className="grid md:grid-cols-3 my-5">
      {dataList.map((data) => (
        <Suspense
          key={data.id}
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <h1>Loading event...</h1>
            </div>
          }
        >
          <EventCard eventData={data} />
        </Suspense>
      ))}
    </div>
  );
}
