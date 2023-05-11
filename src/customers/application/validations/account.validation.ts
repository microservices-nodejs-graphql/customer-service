import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Account } from "src/customers/domain/models/account";
import { AccountEntity } from "src/customers/infraestructure/adapters/out/entities/account.entity";
import { PostgresRespositoryAdapter } from "src/customers/infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "src/customers/infraestructure/ports/out/entity-repository.port";
import { BussinessException } from "../exceptions/bussiness.exception";
import { ExceptionEnum } from "../enums/exception.enum";

@Injectable()
export class AccountValidation {
    properties: any;

    constructor(@Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort) {
        this.properties = require('../utils/messages.util');
    }

    async validateCreateAccount(account: Account) {
        let accountEntity = await this.entityRepositoryPort.getByFields({"name": account.name}, AccountEntity);
        if (accountEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_NAME_ACCOUNT,
                this.properties.get('validation.account.name.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async validateUpdateAccount(account: Account) {
        let accountEntity = await this.entityRepositoryPort.getById(account.id, AccountEntity);
        if (!accountEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_ACCOUNT,
                this.properties.get('validation.account.not_found'),
                HttpStatus.NOT_FOUND
            );
        }

        let accountEntityExits = await this.entityRepositoryPort.getByFields({"name": account.name},AccountEntity);
        if (accountEntityExits && accountEntity.id !== accountEntityExits.id) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_NAME_ACCOUNT,
                this.properties.get('validation.account.name.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async validateDeleteAccount(account: Account) {
        let accountEntity = await this.entityRepositoryPort.getById(account.id, AccountEntity);
        if (!accountEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_ACCOUNT,
                this.properties.get('validation.account.not_found'),
                HttpStatus.NOT_FOUND
            );
        }
    }
}