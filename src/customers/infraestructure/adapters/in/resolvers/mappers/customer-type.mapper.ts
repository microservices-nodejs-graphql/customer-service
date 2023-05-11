import { CustomerType } from "src/customers/domain/models/customer-type";
import { CustomerTypeObjectType } from "../objects/customer-type.object-type";

export class CustomerTypeMapper {
    public static toDomain(customerTypeInput): CustomerType {
        return this.mapToDomain(customerTypeInput);
    }

    public static toObjectType(customerType: CustomerType): CustomerTypeObjectType {
        return this.mapToObjectType(customerType);
    }

    public static toObjectTypeList(customerTypes: CustomerType[]): CustomerTypeObjectType[] {
        return customerTypes.map(x => this.mapToObjectType(x));
    }

    private static mapToDomain(customerTypeInput): CustomerType {
        const domain = new CustomerType();
        domain.id = customerTypeInput.id;
        domain.name = customerTypeInput.name;
        domain.description = customerTypeInput.description;
        return domain;
    }

    private static mapToObjectType(customerType: CustomerType): CustomerTypeObjectType {
        const customerTypeModel = new CustomerTypeObjectType();
        customerTypeModel.id = customerType.id;
        customerTypeModel.name = customerType.name;
        customerTypeModel.description = customerType.description;
        return customerTypeModel;
    }
}