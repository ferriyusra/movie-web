import { useContext, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import genreServices from "@/services/genre.service";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const movieFormSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  posterUrl: yup.string().required("Poster URL is required"),
  durationMin: yup
    .number()
    .typeError("Duration must be a number")
    .positive("Duration must be positive")
    .required("Duration is required"),
  language: yup.string().required("Language is required"),
  releaseDate: yup.string().required("Release date is required"),
  genreIds: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one genre")
    .required("Select at least one genre"),
});

interface Props {
  movieId?: string;
}

const useMovieForm = ({ movieId }: Props) => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const isEdit = !!movieId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(movieFormSchema),
    defaultValues: {
      title: "",
      description: "",
      posterUrl: "",
      durationMin: 0,
      language: "",
      releaseDate: "",
      genreIds: [] as string[],
    },
  });

  const { data: dataGenres } = useQuery({
    queryKey: ["Genres"],
    queryFn: async () => {
      const { data } = await genreServices.getGenres();
      return data.data;
    },
  });

  const { data: dataMovie } = useQuery({
    queryKey: ["Movie", movieId],
    queryFn: async () => {
      const { data } = await movieServices.getMovieById(movieId as string);
      return data.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (dataMovie) {
      setValue("title", dataMovie.title);
      setValue("description", dataMovie.description);
      setValue("posterUrl", dataMovie.posterUrl);
      setValue("durationMin", dataMovie.durationMin);
      setValue("language", dataMovie.language);
      setValue(
        "releaseDate",
        dataMovie.releaseDate
          ? new Date(dataMovie.releaseDate).toISOString().split("T")[0]
          : "",
      );
      setValue(
        "genreIds",
        dataMovie.genres?.map((g: { id: string }) => g.id) || [],
      );
    }
  }, [dataMovie]);

  const { mutate: mutateSave, isPending: isPendingSave } = useMutation({
    mutationFn: async (payload: {
      title: string;
      description: string;
      posterUrl: string;
      durationMin: number;
      language: string;
      releaseDate: string;
      genreIds: string[];
    }) => {
      if (isEdit) {
        return movieServices.updateMovie(movieId, payload);
      }
      return movieServices.addMovie(payload);
    },
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: isEdit
          ? "Movie updated successfully!"
          : "Movie created successfully!",
      });
      router.push("/admin/movies");
    },
  });

  const handleSave = (data: {
    title: string;
    description: string;
    posterUrl: string;
    durationMin: number;
    language: string;
    releaseDate: string;
    genreIds: string[];
  }) => mutateSave(data);

  return {
    control,
    handleSubmit,
    handleSave,
    isPendingSave,
    errors,
    dataGenres: dataGenres || [],
    isEdit,
  };
};

export default useMovieForm;
