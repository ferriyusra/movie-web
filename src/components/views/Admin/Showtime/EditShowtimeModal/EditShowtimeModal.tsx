import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useContext, useEffect } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import showtimeServices from "@/services/showtime.service";
import movieServices from "@/services/movie.service";
import theaterServices from "@/services/theater.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IMovie } from "@/types/Movie";
import { ITheater } from "@/types/Theater";

const showtimeSchema = yup.object().shape({
  movieId: yup.string().required("Select a movie"),
  theaterId: yup.string().required("Select a theater"),
  startTime: yup.string().required("Start time is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive()
    .required("Price is required"),
});

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  showtimeId: string;
  refetchShowtimes: () => void;
}

const EditShowtimeModal = ({
  isOpen,
  onClose,
  showtimeId,
  refetchShowtimes,
}: PropTypes) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(showtimeSchema),
    defaultValues: { movieId: "", theaterId: "", startTime: "", price: 0 },
  });

  const { data: showtime } = useQuery({
    queryKey: ["EditShowtime", showtimeId],
    queryFn: async () => {
      const { data } = await showtimeServices.getShowtimeById(showtimeId);
      return data.data;
    },
    enabled: isOpen && !!showtimeId,
  });

  useEffect(() => {
    if (showtime) {
      setValue("movieId", showtime.movieId || "");
      setValue("theaterId", showtime.theaterId || "");
      if (showtime.startTime) {
        try {
          const dt = new Date(showtime.startTime);
          const local = new Date(
            dt.getTime() - dt.getTimezoneOffset() * 60000,
          );
          setValue("startTime", local.toISOString().slice(0, 16));
        } catch {
          setValue("startTime", "");
        }
      }
      setValue("price", showtime.price || 0);
    }
  }, [showtime, setValue]);

  const { data: movies } = useQuery({
    queryKey: ["AllMovies"],
    queryFn: async () => {
      const { data } = await movieServices.getMovies("limit=100&page=1");
      return data.data as IMovie[];
    },
    enabled: isOpen,
  });

  const { data: theaters } = useQuery({
    queryKey: ["AllTheaters"],
    queryFn: async () => {
      const { data } = await theaterServices.getTheaters();
      return data.data as ITheater[];
    },
    enabled: isOpen,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      movieId: string;
      theaterId: string;
      startTime: string;
      price: number;
    }) =>
      showtimeServices.updateShowtime(showtimeId, {
        ...data,
        startTime: new Date(data.startTime).toISOString(),
      }),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      reset();
      onClose();
      refetchShowtimes();
      setToaster({ type: "success", message: "Showtime updated!" });
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <ModalContent>
          <ModalHeader>Edit Showtime</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Controller
              name="movieId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Movie"
                  variant="bordered"
                  selectedKeys={field.value ? [field.value] : []}
                  onChange={(e) => field.onChange(e.target.value)}
                  isInvalid={!!errors.movieId}
                  errorMessage={errors.movieId?.message}
                >
                  {(movies || []).map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.title}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="theaterId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Theater"
                  variant="bordered"
                  selectedKeys={field.value ? [field.value] : []}
                  onChange={(e) => field.onChange(e.target.value)}
                  isInvalid={!!errors.theaterId}
                  errorMessage={errors.theaterId?.message}
                >
                  {(theaters || []).map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="datetime-local"
                  label="Start Time"
                  variant="bordered"
                  placeholder=" "
                  isInvalid={!!errors.startTime}
                  errorMessage={errors.startTime?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Price"
                  variant="bordered"
                  value={String(field.value)}
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button color="danger" type="submit" isDisabled={isPending}>
              {isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditShowtimeModal;
