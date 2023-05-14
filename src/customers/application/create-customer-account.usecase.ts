import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CustomerAccount } from "../domain/models/customer-account";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { CreateCustomerAccountPort } from "../infraestructure/ports/in/create-customer-account.port";
import { CustomerAccountValidation } from "./validations/customer-account.validation";
import { CustomerAccountEntity } from "../infraestructure/adapters/out/entities/customer-account.entity";
import { CustomerAccountEntityMapper } from "./mappers/customer-account.mapper";
import { ExceptionEnum } from "./enums/exception.enum";
import { BussinessException } from "./exceptions/bussiness.exception";
import { ClientProxy } from "@nestjs/microservices";
import { ConfigService } from "src/config/config.service";
import { KafkaEventMessageAdapter } from "../infraestructure/adapters/out/kafka-event-message.adapter";
import { EventMessagePort } from "../infraestructure/ports/out/event-message.port";

@Injectable()
export class CreateCustomerAccountUseCase implements CreateCustomerAccountPort {
    properties: any;

    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort,
        @Inject(KafkaEventMessageAdapter) private readonly eventMessagePort: EventMessagePort,
        private readonly customerAccountValidation: CustomerAccountValidation,
        private readonly configService: ConfigService
    ) {
        this.properties = require('./utils/messages.util');
    }

    async createCustomerAccount(customerAccount: CustomerAccount): Promise<CustomerAccount> {
        await this.customerAccountValidation.validateCreateCustomerAccount(customerAccount);
        
        let customerAccountEntity;
        let message = "";
        try {
            customerAccountEntity = CustomerAccountEntityMapper.toEntity(customerAccount);
            customerAccountEntity.mount = "0.0";
            customerAccountEntity.status = "CREATED";
            customerAccountEntity = await this.entityRepositoryPort.save(customerAccountEntity, CustomerAccountEntity)
            message = JSON.stringify({"message": customerAccountEntity, "tableName": "customers_accounts"});
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_CREATE_CUSTOMER_ACCOUNT,
                this.properties.get('exception.customer_account.create.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        try {
            this.eventMessagePort.sendMessage(this.configService.get('KAFKA_PRODUCER_TOPIC'), message);
        } catch (ex) {
            throw new BussinessException(
                ExceptionEnum.ERROR_SEND_ACCOUNT_MESSAGE,
                this.properties.get('exception.account.send.error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        return CustomerAccountEntityMapper.toDomain(customerAccountEntity);
    }
}