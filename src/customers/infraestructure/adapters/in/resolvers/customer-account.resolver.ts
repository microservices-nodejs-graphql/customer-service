import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CustomerAccountObjectType } from "./objects/customer-account.object-type";
import { NewCustomerAccountInputType } from "./inputs/new-customer-account.input-type";
import { Inject } from "@nestjs/common";
import { CreateCustomerAccountPort } from "src/customers/infraestructure/ports/in/create-customer-account.port";
import { CustomerAccountMapper } from "./mappers/customer-account.mapper";
import { CreateCustomerAccountUseCase } from "src/customers/application/create-customer-account.usecase";

@Resolver()
export class CustomerAccountResolver {
    constructor(@Inject(CreateCustomerAccountUseCase) private readonly createCustomerAccountPort: CreateCustomerAccountPort) { }

    @Mutation(returns => CustomerAccountObjectType)
    async createCustomerAccount(@Args('customerAccount') customerAccountInput: NewCustomerAccountInputType) {
        const customerAccount = CustomerAccountMapper.toDomain(customerAccountInput);
        return CustomerAccountMapper.toObjectType(await this.createCustomerAccountPort.createCustomerAccount(customerAccount));
    }
}