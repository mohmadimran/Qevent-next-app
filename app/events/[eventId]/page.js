async function getEventById(eventId) {
  const res = await fetch(
    `https://qevent-backend.labs.crio.do/events/${eventId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}
export default async function EventDetailPage({ params }) {
  const { eventId } = params;
  const eventData = await getEventById(eventId);

  return (
    <div className="w-[90%] mx-auto py-10">
      <img
        src={eventData.image}
        alt={eventData.name}
        className="w-[60%] mx-auto h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent  font-semibold mb-6">{eventData.name}</h1>

      <div className="text-lg space-y-2">
        <p>
          <strong>Location:</strong> {eventData.location}
        </p>
        <p>
          <strong>Artist:</strong> {eventData.artist}
        </p>
        <p>
          <strong>Date:</strong> {new Date(eventData.date).toDateString()}
        </p>
        <p>
          <strong>Time:</strong> {eventData.time}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {eventData.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <p>
          {eventData.description.slice(0, 250)}
        </p>
        <div className="flex items-center justify-between">
        <p className="bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent text-3xl font-semibold">
          {eventData.price > 0 ? `$${eventData.price}` : "FREE"}
        </p>
        <button className="bg-red-600 rounded-md px-4 py-2 text-white">Buy tickets</button>
        </div>
      </div>
    </div>
  );
}
