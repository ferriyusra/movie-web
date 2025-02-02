import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  price: yup.string().min(1, "Harga tiket minimal 1").required("Mohon masukkan harga tiket"),
  quantity: yup.string().min(1, "Stok tiket minimal 1").required("Mohon masukkan harga tiket"),
  name: yup.string().required("Mohon masukkan nama tiket"),
  description: yup.string().required("Mohon masukkan deskripsi tiket"),
});

const useAddTicketModal = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingMutateAddTicket,
    isSuccess: isSuccessMutateAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Tiket berhasil ditambahkan!",
      });
      reset();
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`
    data.price = Number(data.price)
    data.quantity = Number(data.quantity)
    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  };
};

export default useAddTicketModal;
