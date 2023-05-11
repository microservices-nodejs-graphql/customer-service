import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Customer } from "src/customers/domain/models/customer";
import { CustomerTypeEntity } from "src/customers/infraestructure/adapters/out/entities/customer-type.entity";
import { PostgresRespositoryAdapter } from "src/customers/infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "src/customers/infraestructure/ports/out/entity-repository.port";
import { BussinessException } from "../exceptions/bussiness.exception";
import { ExceptionEnum } from "../enums/exception.enum";
import { CustomerEntity } from "src/customers/infraestructure/adapters/out/entities/customer.entity";

@Injectable()
export class CustomerValidation {
    properties: any
    constructor(@Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort) {
        this.properties = require('../utils/messages.util');
    }

    async validateCreateCustomer(customer: Customer) {
        let customerTypeEntity = await this.entityRepositoryPort.getById(customer.customerType.id, CustomerTypeEntity);
        if (!customerTypeEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER_TYPE,
                this.properties.get('validation.customer_type.not_found'),
                HttpStatus.NOT_FOUND
            );
        }

        let customerEntity = await this.entityRepositoryPort.getByFields({ "numberDocument": customer.numberDocument }, CustomerEntity);
        if (customerEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_NUMBER_DOCUMENT_CUSTOMER,
                this.properties.get('validation.customer.number_document.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async validateUpdateCustomer(customer: Customer) {
        let customerEntity = await this.entityRepositoryPort.getById(customer.id, CustomerEntity);
        if (!customerEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER,
                this.properties.get('validation.customer.not_found'),
                HttpStatus.NOT_FOUND
            );
        }

        let customerTypeEntity = await this.entityRepositoryPort.getById(customer.customerType?.id, CustomerTypeEntity);
        if (!customerTypeEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER_TYPE,
                this.properties.get('validation.customer_type.not_found'),
                HttpStatus.NOT_FOUND
            );
        }

        let customerEntityExits = await this.entityRepositoryPort.getByFields({ "numberDocument": customer.numberDocument }, CustomerEntity);
        if (customerEntityExits && customerEntity.id !== customerEntityExits.id) {
            throw new BussinessException(
                ExceptionEnum.ERROR_EXIST_NUMBER_DOCUMENT_CUSTOMER,
                this.properties.get('validation.customer.number_document.exist'),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async validateDeleteCustomer(customer: Customer) {
        let customerEntity = await this.entityRepositoryPort.getById(customer.id, CustomerEntity);
        if (!customerEntity) {
            throw new BussinessException(
                ExceptionEnum.ERROR_NOT_FOUND_CUSTOMER,
                this.properties.get('validation.customer.not_found'),
                HttpStatus.NOT_FOUND);
        }
    }
}