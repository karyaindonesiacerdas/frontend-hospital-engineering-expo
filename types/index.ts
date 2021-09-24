export enum Role {
  exhibitor = "Exhibitor",
  visitor = "Visitor",
}

export type Banner = {
  id: number;
  exhibitor_id: number;
  image: string;
  order: number;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type BoothType = "Booth10" | "Booth5";

export type ExhibitorDetails = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  job_function: string;
  company_name: string;
  company_website: string;
  country: string;
  province: string;
  packages: string;
  business_nature: string[];
  company_logo: string;
  company_video_url: string;
  company_description: string;
  role: Role;
  banners: Banner[];
};

export type Exhibitor = {
  id: number;
  name: string;
  company_logo: string | null;
  company_name: string;
  business_nature: string[];
  package_id: number;
};

export type Poster = {
  number: number;
  src: string;
  title: string;
};
