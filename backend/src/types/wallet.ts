import { ITransaction } from "./transaction";

export interface IWallet {
  owner: {
    uid: string;
    username: string;
  };
  balance: number;
  pending_balance: number;
  transactions: Array<ITransaction>[];
}