import { useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import genreServices from "@/services/genre.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const addGenreSchema = yup.object().shape({
  name: yup.string().required("Genre name is required"),
});

interface Props {
  onClose: () => void;
  refetchGenres: () => void;
}

const useAddGenreModal = ({ onClose, refetchGenres }: Props) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addGenreSchema),
  });

  const addGenre = async (payload: { name: string }) => {
    const result = await genreServices.addGenre(payload);
    return result;
  };

  const { mutate: mutateAdd, isPending: isPendingAdd } = useMutation({
    mutationFn: addGenre,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      reset();
      onClose();
      refetchGenres();
      setToaster({ type: "success", message: "Genre added successfully!" });
    },
  });

  const handleAdd = (data: { name: string }) => mutateAdd(data);

  return { control, handleSubmit, handleAdd, isPendingAdd, errors, reset };
};

export default useAddGenreModal;
