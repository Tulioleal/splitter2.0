import { Basic } from "./Basic";

export interface Action extends Basic {
  from: string;
  to: string;
  amount: number;
}