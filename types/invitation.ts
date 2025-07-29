export interface Organiser {
  name: string;
  imageUrl?: string;
}

export interface Invitation {
  id?: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  receptionStartTime: string;
  venueName: string;
  venueAddress: string;
  venueUrl?: string;
  mapEmbedUrl?: string;
  nearestStation?: string;
  deadline: string;
  schoolName: string;
  graduationYear: string;
  fee: number;
  description: string;
  remarks: string;
  creatorId: string;
  organiserName: string;
  organiserImageUrl?: string;
  organisers?: Organiser[];
  showSagiExplanation?: boolean;
  showAttendeeCount?: boolean;
}

export interface Countdown {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}