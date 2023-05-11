import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { DeleteCustomerPort } from "../infraestructure/ports/in/delete-customer.port";
import { CustomerValidation } from "./validations/customer.validation";
import { Customer } from "../domain/models/customer";
import { CustomerEntity } from "../infraestructure/adapters/out/entities/customer.entity";
import { CustomerEntityMapper } from "./mappers/customer-entity.mapper";

@Injectable()
export class DeleteCustomerUseCase implements DeleteCustomerPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerValidation: CustomerValidation) {
        this.properties = require('./utils/messages.util');
    }

    async deleteCustomer(customer: Customer): Promise<Customer> {
        await this.customerValidation.validateDeleteCustomer(customer);
        try {
            let customerEntity = await this.entityRepositoryPort.getById(customer.id, CustomerEntity);
            customerEntity.logState = 0;
            customerEntity = await this.entityRepositoryPort.delete(customerEntity, CustomerEntity);
            return CustomerEntityMapper.toDomain(customerEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_DELETE_CUSTOMER,
                this.properties.get('exception.customer.delete.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }    
}