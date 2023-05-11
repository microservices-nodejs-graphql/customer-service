import { CustomerType } from "src/customers/domain/models/customer-type";
import { QueryResponse } from "../../adapters/in/resolvers/objects/query-response.object-type";
import { CustomerTypeFilter } from "src/customers/domain/filters/customer-type.filter";

export interface QueryCustomerTypePort {
    getAll(filter: CustomerTypeFilter): Promise<QueryResponse<CustomerType>>;
}