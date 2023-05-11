import { QueryResponse } from "../../adapters/in/resolvers/objects/query-response.object-type";
import { CustomerFilter } from "src/customers/domain/filters/customer.filter";
import { Customer } from "src/customers/domain/models/customer";

export interface QueryCustomerPort {
    getAll(filter: CustomerFilter): Promise<QueryResponse<Customer>>;
}