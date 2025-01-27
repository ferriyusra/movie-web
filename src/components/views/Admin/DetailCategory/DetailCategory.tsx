import { Tabs, Tab } from "@nextui-org/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {

  const { dataCategory } = useDetailCategory()

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="icon">
        <IconTab currentIcon={dataCategory?.icon} />
      </Tab>
      <Tab key="info" title="info">
        <InfoTab dataCategory={dataCategory} />
      </Tab>
    </Tabs>
  )
}


export default DetailCategory;