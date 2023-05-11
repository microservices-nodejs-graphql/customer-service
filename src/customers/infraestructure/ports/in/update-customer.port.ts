import { Customer } from "src/customers/domain/models/customer";

export interface UpdateCustomerPort {
    updateCustomer(customer: Customer): Promise<Customer>;
}