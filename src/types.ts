/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Landmark {
  id: string;
  name: string;
  description: string;
  category: 'Nature' | 'Heritage' | 'Recreation' | 'Agri-Tourism' | 'Leisure' | 'Scenic';
  image: string;
  locationDetails: string;
  historyText: string;
  travelerTips: string[];
  rating: number;
  reviewCount: number;
  hours: string;
  entranceFee: string;
}

export interface Ordinance {
  id: string;
  name: string;
  description: string;
  category: 'Civic' | 'Environmental' | 'Safety' | 'Health';
  bulletPoints: string[];
  penalty: string;
  iconType: 'smoke' | 'car' | 'plastic' | 'sound' | 'pet';
}

export interface Institution {
  id: string;
  name: string;
  established: string;
  description: string;
  category: 'University' | 'Heritage' | 'College';
  image: string;
  studentCountText: string;
  details: string;
  keyMissions: string[];
}

export interface CultureEvent {
  id: string;
  title: string;
  description: string;
  category: 'Festival' | 'Roots' | 'Artisanal';
  image: string;
  subTitle?: string;
  longText?: string;
  highlights?: string[];
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  slots: {
    time: string;
    activityName: string;
    description: string;
    tip: string;
    landmarkId?: string;
  }[];
}
