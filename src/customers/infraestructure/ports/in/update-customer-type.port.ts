import { CustomerType } from "src/customers/domain/models/customer-type";

export interface UpdateCustomerTypePort {
    updateCustomerType(customerType: CustomerType): Promise<CustomerType>;
}