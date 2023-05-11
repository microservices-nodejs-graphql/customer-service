import { CustomerType } from "src/customers/domain/models/customer-type";
import { CustomerTypeEntity } from "src/customers/infraestructure/adapters/out/entities/customer-type.entity";

export class CustomerTypeEntityMapper {
    public static toEntity(customerType: CustomerType): CustomerTypeEntity {
        return this.maptoEntity(customerType);
    }

    public static toDomain(customerTypeEntity: CustomerTypeEntity): CustomerType {
        return this.mapToDomain(customerTypeEntity);
    }

    public static toDomainList(customerTypesEntity: CustomerTypeEntity[]): CustomerType[] {
        return customerTypesEntity.map(x => this.mapToDomain(x));
    }
    
    private static maptoEntity(customerType: CustomerType): CustomerTypeEntity {
        const customerTypeEntity = new CustomerTypeEntity();
        customerTypeEntity.id = customerType.id;
        customerTypeEntity.name = customerType.name;
        customerTypeEntity.description = customerType.description;
        return customerTypeEntity;
    }

    private static mapToDomain(customerTypeEntity: CustomerTypeEntity): CustomerType {
        const customerType = new CustomerType();
        customerType.id = customerTypeEntity.id;
        customerType.name = customerTypeEntity.name;
        customerType.description = customerTypeEntity.description;
        return customerType;
    }
}