export type Axis = 'EI' | 'SN' | 'TF' | 'JP';

export type PersonalityType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export interface Option {
  text: string;
  value: string; // e.g., 'E' or 'I'
}

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  options: [Option, Option];
  imagePath: string; // Static image path
}

export interface TypeResult {
  type: PersonalityType;
  title: string;
  description: string;
  strengths: string[];
  strengthIntro: string; // New: simple intro without brackets/commas
  weaknesses: string[];
  weaknessIntro: string; // New: simple intro without brackets/commas
  professions: string[];
  lineUrl: string;
  imagePath: string; // Static image path
}

export interface AxisScore {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}