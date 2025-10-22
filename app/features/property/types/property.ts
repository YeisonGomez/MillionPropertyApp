export interface Owner {
  idOwner: string;
  name: string;
  photo: string;
}

export interface Property {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: string;
  firstImage?: string;
  owner?: Owner;
  images?: string[];
}

export interface PropertyImage {
  idPropertyImage: string;
  idProperty: string;
  file: string;
  enabled: boolean;
}
