import { Avatar, Button, Card, CardBody, Divider, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import authServices from "@/services/auth.service";
import {
  FaUser,
  FaEnvelope,
  FaArrowRightFromBracket,
} from "react-icons/fa6";

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
    <div className="mx-auto max-w-lg">
      {/* Avatar header */}
      <div className="mb-6 flex flex-col items-center gap-3">
        <Avatar
          size="lg"
          showFallback
          name={profile.name?.charAt(0).toUpperCase()}
          classNames={{
            base: "h-20 w-20 bg-danger-100 text-danger-600 text-2xl",
          }}
        />
        <div className="text-center">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-default-400">{profile.email}</p>
        </div>
      </div>

      {/* Info card */}
      <Card className="border border-default-100">
        <CardBody className="flex flex-col gap-0 p-0">
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-default-100">
              <FaUser className="text-sm text-default-500" />
            </div>
            <div>
              <p className="text-xs text-default-400">Full Name</p>
              <p className="text-sm font-medium">{profile.name}</p>
            </div>
          </div>
          <Divider />
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-default-100">
              <FaEnvelope className="text-sm text-default-500" />
            </div>
            <div>
              <p className="text-xs text-default-400">Email Address</p>
              <p className="text-sm font-medium">{profile.email}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Actions */}
      <div className="mt-6">
        <Button
          color="danger"
          variant="flat"
          fullWidth
          startContent={<FaArrowRightFromBracket />}
          onPress={() => signOut()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
