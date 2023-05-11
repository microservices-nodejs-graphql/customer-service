import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewCustomerTypeInputType } from "./inputs/new-customer-type.input-type";
import { CustomerTypeObjectType } from "./objects/customer-type.object-type";
import { CreateCustomerTypeUseCase } from "src/customers/application/create-customer-type.usecase";
import { CreateCustomerTypePort } from "src/customers/infraestructure/ports/in/create-customer-type.port";
import { Inject } from "@nestjs/common";
import { CustomerTypeMapper } from "./mappers/customer-type.mapper";
import { QueryCustomerTypeUseCase } from "src/customers/application/query-customer-type.usecase";
import { QueryCustomerTypePort } from "src/customers/infraestructure/ports/in/query-customer-type.port";

import { CustomerTypeFilterInputType } from "./inputs/customer-type-filter.input-type";
import { CustomerTypeFilter } from "src/customers/domain/filters/customer-type.filter";
import { QueryResponseCustomerTypeObjectType } from "./objects/query-response-customer-type.object-type";
import { UpdateCustomerTypeInputType } from "./inputs/update-customer-type.input-type";
import { UpdateCustomerTypePort } from "src/customers/infraestructure/ports/in/update-customer-type.port";
import { UpdateCustomerTypeUseCase } from "src/customers/application/update-customer-type.usecase";
import { DeleteCustomerTypePort } from "src/customers/infraestructure/ports/in/delete-customer-type.port";
import { DeleteCustomerTypeUseCase } from "src/customers/application/delete-customer-type.usecase";
import { DeleteCustomerTypeInputType } from "./inputs/delete-customer-type.input-type";

@Resolver(of => CustomerTypeObjectType)
export class CustomerTypeResolver {
    constructor(@Inject(CreateCustomerTypeUseCase) private createCustomerTypePort: CreateCustomerTypePort,
                @Inject(UpdateCustomerTypeUseCase) private updateCustomerTypePort: UpdateCustomerTypePort,
                @Inject(DeleteCustomerTypeUseCase) private deleteCustomerTypePort: DeleteCustomerTypePort,
                @Inject(QueryCustomerTypeUseCase) private queryCustomerTypePort: QueryCustomerTypePort) {}

    @Query(returns => QueryResponseCustomerTypeObjectType)
    async customerTypes(@Args('filter') filterInput: CustomerTypeFilterInputType): Promise<QueryResponseCustomerTypeObjectType> {
        const filter = new CustomerTypeFilter();
        filter.id = filterInput.id;
        filter.name = filterInput.name;
        filter.description = filterInput.description;
        filter.skip = filterInput.skip;
        filter.take = filterInput.take;
        let result = await this.queryCustomerTypePort.getAll(filter);
        return new QueryResponseCustomerTypeObjectType(result.total, result.skip, result.take, CustomerTypeMapper.toObjectTypeList(result.items));
    }

    @Mutation(returns => CustomerTypeObjectType)
    async createCustomerType(@Args('customerType') customerTypeInput: NewCustomerTypeInputType) {
        const customerType = CustomerTypeMapper.toDomain(customerTypeInput);
        return CustomerTypeMapper.toObjectType(await this.createCustomerTypePort.createCustomerType(customerType));
    }

    @Mutation(returns => CustomerTypeObjectType)
    async updateCustomerType(@Args('customerType') customerTypeInput: UpdateCustomerTypeInputType) {
        const customerType = CustomerTypeMapper.toDomain(customerTypeInput);
        return CustomerTypeMapper.toObjectType(await this.updateCustomerTypePort.updateCustomerType(customerType));
    }

    @Mutation(returns => CustomerTypeObjectType)
    async deleteCustomerType(@Args('customerType') customerTypeInput: DeleteCustomerTypeInputType) {
        const customerType = CustomerTypeMapper.toDomain(customerTypeInput);
        return CustomerTypeMapper.toObjectType(await this.deleteCustomerTypePort.deleteCustomerType(customerType));
    }
}