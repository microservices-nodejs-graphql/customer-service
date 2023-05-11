import { Account } from "src/customers/domain/models/account";

export interface UpdateAccountPort {
    updateAccount(account: Account): Promise<Account>;
}