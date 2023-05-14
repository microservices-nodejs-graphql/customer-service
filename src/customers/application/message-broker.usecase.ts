import { Inject, Injectable } from "@nestjs/common";
import { MessageBrokerPort } from "../infraestructure/ports/in/message-broker.port";
import { EntityRepositoryPort } from "../infraestructure/ports/out/entity-repository.port";
import { PostgresRespositoryAdapter } from "../infraestructure/adapters/out/postgres-repository.adapter";
import { CustomerAccountEntity } from "../infraestructure/adapters/out/entities/customer-account.entity";

@Injectable()
export class MessageBrokerUseCase implements MessageBrokerPort {
    constructor(
        @Inject(PostgresRespositoryAdapter) private readonly entityRepositoryPort: EntityRepositoryPort
    ) { }

    create<T>(tableName: string, entity: any): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async update<T>(tableName: string, entity: any) {
        if (tableName === "customers_accounts") {
            const customerAccountEntity = await this.entityRepositoryPort.getById(entity.id, CustomerAccountEntity);
            customerAccountEntity.status = entity.status;
            this.entityRepositoryPort.update(customerAccountEntity, CustomerAccountEntity);
        }        
    }
}