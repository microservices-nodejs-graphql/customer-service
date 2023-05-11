import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { QueryResponse } from "../infraestructure/adapters/in/resolvers/objects/query-response.object-type";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { QueryCustomerPort } from "../infraestructure/ports/in/query-customer.port";
import { CustomerFilter } from "../domain/filters/customer.filter";
import { Customer } from "../domain/models/customer";
import { CustomerRepository } from "../infraestructure/ports/out/repositories/customer.repository";
import { CustomerEntityMapper } from "./mappers/customer-entity.mapper";
import { CustomerRepositoryTypeorm } from "../infraestructure/adapters/out/typeorm/customer-repository.typeorm";

@Injectable()
export class QueryCustomerUseCase implements QueryCustomerPort {
    properties: any;

    constructor(@Inject(CustomerRepositoryTypeorm) private customerRepository: CustomerRepository) {
        this.properties = require('./utils/messages.util');
    }

    async getAll(filter: CustomerFilter): Promise<QueryResponse<Customer>> {
        try {
            const total = await this.customerRepository.countGetAll(filter);
            const items = await this.customerRepository.getAll(filter);
            return new QueryResponse<Customer>(total, filter.skip, filter.take, CustomerEntityMapper.toDomainList(items));
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_GET_ALL_CUSTOMER_TYPE,
                this.properties.get('exception.customer_type.find_all.error'),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}