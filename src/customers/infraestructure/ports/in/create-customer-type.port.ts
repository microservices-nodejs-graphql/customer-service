import { CustomerType } from "src/customers/domain/models/customer-type";

export interface CreateCustomerTypePort {
    createCustomerType(customerType: CustomerType): Promise<CustomerType>;
}