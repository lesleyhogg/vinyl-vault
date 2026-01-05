import Image from "next/image";

export interface AlbumDetailsProps {
  data: {
    artists_sort: string;
    title: string;
    styles: string[];
    released_formatted: string;
    country: string;
    images: {
      resource_url: string;
      height: number;
      width: number;
    }[];
    formats: {
      text: string;
    }[];
  };
  isLoading: boolean;
  error: Error | null;
}

export default function AlbumDetails({
  data,
  isLoading,
  error,
}: AlbumDetailsProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error loading album data!</div>;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <Image
        src={data?.images[0]?.resource_url}
        alt={data.title}
        width={data.images[0].width}
        height={data.images[0].height}
        className="w-60 h-60 inline-block mr-4"
      />
      <p className="text-3xl font-semibold">{data.title}</p>
      <p className="text-xl font-semibold">{data.artists_sort}</p>
      <p>genre(s): {data.styles.join(", ")}</p>
      <p>release date: {data.released_formatted}</p>
      <p>release country: {data.country}</p>
      <p>variant: {data.formats[0].text || "black"}</p>
    </div>
  );
}
