"use client";

import { useFooterText } from "@/contexts/FooterTextContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export type DiscogSearchResult = {
  id: string;
  cover_image: string;
  thumb: string;
  title: string;
  year: string;
  label: string;
  country: string;
};

async function searchDiscogs(query: string) {
  const response = await fetch(
    `/api/discogs/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Search failed");
  return response.json();
}

export default function AddRecord() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { setFooterText, setEnableFooterInput } = useFooterText();

  const { data, isLoading, error } = useQuery({
    queryKey: ["discogs", debouncedQuery],
    queryFn: () => searchDiscogs(debouncedQuery),
    enabled: debouncedQuery.length > 2,
  });
  console.log("data?.results", data?.results);
  const handleSearch = () => {
    setDebouncedQuery(searchQuery);
  };

  useEffect(() => {
    setFooterText("Search and add vinyl records");
  }, [setFooterText]);

  const handleAddAlbum = (title: string) => {
    setFooterText(`Add ${title} to your collection?`);
    setEnableFooterInput(true);
  };

  return (
    <div className="p-8">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search by band name, album name, and/or year"
        className="border p-2 rounded w-80"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

      {isLoading && <p>Searching...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="grid grid-cols-2 gap-2 mt-4 space-y-2">
        {data?.results?.map((album: DiscogSearchResult) => (
          <div
            key={album.id}
            className="border p-4 rounded flex flex-row"
            onClick={() => handleAddAlbum(album.title)}
          >
            {album.thumb ? (
              <Image
                src={album.thumb}
                alt={album.title}
                width={48}
                height={48}
                className="w-24 h-24 inline-block mr-4"
              />
            ) : (
              <div className="w-24 h-24 inline-block mr-4" />
            )}
            <div className="inline-block">
              <p className="font-bold">{album.title}</p>
              <p className="text-sm text-gray-600">
                {album.year} • {album.label?.[0]} • {album.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
