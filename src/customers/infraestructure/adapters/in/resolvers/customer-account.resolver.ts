import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CustomerAccountObjectType } from "./objects/customer-account.object-type";
import { NewCustomerAccountInputType } from "./inputs/new-customer-account.input-type";
import { Inject } from "@nestjs/common";
import { CreateCustomerAccountPort } from "src/customers/infraestructure/ports/in/create-customer-account.port";
import { CustomerAccountMapper } from "./mappers/customer-account.mapper";
import { CreateCustomerAccountUseCase } from "src/customers/application/create-customer-account.usecase";
import { DebitToAccountInputType } from "./inputs/debit-to-account.input-type";
import { DebitToAccountPort } from "src/customers/infraestructure/ports/in/debit-to-account.port";
import { DebitToAccountUseCase } from "src/customers/application/debit-to-account.usecase";

@Resolver()
export class CustomerAccountResolver {
    constructor(
        @Inject(CreateCustomerAccountUseCase) private readonly createCustomerAccountPort: CreateCustomerAccountPort,
        @Inject(DebitToAccountUseCase) private readonly debitToAccountPort: DebitToAccountPort) { }

    @Mutation(returns => CustomerAccountObjectType)
    async createCustomerAccount(@Args('customerAccount') customerAccountInputType: NewCustomerAccountInputType) {
        const customerAccount = CustomerAccountMapper.toDomain(customerAccountInputType);
        return CustomerAccountMapper.toObjectType(await this.createCustomerAccountPort.createCustomerAccount(customerAccount));
    }

    @Mutation(returns => CustomerAccountObjectType)
    async debitToAccount(@Args('customerAccount') debitToAccountInputType: DebitToAccountInputType) {
        const customerAccount = CustomerAccountMapper.toDomain(debitToAccountInputType);
        return CustomerAccountMapper.toObjectType(await this.debitToAccountPort.debitToAccount(customerAccount));
    }
}