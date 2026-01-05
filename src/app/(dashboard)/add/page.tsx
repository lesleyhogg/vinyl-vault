"use client";

import { useFooterText } from "@/contexts/FooterTextContext";
import { useUser } from "@/hooks/useUser";
import { saveAlbumToCollection } from "@/queries/saveAlbum";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import AlbumDetails from "../_components/AlbumDetails";

export type DiscogSearchResult = {
  id: string;
  master_id: string;
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

async function getReleaseDetails(id: string) {
  const response = await fetch(`/api/discogs/releases/${id}`);
  if (!response.ok) throw new Error("Failed to fetch release details");
  return response.json();
}

export default function AddRecord() {
  const [searchQuery, setSearchQuery] = useState("");
  const [albumID, setAlbumID] = useState("");
  const { setFooterText, setEnableFooterInput } = useFooterText();
  const { data: user } = useUser();

  const {
    data: allAlbumsData,
    mutate: fetchAllAlbums,
    isPending: isLoadingAllAlbums,
    error: errorAllAlbums,
    reset: resetAllAlbums,
  } = useMutation({
    mutationFn: (query: string) => searchDiscogs(query),
  });

  const {
    data: albumData,
    mutate: fetchAlbumDetails,
    isPending: isLoadingAlbum,
    error: errorAlbum,
  } = useMutation({
    mutationFn: (id: string) => getReleaseDetails(id),
  });

  const { mutate: saveAlbum, isPending: isSaving } = useMutation({
    mutationFn: () => saveAlbumToCollection(albumData, user!.id),
    onSuccess: () => {
      setFooterText("Album added to your collection!");
      setAlbumID("");
      setSearchQuery("");
      resetAllAlbums();
    },
    onError: (e) => console.log(e),
  });

  const handleSearch = () => {
    setAlbumID("");
    setFooterText(`Searching albums...`);
    setEnableFooterInput(false);
    fetchAllAlbums(searchQuery);
  };

  useEffect(() => {
    setFooterText("Search and add vinyl records");
  }, [setFooterText]);

  const handleOpenAlbum = (id: string, title: string) => {
    setAlbumID(id);
    fetchAlbumDetails(id);
    setFooterText(`Add ${title} to your collection?`);
    setEnableFooterInput(true);
  };

  const handleAddAlbum = () => {
    saveAlbum();
  };

  return (
    <div className="p-8">
      <div className="flex flex-row mb-4">
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
      </div>

      {isLoadingAllAlbums && <p>Searching...</p>}
      {errorAllAlbums && <p>Error: {errorAllAlbums.message}</p>}

      {albumID ? (
        <div className="flex flex-col gap-2">
          <AlbumDetails
            data={albumData}
            isLoading={isLoadingAlbum}
            error={errorAlbum}
          />
          {!isLoadingAlbum && (
            <button
              onClick={handleAddAlbum}
              className="self-center px-5 py-4 bg-green-100 border border-black rounded-lg"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Add to collection"}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4 space-y-2">
          {allAlbumsData?.results?.map((album: DiscogSearchResult) => (
            <div
              key={album.id}
              className="border p-4 rounded flex flex-row"
              onClick={() => handleOpenAlbum(album.id, album.title)}
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
      )}
    </div>
  );
}
