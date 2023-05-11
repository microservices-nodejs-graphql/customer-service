import { CustomerType } from "src/customers/domain/models/customer-type";
import { Customer } from "src/customers/domain/models/customer";
import { CustomerTypeEntity } from "src/customers/infraestructure/adapters/out/entities/customer-type.entity";
import { CustomerEntity } from "src/customers/infraestructure/adapters/out/entities/customer.entity";

export class CustomerEntityMapper {
    public static toEntity(customer: Customer): CustomerEntity {
        return this.maptoEntity(customer);
    }

    public static toDomain(customerEntity: CustomerEntity): Customer {
        return this.mapToDomain(customerEntity);
    }

    public static toDomainList(customerEntities: CustomerEntity[]): Customer[] {
        return customerEntities.map(x => this.mapToDomain(x));
    }
    
    private static maptoEntity(customer: Customer): CustomerEntity {
        const customerEntity = new CustomerEntity();
        customerEntity.id = customer.id;
        customerEntity.numberDocument = customer.numberDocument;
        customerEntity.bussinessName = customer.bussinessName;        
        customerEntity.name = customer.name;
        customerEntity.lastname = customer.lastname;

        if(customer.customerType) {
            customerEntity.customerTypeEntity = new CustomerTypeEntity();
            customerEntity.customerTypeEntity.id = customer.customerType.id;
        }
        return customerEntity;
    }

    private static mapToDomain(customerEntity: CustomerEntity): Customer {
        const customer = new Customer();
        customer.id = customerEntity.id;
        customer.numberDocument = customerEntity.numberDocument;
        customer.bussinessName = customerEntity.bussinessName;
        customer.name = customerEntity.name;
        customer.lastname = customerEntity.lastname;

        if(customerEntity.customerTypeEntity) {
            customer.customerType = new CustomerType();
            customer.customerType.id = customerEntity.customerTypeEntity.id;
            customer.customerType.name = customerEntity.customerTypeEntity.name;
            customer.customerType.description = customerEntity.customerTypeEntity.description;
        }
        return customer;
    }
}