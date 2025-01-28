import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {

  const { onPressButtonDetail, onPressButtonDelete } = props

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="detail-event-button"
          onPress={onPressButtonDetail}
        >
          Detail
        </DropdownItem>
        <DropdownItem
          key="delete-event"
          onPress={onPressButtonDelete}
          className="text-danger-500"
        >
          Hapus
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownAction