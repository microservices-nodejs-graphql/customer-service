import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Customer } from "../domain/models/customer";
import { CreateCustomerPort } from "../infraestructure/ports/in/create-customer.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { CustomerEntityMapper } from "./mappers/customer-entity.mapper";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { CustomerValidation } from "./validations/customer.validation";
import { CustomerEntity } from "../infraestructure/adapters/out/entities/customer.entity";

@Injectable()
export class CreateCustomerUseCase implements CreateCustomerPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerValidation: CustomerValidation
    ) {
        this.properties = require("./utils/messages.util");
    }

    async createCustomer(customer: Customer) {
        await this.customerValidation.validateCreateCustomer(customer);
        try {
            let entity = await this.entityRepositoryPort.save(CustomerEntityMapper.toEntity(customer), CustomerEntity)
            return CustomerEntityMapper.toDomain(entity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_CREATE_CUSTOMER,
                this.properties.get('exception.customer.create.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}