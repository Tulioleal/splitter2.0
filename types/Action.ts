import { Basic } from "./Basic";
export interface ActionOBC {
  from: string;
  to: string;
  amount: number;
}

export type Action = ActionOBC & Basic