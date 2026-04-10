import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { FaEllipsisVertical, FaPen, FaTrash } from "react-icons/fa6";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  hideButtonDelete?: boolean;
}

const DropdownAction = (props: PropTypes) => {
  const {
    onPressButtonDetail,
    onPressButtonDelete,
    hideButtonDelete = false,
  } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light" radius="full">
          <FaEllipsisVertical className="text-xs text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="detail"
          onPress={onPressButtonDetail}
          startContent={<FaPen className="text-xs text-default-400" />}
        >
          Edit
        </DropdownItem>
        {!hideButtonDelete ? (
          <DropdownItem
            key="delete"
            onPress={onPressButtonDelete}
            className="text-danger-500"
            color="danger"
            startContent={<FaTrash className="text-xs" />}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
