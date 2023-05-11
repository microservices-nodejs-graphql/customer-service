import { Inject, Injectable } from "@nestjs/common";
import { CustomerAccount } from "../domain/models/customer-account";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { CreateCustomerAccountPort } from "../infraestructure/ports/in/create-customer-account.port";
import { CustomerAccountValidation } from "./validations/customer-account.validation";

@Injectable()
export class CreateCustomerAccountUseCase implements CreateCustomerAccountPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerAccountValidation: CustomerAccountValidation
        ) {
        this.properties = require('./utils/messages.util');
    }

    async createCustomerAccount(customerAccount: CustomerAccount): Promise<CustomerAccount> {
        await this.customerAccountValidation.validateCreateCustomerAccount(customerAccount);
        throw new Error("Method not implemented.");
    }    
}