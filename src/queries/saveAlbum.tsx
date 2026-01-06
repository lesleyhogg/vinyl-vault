import { createClient } from "@/lib/supabase";

export async function saveAlbumToCollection(albumData: any, userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("vinyls").insert({
    user_id: userId,
    title: albumData.title,
    artist: albumData.artists_sort,
    release_date: albumData.release_formatted,
    styles: albumData.styles,
    catalog_number: albumData.id,
    cover_image_url: albumData.images?.[0]?.uri,
    tracklist: albumData.tracklist, // jsonb
    variant: albumData.formats?.[0]?.text || "black",
    country: albumData.country,
  });

  if (error) throw error;
  return data;
}
