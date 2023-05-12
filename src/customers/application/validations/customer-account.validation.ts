import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CustomerAccount } from "src/customers/domain/models/customer-account";
import { CustomerEntity } from "src/customers/infraestructure/adapters/out/entities/customer.entity";
import { PostgresRespositoryAdapter } from "src/customers/infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "src/customers/infraestructure/ports/out/entity-repository.port";
import { BussinessException } from "../exceptions/bussiness.exception";
import { ExceptionEnum } from "../enums/exception.enum";
import { AccountEntity } from "src/customers/infraestructure/adapters/out/entities/account.entity";
import { CustomerAccountEntity } from "src/customers/infraestructure/adapters/out/entities/customer-account.entity";

@Injectable()
export class CustomerAccountValidation {
    properties: any;

    constructor(@Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort) {
        this.properties = require("../utils/messages.util");
    }

    async validateCreateCustomerAccount(customerAccount: CustomerAccount) {
        const customerEntity = await this.entityRepositoryPort.getById(customerAccount.customer.id, CustomerEntity);
        if (!customerEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER,
                this.properties.get('validation.customer.not_found'),
                HttpStatus.NOT_FOUND
            );
        }

        const accountEntity = await this.entityRepositoryPort.getById(customerAccount.account.id, AccountEntity);
        if (!accountEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_ACCOUNT,
                this.properties.get('validation.account.not_found'),
                HttpStatus.NOT_FOUND
            );
        }
    }

    async validateDebitToAccount(customerAccount: CustomerAccount) {
        const customerAccountEntity = await this.entityRepositoryPort.getById(customerAccount.id, CustomerAccountEntity);
        if (!customerAccountEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER_ACCOUNT,
                this.properties.get('validation.customer_account.not_found'),
                HttpStatus.NOT_FOUND
            );
        }

        if (customerAccountEntity.status !== 'ACTIVE') {
            throw new BussinessException(
                ExceptionEnum.ERROR_NO_ACTIVE_CUSTOMER_ACCOUNT,
                this.properties.get('validation.customer_account.account.no_active'),
                HttpStatus.NOT_FOUND
            );
        }
    }
}