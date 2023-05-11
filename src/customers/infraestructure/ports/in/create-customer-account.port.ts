import { CustomerAccount } from "src/customers/domain/models/customer-account";

export interface CreateCustomerAccountPort {
    createCustomerAccount(customerAccount: CustomerAccount): Promise<CustomerAccount>;
}