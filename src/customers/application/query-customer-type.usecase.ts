import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { QueryCustomerTypePort } from "../infraestructure/ports/in/query-customer-type.port";
import { CustomerType } from "../domain/models/customer-type";
import { CustomerTypeRepositoryTypeorm } from "../infraestructure/adapters/out/typeorm/customer-type-repository.typeorm";
import { CustomerTypeRepository } from "../infraestructure/ports/out/repositories/customer-type.repository";
import { CustomerTypeEntityMapper } from "./mappers/customer-type-entity.mapper";
import { QueryResponse } from "../infraestructure/adapters/in/resolvers/objects/query-response.object-type";
import { CustomerTypeFilter } from "../domain/filters/customer-type.filter";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";

@Injectable()
export class QueryCustomerTypeUseCase implements QueryCustomerTypePort {
    properties: any;

    constructor(@Inject(CustomerTypeRepositoryTypeorm) private customerTypeRepository: CustomerTypeRepository) {
        this.properties = require('./utils/messages.util');
    }

    async getAll(filter: CustomerTypeFilter): Promise<QueryResponse<CustomerType>> {
        try {
            const total = await this.customerTypeRepository.countGetAll(filter);
            const items = await this.customerTypeRepository.getAll(filter);
            return new QueryResponse<CustomerType>(total, filter.skip, filter.take, CustomerTypeEntityMapper.toDomainList(items));
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_GET_ALL_CUSTOMER_TYPE,
                this.properties.get('exception.customer_type.find_all.error'),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}