import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CustomerAccount } from "../domain/models/customer-account";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { CreateCustomerAccountPort } from "../infraestructure/ports/in/create-customer-account.port";
import { CustomerAccountValidation } from "./validations/customer-account.validation";
import { CustomerAccountEntity } from "../infraestructure/adapters/out/entities/customer-account.entity";
import { CustomerAccountEntityMapper } from "./mappers/customer-account.mapper";
import { ExceptionEnum } from "./enums/exception.enum";
import { BussinessException } from "./exceptions/bussiness.exception";

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
        try {
            let customerAccountEntity = CustomerAccountEntityMapper.toEntity(customerAccount);
            customerAccountEntity.mount = "0.0";
            customerAccountEntity.status = "CREATED";
            customerAccountEntity = await this.entityRepositoryPort.save(customerAccountEntity, CustomerAccountEntity)
            return CustomerAccountEntityMapper.toDomain(customerAccountEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_CREATE_CUSTOMER_ACCOUNT,
                this.properties.get('exception.customer-account.create.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}