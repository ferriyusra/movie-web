import { Button } from "@nextui-org/react";
import router, { useRouter } from "next/router";
import Image from "next/image";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady])

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-danger-500 capitalize">
          Transaction {status}
        </h1>
        <p className="text-xl font-bold text-default-500 capitalize">
          {status === "success"
            ? "Yeay, kamu telah berhasil melakukan pembayaran di Acara"
            : "Ups, pembayaran kamu gagal"}
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onPress={() => router.push(`/member/transaction/${order_id}`)}
        >
          Cek transaksi kamu yuk !
        </Button>
      </div>
    </div>
  );
};

export default Payment;
