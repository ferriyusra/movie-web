import DataTable from "@/components/ui/DataTable";
import {
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useTransaction from "./useTransaction";
import { convertIDR } from "@/utils/currency";

const Category = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataTransactions,
    isRefetchingTransactions,
    isLoadingTransactions,
    refetchTransactions,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={cellValue === "completed" ? "success" : cellValue === "pending" ? "warning" : "danger"
              }
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          )
        case "total":
          return convertIDR(Number(cellValue))
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/member/transaction/${transaction._id}`)}
              hideButtonDelete
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          columns={COLUMN_LISTS_TRANSACTION}
          emptyContent="Transaksi kosong"
          renderCell={renderCell}
          totalPages={dataTransactions?.pagination.totalPages}
          data={dataTransactions?.data || []}
        />
      )}
    </section>
  );
};

export default Category;
