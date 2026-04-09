import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import genreServices from "@/services/genre.service";
import { ToasterContext } from "@/contexts/ToasterContext";

interface Props {
  onClose: () => void;
  genreId: string;
  refetchGenres: () => void;
}

const useDeleteGenreModal = ({ onClose, genreId, refetchGenres }: Props) => {
  const { setToaster } = useContext(ToasterContext);

  const deleteGenre = async () => {
    const result = await genreServices.deleteGenre(genreId);
    return result;
  };

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteGenre,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      onClose();
      refetchGenres();
      setToaster({ type: "success", message: "Genre deleted successfully!" });
    },
  });

  const handleDelete = () => mutateDelete();

  return { handleDelete, isPendingDelete };
};

export default useDeleteGenreModal;
