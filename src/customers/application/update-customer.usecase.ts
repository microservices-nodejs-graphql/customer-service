import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Customer } from "../domain/models/customer";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { CustomerEntityMapper } from "./mappers/customer-entity.mapper";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ExceptionEnum } from "./enums/exception.enum";
import { CustomerValidation } from "./validations/customer.validation";
import { CustomerEntity } from "../infraestructure/adapters/out/entities/customer.entity";
import { UpdateCustomerPort } from "../infraestructure/ports/in/update-customer.port";

@Injectable()
export class UpdateCustomerUseCase implements UpdateCustomerPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort,
        private readonly customerValidation: CustomerValidation
    ) {
        this.properties = require("./utils/messages.util");
    }

    async updateCustomer(customer: Customer) {
        await this.customerValidation.validateUpdateCustomer(customer);
        try {
            let customerEntity = await this.entityRepositoryPort.getById(customer.id, CustomerEntity);
            if (customer.numberDocument) {
                customerEntity.numberDocument = customer.numberDocument;
            }

            if (customer.bussinessName) {
                customerEntity.bussinessName = customer.bussinessName;
            }

            if (customer.name) {
                customerEntity.name = customer.name;
            }

            if (customer.lastname) {
                customerEntity.lastname = customer.lastname
            }
            customerEntity = await this.entityRepositoryPort.update(customerEntity, CustomerEntity)
            return CustomerEntityMapper.toDomain(customerEntity);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_UPDATE_CUSTOMER,
                this.properties.get('exception.customer.update.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}