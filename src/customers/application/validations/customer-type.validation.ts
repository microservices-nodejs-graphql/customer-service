import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CustomerType } from "src/customers/domain/models/customer-type";
import { CustomerTypeEntity } from "src/customers/infraestructure/adapters/out/entities/customer-type.entity";
import { PostgresRespositoryAdapter } from "src/customers/infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "src/customers/infraestructure/ports/out/entity-repository.port";
import { BussinessException } from "../exceptions/bussiness.exception";
import { ExceptionEnum } from "../enums/exception.enum";
import { CustomerEntity } from "src/customers/infraestructure/adapters/out/entities/customer.entity";

@Injectable()
export class CustomerTypeValidation {
    properties: any
    constructor(@Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort) {
        this.properties = require('../utils/messages.util');
    }

    async validateCreateCustomerType(customerType: CustomerType) {
        let customerTypeEntity = await this.entityRepositoryPort.getByFields({ "name": customerType.name }, CustomerTypeEntity);
        if (customerTypeEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_NAME_CUSTOMER_TYPE,
                this.properties.get('validation.customer-type.name.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async validateUpdateCustomerType(customerType: CustomerType) {
        let customerTypeEntity = await this.entityRepositoryPort.getById(customerType.id, CustomerTypeEntity);
        if (!customerTypeEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER_TYPE,
                this.properties.get('validation.customer_type.not_found'),
                HttpStatus.NOT_FOUND);
        }

        let customerTypeEntityExits = await this.entityRepositoryPort.getByFields({ "name": customerType.name }, CustomerTypeEntity);
        if (customerTypeEntityExits && customerTypeEntity.id !== customerTypeEntityExits.id) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_NAME_CUSTOMER_TYPE,
                this.properties.get('validation.customer-type.name.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async validateDeleteCustomerType(customerType: CustomerType) {
        let customerTypeEntity = await this.entityRepositoryPort.getById(customerType.id, CustomerTypeEntity);
        if (!customerTypeEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER_TYPE,
                this.properties.get('validation.customer_type.not_found'),
                HttpStatus.NOT_FOUND);
        }

        let customerEntity = await this.entityRepositoryPort.getByFields({
            "customerTypeEntity": {
                "id": customerType.id
            }
        }, CustomerEntity);

        if (customerEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_CUSTOMERS_CUSTOMER_TYPE,
                this.properties.get('validation.customer-type.customers.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}