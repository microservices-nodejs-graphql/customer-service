import { Injectable } from "@nestjs/common";
import { CustomerAccountRepository } from "src/customers/infraestructure/ports/out/repositories/customer-account.repository";
import { CustomerAccountEntity } from "../entities/customer-account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerAccountFilter } from "src/customers/domain/filters/customer-account.filter";

@Injectable()
export class CustomerAccountRepositoryTypeorm implements CustomerAccountRepository {
    constructor(@InjectRepository(CustomerAccountEntity) private customerAccountRepository: Repository<CustomerAccountEntity>) {}

    async getAllByCustomer(filter: CustomerAccountFilter): Promise<CustomerAccountEntity[]> {
        let query = this.customerAccountRepository
        .createQueryBuilder("ca")
        .select([
            "ca.id",
            "ca.mount",
            "a.id",
            "a.name"            
        ])
        .innerJoin("ca.accountEntity", "a", "a.logState = :logState", { logState: 1 })
        .orderBy("ca.id");

        if (filter.customerId) {
            query = query.andWhere("ca.customerEntity.id = :customerId", {"customerId": filter.customerId});
        }

        if (filter.status) {
            query = query.andWhere("LOWER(ca.status) like :status", {"status": filter.status})
        }

        return await query.getMany();
    }
}