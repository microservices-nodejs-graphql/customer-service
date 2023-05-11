import { CustomerAccountFilter } from "src/customers/domain/filters/customer-account.filter";
import { CustomerAccountEntity } from "src/customers/infraestructure/adapters/out/entities/customer-account.entity";

export interface CustomerAccountRepository {
    getAllByCustomer(filter: CustomerAccountFilter): Promise<CustomerAccountEntity[]>;
}