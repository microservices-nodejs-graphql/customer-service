import { CustomerType } from "src/customers/domain/models/customer-type";

export interface DeleteCustomerTypePort {
    deleteCustomerType(customerType: CustomerType): Promise<CustomerType>;
}