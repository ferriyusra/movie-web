import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Kategori"
      description="Daftar Semua Kategori, tambah Kategori dan atur Kategori yang tersedia."
      type="admin">
      <Category />
    </DashboardLayout>
  )
}

export default AdminCategoryPage;