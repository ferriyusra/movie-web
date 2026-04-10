import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SeatGrid from "../SeatGrid";
import { ISeat } from "@/types/Theater";

const mockSeats: ISeat[] = [
  { id: "1", row: "A", number: 1, label: "A1", type: "standard", status: "available" },
  { id: "2", row: "A", number: 2, label: "A2", type: "standard", status: "available" },
  { id: "3", row: "B", number: 1, label: "B1", type: "standard", status: "available" },
  { id: "4", row: "B", number: 2, label: "B2", type: "premium", status: "reserved" },
];

describe("SeatGrid", () => {
  it("renders all seats", () => {
    render(<SeatGrid seats={mockSeats} />);
    expect(screen.getByLabelText("Seat A1")).toBeInTheDocument();
    expect(screen.getByLabelText("Seat A2")).toBeInTheDocument();
    expect(screen.getByLabelText("Seat B1")).toBeInTheDocument();
    expect(screen.getByLabelText("Seat B2")).toBeInTheDocument();
  });

  it("renders row labels", () => {
    render(<SeatGrid seats={mockSeats} />);
    expect(screen.getAllByText("A").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("B").length).toBeGreaterThanOrEqual(1);
  });

  it("shows Screen label", () => {
    render(<SeatGrid seats={mockSeats} />);
    expect(screen.getByText("Screen")).toBeInTheDocument();
  });

  it("marks reserved seats", () => {
    render(
      <SeatGrid seats={mockSeats} reservedSeatIds={new Set(["1"])} />,
    );
    expect(
      screen.getByLabelText("Seat A1 (reserved)"),
    ).toBeInTheDocument();
  });

  it("marks selected seats", () => {
    render(
      <SeatGrid seats={mockSeats} selectedSeatIds={new Set(["2"])} />,
    );
    expect(
      screen.getByLabelText("Seat A2 (selected)"),
    ).toBeInTheDocument();
  });

  it("calls onSeatClick when interactive", () => {
    const handleClick = vi.fn();
    render(
      <SeatGrid
        seats={mockSeats}
        interactive
        onSeatClick={handleClick}
      />,
    );
    fireEvent.click(screen.getByLabelText("Seat A1"));
    expect(handleClick).toHaveBeenCalledWith(mockSeats[0]);
  });

  it("does not call onSeatClick for reserved seats", () => {
    const handleClick = vi.fn();
    render(
      <SeatGrid
        seats={mockSeats}
        interactive
        reservedSeatIds={new Set(["1"])}
        onSeatClick={handleClick}
      />,
    );
    fireEvent.click(screen.getByLabelText("Seat A1 (reserved)"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows legend when interactive", () => {
    render(<SeatGrid seats={mockSeats} interactive />);
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getByText("Reserved")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });
});
