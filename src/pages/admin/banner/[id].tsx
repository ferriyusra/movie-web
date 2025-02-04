import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/DetailBanner";

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="Detail spanduk"
      description="Atur spanduk yang tersedia."
      type="admin">
      <DetailBanner />
    </DashboardLayout>
  )
}

export default AdminDetailBannerPage;