import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CustomerType } from "../domain/models/customer-type";
import { DeleteCustomerTypePort } from "../infraestructure/ports/in/delete-customer-type.port";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { CustomerTypeEntity } from "../infraestructure/adapters/out/entities/customer-type.entity";
import { CustomerTypeEntityMapper } from "./mappers/customer-type-entity.mapper";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { CustomerTypeValidation } from "./validations/customer-type.validation";

@Injectable()
export class DeleteCustomerTypeUseCase implements DeleteCustomerTypePort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerTypeValidation: CustomerTypeValidation) {
        this.properties = require('./utils/messages.util');
    }

    async deleteCustomerType(customerType: CustomerType): Promise<CustomerType> {
        await this.customerTypeValidation.validateDeleteCustomerType(customerType);
        try {
            let customerTypeEntity = await this.entityRepositoryPort.getById(customerType.id, CustomerTypeEntity);
            customerTypeEntity.logState = 0;
            customerTypeEntity = await this.entityRepositoryPort.delete(customerTypeEntity, CustomerTypeEntity);
            return CustomerTypeEntityMapper.toDomain(customerTypeEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_DELETE_CUSTOMER_TYPE,
                this.properties.get('exception.customer_type.delete.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }    
}