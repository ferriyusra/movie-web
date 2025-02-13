import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const DetailTransactionMemberPage = () => {
  return (
    <DashboardLayout title="Detail Transaction" description="Information for spesific Detail Transaction" type="member">
      <DetailTransaction />
    </DashboardLayout>
  )
}

export default DetailTransactionMemberPage;