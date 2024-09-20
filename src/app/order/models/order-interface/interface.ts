export type SingleProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  showHeartIcon: boolean;
};

export interface GenericResponse {
  data: any[];
  error: boolean;
  msg: string;
}

export interface PincodeResponse {
  Message: string;
  PostOffice: any[];
  Status: string;
}

// export type ProductStock = string | null;
