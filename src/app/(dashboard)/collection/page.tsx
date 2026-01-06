"use client";

import { useFooterText } from "@/contexts/FooterTextContext";
import { useVinylCollection } from "@/hooks/useVinylCollection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Collection() {
  const router = useRouter();
  const { setFooterText } = useFooterText();
  const { data: vinylData, isLoading } = useVinylCollection();

  const handleOpenAlbum = (id: string) => {
    router.push(`/${id}`);
  };

  useEffect(() => {
    if (isLoading) {
      return setFooterText("Loading...");
    }
    setFooterText(
      vinylData && !isLoading
        ? "Welcome to your vinyl collection! Click on an album to see details."
        : "Add an album to begin!"
    );
  }, [setFooterText, vinylData, isLoading]);

  if (!vinylData) {
    return (
      <div className="p-10">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl mb-4">My vinyl collection</h1>
          <p className="mb-4">{isLoading ? "Loading..." : "Nothing yet!"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-2xl mb-4">My vinyl collection</h1>
        <div className="flex flex-row flex-wrap gap-4 overflow-visible">
          {vinylData.map((album) => (
            <div
              key={album.id}
              className="w-44 h-44 hover:cursor-pointer hover:scale-110 hover:z-10 transition-transform"
              onClick={() => handleOpenAlbum(album.id)}
            >
              <Image
                src={album.cover_image_url}
                alt={album.title}
                width={100}
                height={100}
                className="w-44 h-44"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
