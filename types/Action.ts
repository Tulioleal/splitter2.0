import { Basic } from "./Basic";
export interface ActionOBC {
  from: string;
  to: string;
  amount: number;
  checked?: boolean;
}

export type Action = ActionOBC & Basic