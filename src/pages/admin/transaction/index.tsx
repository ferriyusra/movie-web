import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout title="Transaksi" description="Daftar Semua Transaksi" type="admin">
      <Transaction />
    </DashboardLayout>
  )
}

export default TransactionAdminPage;