import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";

const AdminDetailEventPage = () => {
  return (
    <DashboardLayout
      title="Detail Acara"
      description="Atur Acara yang tersedia."
      type="admin">
      <DetailEvent />
    </DashboardLayout>
  )
}

export default AdminDetailEventPage;