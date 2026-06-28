import { CandidateInfo } from './types';

export const VIJAY_OJHA_DATA: CandidateInfo = {
  name: 'Vijay Ojha',
  party: 'Bharatiya Janata Party (BJP)',
  constituency: 'Jorasanko',
  constituencyNo: 165,
  district: 'Kolkata',
  parliamentaryConstituency: 'Kolkata Uttar',
  electionYear: 2026,
  votesReceived: 52868,
  votePercentage: 49.48,
  margin: 5797,
  runnerUp: 'Vijay Upadhyay',
  runnerUpParty: 'All India Trinamool Congress (AITC)',
  runnerUpVotes: 47071,
  runnerUpPercentage: 44.05,
  age: 52,
  profession: 'Business',
  education: '10th Pass',
  assets: '₹2.26 Crore',
  liabilities: '₹14.9 Lakh',
  criminalCases: 7,
  bio: 'Vijay Ojha is a prominent leader and active grassroots politician serving as the Member of the West Bengal Legislative Assembly (MLA) for the Jorasanko constituency. Known for his approachable nature and strong connect with the business and local communities of Kolkata, he secured a decisive victory in the 2026 Assembly Elections with 49.48% votes. Sri Ojha is highly dedicated to local development, community welfare, and healthcare accessibility.'
};

export interface CampDetail {
  title: string;
  date: string;
  time: string;
  location: string;
  chiefGuest: string;
  presidedBy: string;
  supportedBy: string[];
  aim: string;
}

export const BLOOD_DONATION_CAMP_DATA: CampDetail = {
  title: 'Voluntary Blood Donation & Health Checkup Camp',
  date: 'June 28, 2026 (Sunday)',
  time: '10:00 AM onwards',
  location: 'Vidyasagar Park premises, Sukia Street, Kolkata',
  chiefGuest: 'Sri Vijay Ojha (MLA, Jorasanko)',
  presidedBy: 'Prof. (Dr.) Subir Ganguly',
  supportedBy: [
    'We Are All Happy Club',
    'Fight Cancer',
    'Vrindavan Matri Mandir',
    'Vidyasagar Park Morning Walkers Association',
    'Milan Samiti (Hrishikesh Park)',
    'St. Paul\'s School Alumni - 1980',
    'Rotary Club of Calcutta Renaissance (RI District 3291)'
  ],
  aim: 'A critical community-driven initiative organized to address the seasonal shortage of blood reserves in Kolkata and provide free preliminary health screenings to residents of Jorasanko.'
};

export const JORASANKO_DEV_VISION = [
  {
    title: 'Heritage Preservation & Tourism',
    description: 'Jorasanko is the historic soul of North Kolkata, home to the Rabindra Bharati University (Jorasanko Thakur Bari). Our focus is conserving our cultural heritage while improving modern civic amenities.'
  },
  {
    title: 'Support for Small Businesses',
    description: 'As a trading hub, we are committed to facilitating modern market infrastructure, resolving commercial tax grievances, and easing trade regulations to help our neighborhood merchants thrive.'
  },
  {
    title: 'Healthcare Accessibility',
    description: 'Expanding public health camps, clean water access, and working directly with major state hospitals to ensure citizens get immediate, affordable healthcare and diagnostics near Sukia Street and surrounding wards.'
  },
  {
    title: 'Youth & Sports Infrastructure',
    description: 'Revitalizing local parks like Vidyasagar Park and Hrishikesh Park, funding sports equipment for youth clubs, and creating skill-development boot camps for Jorasanko youth.'
  }
];
