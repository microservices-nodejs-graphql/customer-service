import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MessageBrokerUseCase } from "src/customers/application/message-broker.usecase";
import { MessageBrokerPort } from "src/customers/infraestructure/ports/in/message-broker.port";

@Controller()
export class KafkaMessageBrokerEvent {
    constructor(
        @Inject(MessageBrokerUseCase) private readonly messageBrokerPort: MessageBrokerPort
        ) {}

    @MessagePattern('topic-account-service')
    async consumeEvent(@Payload() payload: any) {
        const obj = JSON.parse(JSON.stringify(payload));
        this.messageBrokerPort.update(obj.tableName, obj.message);
    }
}