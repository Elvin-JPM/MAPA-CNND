// hooks/useGetMapData.js
import { useQuery } from "@tanstack/react-query";
import { getMapData } from "../services/getRequests";
import toast from "react-hot-toast";

export default function useGetMapData() {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["map_data"],
    queryFn: getMapData,
    keepPreviousData: true,
    refetchInterval: 25 * 1000, // 30 seconds in milliseconds
    onError: (error) => {
      console.error("Error fetching map data:", error);
      toast.error("Failed to fetch map data");
    },
  });

  return { data, isLoading, isError, isSuccess, refetch };
}
