import { Customer } from "src/customers/domain/models/customer";

export interface DeleteCustomerPort {
    deleteCustomer(customer: Customer): Promise<Customer>;
}