import { Account } from "src/customers/domain/models/account";

export interface CreateAccountPort {
    createAccount(accoutn: Account): Promise<Account>;
}