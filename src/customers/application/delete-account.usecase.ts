import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Account } from "../domain/models/account";
import { DeleteAccountPort } from "../infraestructure/ports/in/delete-account.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { AccountValidation } from "./validations/account.validation";
import { AccountEntity } from "../infraestructure/adapters/out/entities/account.entity";
import { AccountEntityMapper } from "./mappers/account-entity.mapper";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";

@Injectable()
export class DeleteAccountUsecase implements DeleteAccountPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly accountValidation: AccountValidation) {
        this.properties = require('./utils/messages.util');
    }

    async deleteAccount(account: Account): Promise<Account> {
        await this.accountValidation.validateDeleteAccount(account);
        try {
            let accountEntity = await this.entityRepositoryPort.getById(account.id, AccountEntity);
            accountEntity.logState = 0;
            accountEntity = await this.entityRepositoryPort.delete(accountEntity, AccountEntity);
            return AccountEntityMapper.toDomain(accountEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_DELETE_ACCOUNT,
                this.properties.get('exception.account.delete.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }    
}