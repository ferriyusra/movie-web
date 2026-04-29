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
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light" radius="full">
            <FaEllipsisVertical className="text-xs text-default-500" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            if (key === "edit") onPressButtonDetail();
            if (key === "delete") onPressButtonDelete?.();
          }}
        >
          <DropdownItem
            key="edit"
            startContent={<FaPen className="text-xs text-default-400" />}
          >
            Edit
          </DropdownItem>
          {!hideButtonDelete ? (
            <DropdownItem
              key="delete"
              className="text-danger-500"
              color="danger"
              startContent={<FaTrash className="text-xs" />}
            >
              Delete
            </DropdownItem>
          ) : null}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownAction;
