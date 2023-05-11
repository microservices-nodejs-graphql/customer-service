import { AccountFilter } from "src/customers/domain/filters/account.filter";
import { AccountEntity } from "src/customers/infraestructure/adapters/out/entities/account.entity";

export interface AccountRepository {
    getAll(filter: AccountFilter): Promise<AccountEntity[]>;
    countGetAll(filter: AccountFilter): Promise<number>;
}