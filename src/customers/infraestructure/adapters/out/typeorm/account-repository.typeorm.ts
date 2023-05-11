import { Injectable } from "@nestjs/common";
import { AccountFilter } from "src/customers/domain/filters/account.filter";
import { AccountRepository } from "src/customers/infraestructure/ports/out/repositories/account.repository";
import { AccountEntity } from "../entities/account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AccountRepositoryTypeorm implements AccountRepository {
    constructor(@InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>) {}

    async getAll(filter: AccountFilter): Promise<AccountEntity[]> {
        const query = await this.buildQueryGetAll(filter);

        let items;
        if(filter.skip && filter.take) {
            items = await query.skip(filter.take * (filter.skip-1)).take(filter.take).getMany();
        } else {
            items = await query.getMany(); 
        }

        return items;
    }

    async countGetAll(filter: AccountFilter): Promise<number> {
        const query = await this.buildQueryGetAll(filter);
        return await query.getCount();
    }

    private async buildQueryGetAll(filter: AccountFilter) {
        let query = this.accountRepository
        .createQueryBuilder("a")
        .select([
            "a.id",
            "a.name",
            "a.openingBalance"
        ])
        .where("a.logState = :logState", {"logState": 1})
        .orderBy("a.id");

        if (filter.id) {
            query = query.andWhere("a.id = :id", {"id": filter.id});
        }

        if (filter.name) {
            query = query.andWhere("LOWER(a.name) like :name", {"name": `%${filter.name.toLowerCase()}%`});
        }

        return query;
    }
}