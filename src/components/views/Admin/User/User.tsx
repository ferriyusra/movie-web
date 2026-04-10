import { Key, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_USER } from "./User.constants";
import userServices from "@/services/user.service";

const AdminUser = () => {
  const {
    data: users,
    isLoading,
  } = useQuery({
    queryKey: ["AdminUsers"],
    queryFn: async () => {
      const { data } = await userServices.getUsers();
      return data.data;
    },
  });

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return <p className="font-medium">{item.name as string}</p>;
        case "email":
          return <p className="text-sm">{item.email as string}</p>;
        default:
          return null;
      }
    },
    [],
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
