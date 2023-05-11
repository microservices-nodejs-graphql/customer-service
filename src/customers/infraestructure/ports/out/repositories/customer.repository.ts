import { CustomerFilter } from "src/customers/domain/filters/customer.filter";
import { CustomerEntity } from "src/customers/infraestructure/adapters/out/entities/customer.entity";

export interface CustomerRepository {
    getAll(filter: CustomerFilter): Promise<CustomerEntity[]>;
    countGetAll(filter: CustomerFilter): Promise<number>;
}