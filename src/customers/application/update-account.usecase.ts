import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Account } from "../domain/models/account";
import { UpdateAccountPort } from "../infraestructure/ports/in/update-account.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { AccountValidation } from "./validations/account.validation";
import { AccountEntity } from "../infraestructure/adapters/out/entities/account.entity";
import { AccountEntityMapper } from "./mappers/account-entity.mapper";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";

@Injectable()
export class UpdateAccountUseCase implements UpdateAccountPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly accountValidation: AccountValidation
    ) {
        this.properties = require("./utils/messages.util");
    }

    async updateAccount(account: Account): Promise<Account> {
        await this.accountValidation.validateUpdateAccount(account);
        try {
            let accountEntity = await this.entityRepositoryPort.getById(account.id, AccountEntity);
            if (account.name) {
                accountEntity.name = account.name;
            }

            if (account.openingBalance) {
                accountEntity.openingBalance = account.openingBalance;
            }

            accountEntity = await this.entityRepositoryPort.update(accountEntity, AccountEntity)
            return AccountEntityMapper.toDomain(accountEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_UPDATE_ACCOUNT,
                this.properties.get('exception.account.update.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}