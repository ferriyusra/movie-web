interface ISeat {
  id: string;
  row: string;
  number: number;
  label: string;
  type: "standard" | "vip" | "accessible";
}

interface ITheater {
  id: string;
  name: string;
  location: string;
  totalSeats: number;
  rows: number;
  seatsPerRow: number;
}

interface ITheaterDetail extends ITheater {
  seats: ISeat[];
}

interface ITheaterForm {
  name: string;
  location: string;
  rows: number;
  seatsPerRow: number;
}

export type { ISeat, ITheater, ITheaterDetail, ITheaterForm };
