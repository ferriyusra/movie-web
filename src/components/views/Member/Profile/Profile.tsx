import { Tabs, Tab } from "@heroui/react";
import PictureTab from "./PictureTab";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();

  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Foto Profil">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="info" title="Info Akun">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="security" title="Kata Sandi">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
};

export default Profile;
