import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="Detail spanduk"
      description="Atur spanduk yang tersedia."
      type="admin">
      <DetailCategory />
    </DashboardLayout>
  )
}

export default AdminDetailBannerPage;