import { Customer } from "src/customers/domain/models/customer";
import { CustomerObjectType } from "../objects/customer.object-type";
import { CustomerType } from "src/customers/domain/models/customer-type";
import { CustomerTypeObjectType } from "../objects/customer-type.object-type";

export class CustomerMapper {
    public static toDomain(customerInput): Customer {
        return this.mapToDomain(customerInput);
    }

    public static toObjectType(customer: Customer): CustomerObjectType {
        return this.mapToObjectType(customer);
    }

    public static toObjectTypeList(customers: Customer[]): CustomerObjectType[] {
        return customers.map(x => this.mapToObjectType(x));
    }

    private static mapToDomain(customerInput): Customer {
        const domain = new Customer();
        domain.id = customerInput.id;
        domain.numberDocument = customerInput.numberDocument;
        domain.bussinessName = customerInput.bussinessName;
        domain.name = customerInput.name;
        domain.lastname = customerInput.lastname;

        if (customerInput.customerTypeId) {
            domain.customerType = new CustomerType();
            domain.customerType.id = customerInput.customerTypeId;
        }
        return domain;
    }

    private static mapToObjectType(customer: Customer): CustomerObjectType {
        const customerObjectType = new CustomerObjectType();
        customerObjectType.id = customer.id;
        customerObjectType.numberDocument = customer.numberDocument;
        customerObjectType.bussinessName = customer.bussinessName
        customerObjectType.name = customer.name;
        customerObjectType.lastname = customer.lastname;

        if (customer.customerType) {
            customerObjectType.customerType = new CustomerTypeObjectType();
            customerObjectType.customerType.id = customer.customerType.id;
            customerObjectType.customerType.name = customer.customerType.name;
            customerObjectType.customerType.description = customer.customerType.description;
        }
        return customerObjectType;
    }
}