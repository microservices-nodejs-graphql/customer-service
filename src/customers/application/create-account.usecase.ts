import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateAccountPort } from "../infraestructure/ports/in/create-account.port";
import { Account } from "../domain/models/account";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { AccountValidation } from "./validations/account.validation";
import { AccountEntity } from "../infraestructure/adapters/out/entities/account.entity";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { AccountEntityMapper } from "./mappers/account-entity.mapper";

@Injectable()
export class CreateAccountUseCase implements CreateAccountPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly accountValidation: AccountValidation) {
        this.properties = require('./utils/messages.util');
    }

    async createAccount(account: Account): Promise<Account> {
        await this.accountValidation.validateCreateAccount(account);
        try {
            let entity = await this.entityRepositoryPort.save(AccountEntityMapper.toEntity(account), AccountEntity)
            return AccountEntityMapper.toDomain(entity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_CREATE_ACCOUNT,
                this.properties.get('exception.account.create.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}