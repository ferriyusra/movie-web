import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    showLimit = true,
    showSearch = true,
    totalPages,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-3 lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-xs"
            placeholder="Search..."
            size="sm"
            radius="lg"
            startContent={
              <FaMagnifyingGlass className="text-xs text-default-400" />
            }
            classNames={{
              inputWrapper: "bg-default-100 border-0 h-9",
            }}
            onClear={handleClearSearch}
            onChange={handleSearch}
          />
        )}
        {buttonTopContentLabel && (
          <Button
            color="danger"
            size="sm"
            onPress={onClickButtonTopContent}
            startContent={<FaPlus className="text-xs" />}
            className="font-medium"
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            disallowEmptySelection
            className="hidden max-w-36 lg:block"
            size="sm"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={
              <p className="text-xs text-default-400">Show:</p>
            }
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
            size="sm"
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn(
          "border border-default-100 shadow-none bg-white",
          { "overflow-x-hidden": isLoading },
        ),
        th: "bg-default-50 text-default-500 text-xs font-semibold uppercase tracking-wider",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
