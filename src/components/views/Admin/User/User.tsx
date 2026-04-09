import { Key, useCallback, useContext } from "react";
import { Button, Spinner } from "@heroui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_USER } from "./User.constants";
import userServices from "@/services/user.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const AdminUser = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AdminUsers"],
    queryFn: async () => {
      const { data } = await userServices.getUsers();
      return data.data;
    },
  });

  const { mutate: mutatePromote, isPending: isPendingPromote } = useMutation({
    mutationFn: (userId: string) => userServices.promoteUser(userId),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      refetch();
      setToaster({ type: "success", message: "User promoted to admin!" });
    },
  });

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return <p className="font-medium">{item.name as string}</p>;
        case "email":
          return <p className="text-sm">{item.email as string}</p>;
        case "actions":
          return (
            <Button
              size="sm"
              color="warning"
              variant="flat"
              onPress={() => mutatePromote(item.id as string)}
              isDisabled={isPendingPromote}
            >
              {isPendingPromote ? (
                <Spinner size="sm" />
              ) : (
                "Promote to Admin"
              )}
            </Button>
          );
        default:
          return null;
      }
    },
    [isPendingPromote],
  );

  return (
    <section>
      <DataTable
        columns={COLUMN_LISTS_USER}
        data={users || []}
        emptyContent="No users found"
        isLoading={isLoading}
        renderCell={renderCell}
        totalPages={1}
        showSearch={false}
        showLimit={false}
      />
    </section>
  );
};

export default AdminUser;
