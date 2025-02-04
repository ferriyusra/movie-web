import { DateValue } from "@nextui-org/react";

interface IRegions {
  id: string;
  name: string;
}

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFeatured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  location?: {
    address: string;
    region: string;
    coordinates: number[];
  };
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  address?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
}

export type { IEvent, IRegions, IEventForm };
