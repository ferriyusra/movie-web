import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Spanduk"
      description="Daftar Semua Spanduk, tambah spanduk dan atur spanduk yang tersedia."
      type="admin">
      <Banner />
    </DashboardLayout>
  )
}

export default AdminBannerPage;