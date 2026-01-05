"use client";

import { useFooterText } from "@/contexts/FooterTextContext";
import { useUser } from "@/hooks/useUser";
import { useVinylCollection } from "@/hooks/useVinylCollection";
import { createClient } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import NavButton from "./NavButton";

export default function LayoutRight() {
  const router = useRouter();
  const supabase = createClient();
  const pathname = usePathname();
  const { setEnableFooterInput } = useFooterText();
  const { data: user } = useUser();
  const { data: vinylData } = useVinylCollection();
  const totalAlbums = vinylData?.length || 0;

  const allGenres =
    vinylData
      ?.flatMap((vinyls) => vinyls.styles)
      ?.reduce((acc, style) => {
        acc[style] = (acc[style] || 0) + 1;
        return acc;
      }, {}) || {};
  const topGenre = (Object.entries(allGenres) as [string, number][]).sort(
    (a, b) => b[1] - a[1]
  )?.[0]?.[0];
  const allArtists =
    vinylData
      ?.flatMap((vinyls) => vinyls.artist)
      ?.reduce((acc, artist) => {
        acc[artist] = (acc[artist] || 0) + 1;
        return acc;
      }, {}) || {};
  const topArtist = (Object.entries(allArtists) as [string, number][]).sort(
    (a, b) => b[1] - a[1]
  )?.[0]?.[0];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    setEnableFooterInput(false);
  };

  const handleAdd = async () => {
    router.push("/add");
    setEnableFooterInput(false);
  };

  const handleView = async () => {
    router.push("/collection");
    setEnableFooterInput(false);
  };

  const handleAI = async () => {
    router.push("/ai");
    setEnableFooterInput(false);
  };

  return (
    <aside className="overflow-y-auto px-4 pb-4 flex flex-col gap-4 bg-green-200">
      <div className="border-4 rounded-lg border-gray-700 w-full h-full">
        <div className="border rounded-lg border-gray-300 w-full h-full">
          <div className="rounded bg-gray-900 text-green-100 p-8 w-full h-full">
            <div className="flex flex-col items-center">
              <div>profile pic goes here</div>
              <p>{user?.user_metadata.display_name}</p>
            </div>
            <p>Collection total: {totalAlbums}</p>
            <p>Top genre: {topGenre}</p>
            <p>Top artist: {topArtist}</p>
          </div>
        </div>
      </div>
      <div className="border-2 rounded-lg py-4 pl-4 pr-5 grid grid-cols-2 gap-4 mx-10 mt-10 mb-2">
        <NavButton
          handleOnClick={handleView}
          isCurrentPathname={pathname === "/collection"}
          label="View"
        />
        <NavButton
          handleOnClick={handleAdd}
          isCurrentPathname={pathname === "/add"}
          label="Add"
        />
        <NavButton
          handleOnClick={handleAI}
          isCurrentPathname={pathname === "/ai"}
          label="AI"
        />
        <NavButton handleOnClick={handleLogout} label="Logout" />
      </div>
    </aside>
  );
}
