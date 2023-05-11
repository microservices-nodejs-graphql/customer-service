import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateCustomerTypePort } from "../infraestructure/ports/in/create-customer-type.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { CustomerType } from "../domain/models/customer-type";
import { CustomerTypeEntityMapper } from "./mappers/customer-type-entity.mapper";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { CustomerTypeEntity } from "../infraestructure/adapters/out/entities/customer-type.entity";
import { CustomerTypeValidation } from "./validations/customer-type.validation";

@Injectable()
export class CreateCustomerTypeUseCase implements CreateCustomerTypePort{
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerTypeValidation: CustomerTypeValidation) {
        this.properties = require('./utils/messages.util');
    }

    async createCustomerType(customerType: CustomerType): Promise<CustomerType> {       
        await this.customerTypeValidation.validateCreateCustomerType(customerType);

        try {
            let entity = await this.entityRepositoryPort.save(CustomerTypeEntityMapper.toEntity(customerType), CustomerTypeEntity)
            return CustomerTypeEntityMapper.toDomain(entity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_CREATE_CUSTOMER_TYPE,
                this.properties.get('exception.customer_type.create.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}