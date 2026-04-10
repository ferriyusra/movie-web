import { cn } from "@/utils/cn";
import { ISeat } from "@/types/Theater";

interface PropTypes {
  seats: ISeat[];
  selectedSeatIds?: Set<string>;
  reservedSeatIds?: Set<string>;
  onSeatClick?: (seat: ISeat) => void;
  interactive?: boolean;
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
    <div className="flex flex-col items-center gap-3">
      {/* Screen */}
      <div className="relative mb-6 w-4/5 max-w-md">
        <div className="h-2 rounded-t-full bg-gradient-to-r from-transparent via-danger-400 to-transparent opacity-60" />
        <div className="h-8 rounded-t-[50%] bg-gradient-to-b from-danger-100/40 to-transparent" />
        <p className="absolute inset-x-0 top-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-default-400">
          Screen
        </p>
      </div>

      {/* Seat rows */}
      <div className="flex flex-col gap-1.5">
        {sortedRows.map(([row, rowSeats]) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="w-5 text-right text-[11px] font-semibold text-default-400">
              {row}
            </span>
            <div className="flex gap-1.5">
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
                      title={`${seat.label} — ${seat.type}${isReserved ? " (reserved)" : ""}`}
                      aria-label={`Seat ${seat.label}${isReserved ? " (reserved)" : ""}${isSelected ? " (selected)" : ""}`}
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-t-lg text-[10px] font-semibold transition-all duration-150",
                        // Bottom "cushion" effect
                        "after:absolute after:-bottom-[3px] after:left-[2px] after:right-[2px] after:h-[3px] after:rounded-b-sm",
                        {
                          // Reserved
                          "bg-default-200 text-default-400 after:bg-default-300":
                            isReserved,
                          // Selected
                          "bg-primary-500 text-white shadow-md shadow-primary-500/30 after:bg-primary-600":
                            isSelected && !isReserved,
                          // Available + interactive
                          "bg-success-100 text-success-700 after:bg-success-200 hover:bg-success-200 hover:shadow-sm":
                            isClickable && !isSelected && !isReserved,
                          // Static (non-interactive, available)
                          "bg-default-100 text-default-500 after:bg-default-200":
                            !interactive && !isReserved && !isSelected,
                          // Premium seat accent
                          "ring-1 ring-yellow-400/40":
                            seat.type === "premium" && !isReserved && !isSelected,
                          "cursor-not-allowed": !isClickable,
                          "cursor-pointer": isClickable,
                          "scale-110": isSelected && !isReserved,
                        },
                      )}
                    >
                      {seat.number}
                    </button>
                  );
                })}
            </div>
            <span className="w-5 text-left text-[11px] font-semibold text-default-400">
              {row}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      {interactive && (
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-t-lg bg-success-100 after:mt-[1px] after:block after:h-[2px] after:rounded-b-sm after:bg-success-200" />
            <span className="text-default-500">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-t-lg bg-primary-500 after:mt-[1px] after:block after:h-[2px] after:rounded-b-sm after:bg-primary-600" />
            <span className="text-default-500">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-t-lg bg-default-200 after:mt-[1px] after:block after:h-[2px] after:rounded-b-sm after:bg-default-300" />
            <span className="text-default-500">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-t-lg bg-success-100 ring-1 ring-yellow-400/40 after:mt-[1px] after:block after:h-[2px] after:rounded-b-sm after:bg-success-200" />
            <span className="text-default-500">Premium</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatGrid;
