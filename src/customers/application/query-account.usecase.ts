import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { QueryResponse } from "../infraestructure/adapters/in/resolvers/objects/query-response.object-type";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { QueryAccountPort } from "../infraestructure/ports/in/query-account.port";
import { AccountFilter } from "../domain/filters/account.filter";
import { Account } from "../domain/models/account";
import { AccountEntityMapper } from "./mappers/account-entity.mapper";
import { AccountRepositoryTypeorm } from "../infraestructure/adapters/out/typeorm/account-repository.typeorm";
import { AccountRepository } from "../infraestructure/ports/out/repositories/account.repository";

@Injectable()
export class QueryAccountUseCase implements QueryAccountPort {
    properties: any;

    constructor(@Inject(AccountRepositoryTypeorm) private accountRepository: AccountRepository) {
        this.properties = require('./utils/messages.util');
    }

    async getAll(filter: AccountFilter): Promise<QueryResponse<Account>> {
        try {
            const total = await this.accountRepository.countGetAll(filter);
            const items = await this.accountRepository.getAll(filter);
            return new QueryResponse<Account>(total, filter.skip, filter.take, AccountEntityMapper.toDomainList(items));
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_GET_ALL_ACCOUNT,
                this.properties.get('exception.account.find_all.error'),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}