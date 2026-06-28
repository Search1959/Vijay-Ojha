export interface CandidateInfo {
  name: string;
  party: string;
  constituency: string;
  constituencyNo: number;
  district: string;
  parliamentaryConstituency: string;
  electionYear: number;
  votesReceived: number;
  votePercentage: number;
  margin: number;
  runnerUp: string;
  runnerUpParty: string;
  runnerUpVotes: number;
  runnerUpPercentage: number;
  age: number;
  profession: string;
  education: string;
  assets: string;
  liabilities: string;
  criminalCases: number;
  bio: string;
}

export interface CitizenMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  ward: string;
  messageType: 'grievance' | 'suggestion' | 'appreciation' | 'other';
  subject: string;
  content: string;
  timestamp: string;
  status: 'pending' | 'reviewed';
}

export interface CustomMedia {
  profilePicUrl: string | null;
  campVideoUrl: string | null;
  banner1Url: string | null;
  banner2Url: string | null;
  facebookBannerUrl: string | null;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'Infrastructure' | 'Health' | 'Heritage' | 'Civic';
  date: string;
  location: string;
}

