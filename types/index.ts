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
  type?: string;
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
  package_id: number;
  business_nature: string[];
  company_logo: string;
  company_video_url: string;
  company_description: string;
  role: Role;
  banners: Banner[];
  booth_type: string;
  img_profile: string;
};

type Package = {
  id: number;
  name: string;
  order: string;
};

export type Exhibitor = {
  id: number;
  name: string;
  company_logo: string | null;
  company_name: string;
  business_nature: string[];
  package_id: number;
  package: Package;
};

export type Poster = {
  number: number;
  src: string;
  title: string;
};

export type ConsultationDetail = {
  id: number;
  date: string;
  time: string;
  status: number;
  visitor: {
    id: number;
    name: string;
    institution_name: string;
  };
  exhibitor: {
    id: number;
    company_name: string;
  };
};
