import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAccountUseCase } from "src/customers/application/create-account.usecase";
import { CreateAccountPort } from "src/customers/infraestructure/ports/in/create-account.port";
import { AccountObjectType } from "./objects/account.object-type";
import { NewAccountInputType } from "./inputs/new-account.input-type";
import { AccountMapper } from "./mappers/account.mapper";
import { UpdateAccountInputType } from "./inputs/update-account.input-type";
import { UpdateAccountUseCase } from "src/customers/application/update-account.usecase";
import { UpdateAccountPort } from "src/customers/infraestructure/ports/in/update-account.port";
import { DeleteAccountInputType } from "./inputs/delete-account.input-type";
import { DeleteAccountUsecase } from "src/customers/application/delete-account.usecase";
import { DeleteAccountPort } from "src/customers/infraestructure/ports/in/delete-account.port";
import { QueryResponseAccountObjectType } from "./objects/query-response-account.object-type";
import { AccountFilterInputType } from "./inputs/account-filter.input-type";
import { AccountFilter } from "src/customers/domain/filters/account.filter";
import { QueryAccountUseCase } from "src/customers/application/query-account.usecase";
import { QueryAccountPort } from "src/customers/infraestructure/ports/in/query-account.port";
import { ConfigService } from "src/config/config.service";

@Resolver()
export class AccountResolver {
    constructor(
        @Inject(CreateAccountUseCase) private readonly createAccountPort: CreateAccountPort,
        @Inject(UpdateAccountUseCase) private readonly updateAccountPort: UpdateAccountPort,
        @Inject(DeleteAccountUsecase) private readonly deleteAccountPort: DeleteAccountPort,
        @Inject(QueryAccountUseCase) private readonly queryAccountPort: QueryAccountPort,
        private readonly configService: ConfigService
    ) { }

    @Query(returns => QueryResponseAccountObjectType)
    async accounts(@Args('filter') filterInput: AccountFilterInputType): Promise<QueryResponseAccountObjectType> {
        const filter = new AccountFilter();
        filter.id = filterInput.id;
        filter.name = filterInput.name;
        filter.skip = filterInput.skip;
        filter.take = filterInput.take;
        let result = await this.queryAccountPort.getAll(filter);
        return new QueryResponseAccountObjectType(result.total, result.skip, result.take, AccountMapper.toObjectTypeList(result.items));
    }

    @Mutation(returns => AccountObjectType)
    async createAccount(@Args('account') accountInput: NewAccountInputType) {
        const account = AccountMapper.toDomain(accountInput);
        return AccountMapper.toObjectType(await this.createAccountPort.createAccount(account));
    }

    @Mutation(returns => AccountObjectType)
    async updateAccount(@Args('account') accountInput: UpdateAccountInputType) {
        const account = AccountMapper.toDomain(accountInput);
        return AccountMapper.toObjectType(await this.updateAccountPort.updateAccount(account));
    }

    @Mutation(returns => AccountObjectType)
    async deleteAccount(@Args('account') accountInput: DeleteAccountInputType) {
        const account = AccountMapper.toDomain(accountInput);
        return AccountMapper.toObjectType(await this.deleteAccountPort.deleteAccount(account));
    }
}