import { ITransaction } from "./transaction";

export interface IWallet {
  owner: {
    uid: string;
    username: string;
  };
  balance: number;
  rewards_balance: number;
  admin_fees: number;
  pending_balance: number;
  pending_rewards_balance: number;
  pending_admin_fees: number;
  refunded: boolean;
  transactions: Array<ITransaction>[];
}