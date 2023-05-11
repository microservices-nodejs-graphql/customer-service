import { CustomerTypeRepository } from "../../../ports/out/repositories/customer-type.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerTypeEntity } from "src/customers/infraestructure/adapters/out/entities/customer-type.entity";
import { CustomerTypeFilter } from "src/customers/domain/filters/customer-type.filter";

@Injectable()
export class CustomerTypeRepositoryTypeorm implements CustomerTypeRepository {
    constructor(@InjectRepository(CustomerTypeEntity) private customerTypeRepository: Repository<CustomerTypeEntity>) {}

    async getAll(filter: CustomerTypeFilter): Promise<CustomerTypeEntity[]> {
        const query = await this.buildQueryGetAll(filter);

        let items;
        if(filter.skip && filter.take) {
            items = await query.skip(filter.take * (filter.skip-1)).take(filter.take).getMany();
        } else {
            items = await query.getMany(); 
        }

        return items;
    }

    async countGetAll(filter: CustomerTypeFilter): Promise<number> {
        const query = await this.buildQueryGetAll(filter);
        return await query.getCount();
    }

    private async buildQueryGetAll(filter: CustomerTypeFilter) {
        let query = this.customerTypeRepository
        .createQueryBuilder("ct")
        .select([
            "ct.id",
            "ct.name",
            "ct.description"
        ])
        .where("ct.logState = :logState", {"logState": 1})
        .orderBy("ct.id");

        if (filter.id) {
            query = query.andWhere("ct.id = :id", {"id": filter.id});
        }

        if (filter.name) {
            query = query.andWhere("LOWER(ct.name) like :name", {"name": `%${filter.name.toLowerCase()}%`});
        }

        if (filter.description) {
            query = query.andWhere("LOWER(ct.description) like :description", {"description": `%${filter.description.toLowerCase()}%`});
        }

        return query;
    }
}