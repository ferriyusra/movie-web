import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="Daftar Semua Event, tambah Event dan atur Event yang tersedia."
      type="admin">
      <Event />
    </DashboardLayout>
  )
}

export default AdminEventPage;