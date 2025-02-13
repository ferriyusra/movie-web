import { Tabs, Tab } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import ImageTab from "./ImageTab";

const DetailBanner = () => {
  const {
    dataBanner,
    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = useDetailBanner();

  return (
    <Tabs aria-label="Options">
      <Tab key="image" title="gambar">
        <ImageTab
          currentImage={dataBanner?.image}
          onUpdate={handleUpdateBanner}
          isPendingUpdate={isPendingMutateUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
        />
      </Tab>
      <Tab key="info" title="info">
        <InfoTab
          dataBanner={dataBanner}
          onUpdate={handleUpdateBanner}
          isPendingUpdate={isPendingMutateUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
