import { Card, CardBody, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import authServices from "@/services/auth.service";

const Profile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      const { data } = await authServices.getProfile();
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (!profile) {
    return <p className="text-default-400">Unable to load profile.</p>;
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardBody className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div>
          <p className="text-sm text-default-400">Name</p>
          <p className="font-medium">{profile.name}</p>
        </div>
        <div>
          <p className="text-sm text-default-400">Email</p>
          <p className="font-medium">{profile.email}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Profile;
