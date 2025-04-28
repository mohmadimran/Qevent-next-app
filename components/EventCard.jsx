"use client";
import { useSearchParams } from "next/navigation";
import Tag from "./Tag";
import Link from "next/link";

const EventCard = ({ eventData }) => {
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  const tagName = searchParams.get("tag");

  if (artistName && eventData.artist !== artistName) {
    return null;
  }

  if (tagName && (!Array.isArray(eventData.tags) || !eventData.tags.includes(tagName))) {
    return null;
  }
  

  return (
    <div className="hover-inverse w-[90%] group transform transition-transform duration-400 hover:scale-80 hover:bg-gradient-to-r hover:from-orange-200 hover:to-white text-dark m-4 border-slate-400 border rounded-md px-8 py-2.5 mx-auto">
      <Link
        href={`/events/${eventData.id}`}
        className="rounded-md text-dark flex-shrink-0 scroll-snap-card p-4"
      >
        <div>
          <div className="h-40 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:filter-none shadow-lg m-auto"
              src={eventData.image}
              alt="Event image"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-start h-22 w-full my-2">
            {Array.isArray(eventData?.tags) && eventData.tags.length > 0
              ? eventData.tags.map((tag) => <Tag text={tag} key={tag} />)
              : null}
          </div>

          <p className="my-2">
            {new Date(eventData.date).toDateString()} | {eventData.time}
          </p>
          <p>{eventData.location}</p>
          <h2 className="text-2xl font-bold truncate">{eventData.name}</h2>
          <div className="flex justify-between items-center mt-3">
            <h3 className="text-2xl">{eventData.artist}</h3>
            <h3 className="text-2xl">
              {eventData.price > 0
                ? `$ ${eventData.price.toLocaleString()}`
                : "FREE"}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
