// hooks/useVinylCollection.ts
import { createClient } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useVinylCollection() {
  return useQuery({
    queryKey: ["vinyl-collection"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("vinyls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
