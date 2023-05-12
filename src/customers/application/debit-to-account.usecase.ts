import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DebitToAccountPort } from "../infraestructure/ports/in/debit-to-account.port";
import { CustomerAccount } from "../domain/models/customer-account";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { CustomerAccountValidation } from "./validations/customer-account.validation";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { CustomerAccountEntity } from "../infraestructure/adapters/out/entities/customer-account.entity";
import { CustomerAccountEntityMapper } from "./mappers/customer-account.mapper";
import Decimal from 'decimal.js';

@Injectable()
export class DebitToAccountUseCase implements DebitToAccountPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerAccountValidation: CustomerAccountValidation
    ) {
        this.properties = require('./utils/messages.util');
    }

    async debitToAccount(customerAccount: CustomerAccount): Promise<CustomerAccount> {
        await this.customerAccountValidation.validateDebitToAccount(customerAccount);
        try {
            let customerAccountEntity = await this.entityRepositoryPort.getById(customerAccount.id, CustomerAccountEntity);
            const mountAdd = new Decimal(customerAccount.mount);
            const mountExist = new Decimal(customerAccountEntity.mount);
            customerAccountEntity.mount = mountExist.add(mountAdd).toString();
            customerAccountEntity = await this.entityRepositoryPort.update(customerAccountEntity, CustomerAccountEntity);
            return CustomerAccountEntityMapper.toDomain(customerAccountEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_DEBIT_TO_CUSTOMER_ACCOUNT,
                this.properties.get('expeption.customer_account.debit.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}