import Tag from "../../components/Tag";

async function tagData() {
  const response = await fetch("https://qevent-backend.labs.crio.do/tags");
  return response.json();
}

export default async function TagsPage() {
  const addTags = await tagData();
  return (
    <div className="w-[90%] mx-auto my-8 flex flex-wrap gap-4 items-center justify-center">
    {addTags.map((list) => (
      <Tag key={list.id} text={list.name} />
    ))}
  </div>
  
  );
}
