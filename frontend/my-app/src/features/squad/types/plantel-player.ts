import { StaticImageData } from 'next/image';

export type PlantelPlayer = {
  id: string;
  photo: StaticImageData;
  name: string;
  preferredFoot: string;
  Position: string;
};

export type PlantelPlayerProps = {
  players: PlantelPlayer[];
};
