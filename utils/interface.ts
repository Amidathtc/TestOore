import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  profile: Array<string>;
  history: Array<string>;
  beg :{}[]
}
 


export interface iProfile {
  name: string;
  phoneNumber: string;
  address: string;
  userID: string;
  aboutUs: string;
  user: {};
}

export interface iFund {
  title: string;
  description: string;
  amountNeeded: number;
  amountRaised: number;
  category: string;
  userID: string;
  image: string;
  imageID: string;
  like: Array<string>;
  checkOut: Array<string>;

  user: {};
}

export interface iUserData extends iUser, mongoose.Document {}
export interface iProfileData extends iProfile, mongoose.Document {}
export interface iFundData extends iFund, mongoose.Document {}