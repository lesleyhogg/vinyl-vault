"use client";

import { useVinylCollection } from "@/hooks/useVinylCollection";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function AlbumDetails() {
  const params = useParams();
  const albumID = params.id;
  const { data: vinylData } = useVinylCollection();
  const album = vinylData?.find((vinyl) => vinyl.id === albumID);

  if (!album) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-1 items-center p-8">
      <Image
        src={album?.cover_image_url}
        alt={album.title}
        width={100}
        height={100}
        className="w-60 h-60 inline-block mr-4"
      />
      <div className="flex flex-col">
        <p className="text-3xl font-semibold text-center">{album.title}</p>
        <p className="text-xl font-semibold text-center">{album.artist}</p>
      </div>
      <div className="flex flex-row gap-4">
        <p>
          <span className="font-semibold">genre(s):</span>&nbsp;
          {album.styles.join(", ")}
        </p>
        <p>
          <span className="font-semibold">release date:</span>&nbsp;
          {album.release_date ?? "none entered"}
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <p>
          <span className="font-semibold">release country:</span>&nbsp;
          {album.country}
        </p>
        <p>
          <span className="font-semibold">variant:</span>&nbsp;{album.variant}
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <p>
          <span className="font-semibold">condition:</span>&nbsp;
          {album.condition}
        </p>
        <p>
          <span className="font-semibold">discogs catalog number:</span>&nbsp;
          {album.catalog_number}
        </p>
      </div>
      <p>
        <span className="font-semibold">notes:</span>&nbsp;
        {album.notes ?? "none"}
      </p>
      <ol type="1" className="list-decimal pl-5 space-y-1">
        {album.tracklist.map((track) => (
          <li key={track.title}>
            <div className="flex flex-row justify-between gap-2">
              <span>{track.title}</span>
              <span>{track.duration}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
