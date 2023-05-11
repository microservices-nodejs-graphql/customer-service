import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerFilter } from "src/customers/domain/filters/customer.filter";
import { CustomerRepository } from "src/customers/infraestructure/ports/out/repositories/customer.repository";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export class CustomerRepositoryTypeorm implements CustomerRepository {
    constructor(@InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>) {}

    async getAll(filter: CustomerFilter): Promise<CustomerEntity[]> {
        const query = await this.buildQueryGetAll(filter);

        let items;
        if(filter.skip && filter.take) {
            items = await query.skip(filter.take * (filter.skip-1)).take(filter.take).getMany();
        } else {
            items = await query.getMany(); 
        }

        return items;
    }

    async countGetAll(filter: CustomerFilter): Promise<number> {
        const query = await this.buildQueryGetAll(filter);
        return await query.getCount();
    }

    private async buildQueryGetAll(filter: CustomerFilter) {
        let query = this.customerRepository
        .createQueryBuilder("c")
        .select([
            "c.id",
            "c.numberDocument",
            "c.bussinessName",
            "c.name",
            "c.lastname",
            "ct.id",
            "ct.name",
            "ct.description"
        ])
        .leftJoin("c.customerTypeEntity", "ct", "ct.logState = :logState", { logState: 1 })
        .where("c.logState = :logState", {"logState": 1})
        .orderBy("c.id");

        if (filter.id) {
            query = query.andWhere("c.id = :id", {"id": filter.id});
        }

        if (filter.numberDocument) {
            query = query.andWhere("LOWER(c.numberDocument) like :numberDocument", {"numberDocument": `%${filter.numberDocument.toLowerCase()}%`});
        }

        if (filter.bussinessName) {
            query = query.andWhere("LOWER(c.bussinessName) like :bussinessName", {"bussinessName": `%${filter.bussinessName.toLowerCase()}%`});
        }

        if (filter.name) {
            query = query.andWhere("LOWER(c.name) like :name", {"name": `%${filter.name.toLowerCase()}%`});
        }

        if (filter.lastname) {
            query = query.andWhere("LOWER(c.lastname) like :lastname", {"lastname": `%${filter.lastname.toLowerCase()}%`});
        }

        return query;
    }
}