import { Account } from "src/customers/domain/models/account";
import { QueryResponse } from "../../adapters/in/resolvers/objects/query-response.object-type";
import { AccountFilter } from "src/customers/domain/filters/account.filter";

export interface QueryAccountPort {
    getAll(filter: AccountFilter): Promise<QueryResponse<Account>>;
}