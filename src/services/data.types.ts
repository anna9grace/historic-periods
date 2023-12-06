export enum CulturalSpheres {
  MUSIC = "Музыка",
  CINEMA = "Кино",
  LITERATURE = "Литература",
  THEATER = "Театр",
  SOCIETY = "Общество",
  SCIENCE = "Наука",
}

export interface IHistoricalEvent {
  year: number;
  description: string;
}

export interface IHistoricalPeriod {
  id: number;
  start: number;
  end: number;
  sphere: CulturalSpheres;
  events: IHistoricalEvent[];
}

export type IHistoricalData = Record<number, IHistoricalPeriod>;
