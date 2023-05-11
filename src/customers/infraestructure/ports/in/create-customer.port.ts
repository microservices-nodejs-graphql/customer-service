import { Customer } from "src/customers/domain/models/customer";

export interface CreateCustomerPort {
    createCustomer(customer: Customer): Promise<Customer>;
}