import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Acara"
      description="Daftar Semua Acara, tambah Acara dan atur Acara yang tersedia."
      type="admin">
      <Event />
    </DashboardLayout>
  )
}

export default AdminEventPage;