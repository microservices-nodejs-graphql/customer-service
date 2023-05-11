import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { CustomerType } from "../domain/models/customer-type";
import { CustomerTypeEntityMapper } from "./mappers/customer-type-entity.mapper";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { UpdateCustomerTypePort } from "../infraestructure/ports/in/update-customer-type.port";
import { CustomerTypeEntity } from "../infraestructure/adapters/out/entities/customer-type.entity";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { CustomerTypeValidation } from "./validations/customer-type.validation";

@Injectable()
export class UpdateCustomerTypeUseCase implements UpdateCustomerTypePort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerTypeValidation: CustomerTypeValidation
        ) {
        this.properties = require('./utils/messages.util');
    }

    async updateCustomerType(customerType: CustomerType): Promise<CustomerType> {
        await this.customerTypeValidation.validateUpdateCustomerType(customerType);

        try {
            let customerTypeEntity = await this.entityRepositoryPort.getById(customerType.id, CustomerTypeEntity);
            if (customerType.name) {
                customerTypeEntity.name = customerType.name;
            }
    
            if (customerType.description) {
                customerTypeEntity.description = customerType.description;
            }
            customerTypeEntity = await this.entityRepositoryPort.update(customerTypeEntity, CustomerTypeEntity);
            return CustomerTypeEntityMapper.toDomain(customerTypeEntity);
        } catch(ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_UPDATE_CUSTOMER_TYPE,
                this.properties.get('exception.customer_type.update.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }        
    }
}