import { DELAY, PAGE_DEFAULT, LIMIT_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import movieServices from "@/services/movie.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const router = useRouter();
  const { status } = useSession();
  const [search, setSearch] = useState("");
  const debounce = useDebounce();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: status === "authenticated",
  });

  const getMoviesSearch = async () => {
    const params = `title=${search}&limit=${LIMIT_DEFAULT}&page=${PAGE_DEFAULT}`;
    const res = await movieServices.getMovies(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataMoviesSearch,
    isLoading: isLoadingMoviesSearch,
    isRefetching: isRefetchingMoviesSearch,
  } = useQuery({
    queryKey: ["MoviesSearch", search],
    queryFn: getMoviesSearch,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,
    dataMoviesSearch,
    isLoadingMoviesSearch,
    isRefetchingMoviesSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useLandingPageLayoutNavbar;
