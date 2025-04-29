import EventCard from "@/components/EventCard";

async function eventData() {
  const response = await fetch("https://qevent-backend.labs.crio.do/events");
  return response.json();
}

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const dataList = await eventData();

  return (
    <div className="grid md:grid-cols-3 my-5">
      {dataList.map((data) => (
        <EventCard key={data.id} eventData={data} />
      ))}
    </div>
  );
}
