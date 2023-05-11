import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Customer } from "src/customers/domain/models/customer";
import { CustomerObjectType } from "./objects/customer.object-type";
import { NewCustomerInputType } from "./inputs/new-customer.input-type";
import { Inject } from "@nestjs/common";
import { CreateCustomerPort } from "src/customers/infraestructure/ports/in/create-customer.port";
import { CustomerMapper } from "./mappers/customer.mapper";
import { CreateCustomerUseCase } from "src/customers/application/create-customer.usecase";
import { UpdateCustomerInputType } from "./inputs/update-customer.input-type";
import { UpdateCustomerUseCase } from "src/customers/application/update-customer.usecase";
import { UpdateCustomerPort } from "src/customers/infraestructure/ports/in/update-customer.port";
import { DeleteCustomerInputType } from "./inputs/delete-customer.input-type";
import { DeleteCustomerUseCase } from "src/customers/application/delete-customer.usecase";
import { DeleteCustomerPort } from "src/customers/infraestructure/ports/in/delete-customer.port";
import { QueryResponseCustomerObjectType } from "./objects/query-response-customer.object-type";
import { CustomerFilter } from "src/customers/domain/filters/customer.filter";
import { CustomerFilterInputType } from "./inputs/customer-filter.input-type";
import { QueryCustomerPort } from "src/customers/infraestructure/ports/in/query-customer.port";
import { QueryCustomerUseCase } from "src/customers/application/query-customer.usecase";

@Resolver(of => Customer)
export class CustomerResolver {
    constructor(
        @Inject(CreateCustomerUseCase) private readonly createCustomerPort: CreateCustomerPort,
        @Inject(UpdateCustomerUseCase) private readonly updateCustomerPort: UpdateCustomerPort,
        @Inject(DeleteCustomerUseCase) private readonly deleteCustomerPort: DeleteCustomerPort,
        @Inject(QueryCustomerUseCase) private readonly queryCustomerPort: QueryCustomerPort
    ) { }

    @Query(returns => QueryResponseCustomerObjectType)
    async customers(@Args('filter') filterInput: CustomerFilterInputType): Promise<QueryResponseCustomerObjectType> {
        const filter = new CustomerFilter();
        filter.id = filterInput.id;
        filter.customerTypeId = filterInput.customerTypeId;
        filter.numberDocument = filterInput.numberDocument;
        filter.bussinessName = filterInput.bussinessName;
        filter.name = filterInput.name;
        filter.lastname = filterInput.lastname;
        filter.skip = filterInput.skip;
        filter.take = filterInput.take;
        let result = await this.queryCustomerPort.getAll(filter);
        return new QueryResponseCustomerObjectType(result.total, result.skip, result.take, CustomerMapper.toObjectTypeList(result.items));
    }

    @Mutation(returns => CustomerObjectType)
    async createCustomer(@Args('customer') customerInput: NewCustomerInputType) {
        const customer = CustomerMapper.toDomain(customerInput);
        return CustomerMapper.toObjectType(await this.createCustomerPort.createCustomer(customer));
    }

    @Mutation(returns => CustomerObjectType)
    async updateCustomer(@Args('customer') customerInput: UpdateCustomerInputType) {
        const customer = CustomerMapper.toDomain(customerInput);
        return CustomerMapper.toObjectType(await this.updateCustomerPort.updateCustomer(customer));
    }

    @Mutation(returns => CustomerObjectType)
    async deleteCustomer(@Args('customer') customerInput: DeleteCustomerInputType) {
        const customer = CustomerMapper.toDomain(customerInput);
        return CustomerMapper.toObjectType(await this.deleteCustomerPort.deleteCustomer(customer));
    }
}