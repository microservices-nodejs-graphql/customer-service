import { CustomerTypeFilter } from "src/customers/domain/filters/customer-type.filter";
import { CustomerTypeEntity } from "src/customers/infraestructure/adapters/out/entities/customer-type.entity";

export interface CustomerTypeRepository {
    getAll(filter: CustomerTypeFilter): Promise<CustomerTypeEntity[]>;
    countGetAll(filter: CustomerTypeFilter): Promise<number>;
}