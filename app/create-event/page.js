"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/events");
    }
  }, [status, router]);

  const handleEventCreate = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      artist: formData.get("artist"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      tags: formData
        .get("tags")
        .split(",")
        .map((tag) => tag.trim()),
      id: crypto.randomUUID(), // random unique id
      image: "https://source.unsplash.com/random/300x300?event",
    };

    try {
      const response = await fetch(
        "https://qevent-backend.labs.crio.do/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 201) {
        alert("Event created successfully!");
        router.push("/events");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold my-20">Create New Event</h1>
      <form
        onSubmit={handleEventCreate}
        className="w-[70%] bg-white p-8 rounded-lg shadow-md space-y-4 flex flex-col justify-center items-center gap-2"
      >
        <input
          name="name"
          placeholder="Event Name"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />
        <input
          name="artist"
          placeholder="Artist Name"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />
        <input
          name="date"
          type="date"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />
        <input
          name="time"
          type="time"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />
        <input
          name="location"
          placeholder="Location"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          required
          className="w-full h-24 max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
          rows="3"
        ></textarea>
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          required
          className="w-full max-w-md border-2 border-gray-300 rounded-lg px-4 py-2 m-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-orange-400 to-teal-600 text-white font-bold py-2 px-6 rounded-md hover:opacity-80 transition"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
