import { cn } from "@/utils/cn";
import { ISeat } from "@/types/Theater";

interface PropTypes {
  seats: ISeat[];
  selectedSeatIds?: Set<string>;
  reservedSeatIds?: Set<string>;
  onSeatClick?: (seat: ISeat) => void;
  interactive?: boolean;
  maxSelectable?: number;
}

const SeatGrid = ({
  seats,
  selectedSeatIds = new Set(),
  reservedSeatIds = new Set(),
  onSeatClick,
  interactive = false,
}: PropTypes) => {
  const rowMap = new Map<string, ISeat[]>();
  seats.forEach((seat) => {
    const existing = rowMap.get(seat.row) || [];
    existing.push(seat);
    rowMap.set(seat.row, existing);
  });

  const sortedRows = Array.from(rowMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="mb-4 w-3/4 rounded-t-xl bg-default-200 py-2 text-center text-sm font-medium text-default-600">
        SCREEN
      </div>
      <div className="flex flex-col gap-1">
        {sortedRows.map(([row, rowSeats]) => (
          <div key={row} className="flex items-center gap-1">
            <span className="w-6 text-center text-xs font-medium text-default-400">
              {row}
            </span>
            {rowSeats
              .sort((a, b) => a.number - b.number)
              .map((seat) => {
                const isSelected = selectedSeatIds.has(seat.id);
                const isReserved = reservedSeatIds.has(seat.id);
                const isClickable = interactive && !isReserved;

                return (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && onSeatClick?.(seat)}
                    title={seat.label}
                    aria-label={`Seat ${seat.label}${isReserved ? " (reserved)" : ""}${isSelected ? " (selected)" : ""}`}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium transition-colors",
                      {
                        "bg-danger-500 text-white": isReserved,
                        "bg-primary-500 text-white": isSelected && !isReserved,
                        "bg-success-100 text-success-700 hover:bg-success-200":
                          isClickable && !isSelected && !isReserved,
                        "bg-default-100 text-default-400":
                          !interactive && !isReserved && !isSelected,
                        "cursor-not-allowed": !isClickable,
                        "cursor-pointer": isClickable,
                      },
                    )}
                  >
                    {seat.number}
                  </button>
                );
              })}
          </div>
        ))}
      </div>
      {interactive && (
        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-success-100" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-primary-500" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-danger-500" />
            <span>Reserved</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatGrid;
