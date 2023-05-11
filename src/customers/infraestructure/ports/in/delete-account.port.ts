import { Account } from "src/customers/domain/models/account";

export interface DeleteAccountPort {
    deleteAccount(account: Account): Promise<Account>;
}