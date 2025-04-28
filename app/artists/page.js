import ArtistCard from "@/components/ArtistCard";

async function fetchArtists(){
    const response = await fetch("https://qevent-backend.labs.crio.do/artists");
    return response.json();
}

export default async function ArtistsPage(){
const artistData = await fetchArtists();
    return(
        <div className="w-full p-5 grid md:grid-cols-4 gap-8 my-3">
           {artistData.map((list)=>(
            <ArtistCard key={list.id} artistData={list}/>
           ))}
        </div>
    )
}