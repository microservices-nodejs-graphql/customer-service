import { Module } from "@nestjs/common";
import { CreateCustomerUseCase } from "./application/create-customer.usecase";
import { PostgresRespositoryAdapter } from "./infraestructure/adapters/out/postgres-repository.adapter";
import { CreateCustomerTypeUseCase } from "./application/create-customer-type.usecase";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CustomerTypeResolver } from "./infraestructure/adapters/in/resolvers/customer-type.resolver";
import { QueryCustomerTypeUseCase } from "./application/query-customer-type.usecase";
import { CustomerTypeRepositoryTypeorm } from "./infraestructure/adapters/out/typeorm/customer-type-repository.typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "./infraestructure/adapters/out/entities/customer.entity";
import { CustomerTypeEntity } from "./infraestructure/adapters/out/entities/customer-type.entity";
import { UpdateCustomerTypeUseCase } from "./application/update-customer-type.usecase";
import { DeleteCustomerTypeUseCase } from "./application/delete-customer-type.usecase";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "./application/exceptions/http-error.filter";
import { CustomerResolver } from "./infraestructure/adapters/in/resolvers/customer.resolver";
import { CustomerValidation } from "./application/validations/customer.validation";
import { CustomerTypeValidation } from "./application/validations/customer-type.validation";
import { UpdateCustomerUseCase } from "./application/update-customer.usecase";
import { DeleteCustomerUseCase } from "./application/delete-customer.usecase";
import { QueryCustomerUseCase } from "./application/query-customer.usecase";
import { CustomerRepositoryTypeorm } from "./infraestructure/adapters/out/typeorm/customer-repository.typeorm";
import { AccountValidation } from "./application/validations/account.validation";
import { CreateAccountUseCase } from "./application/create-account.usecase";
import { AccountResolver } from "./infraestructure/adapters/in/resolvers/account.resolver";
import { AccountEntity } from "./infraestructure/adapters/out/entities/account.entity";
import { UpdateAccountUseCase } from "./application/update-account.usecase";
import { DeleteAccountUsecase } from "./application/delete-account.usecase";
import { AccountRepositoryTypeorm } from "./infraestructure/adapters/out/typeorm/account-repository.typeorm";
import { QueryAccountUseCase } from "./application/query-account.usecase";
import { CustomerAccountEntity } from "./infraestructure/adapters/out/entities/customer-account.entity";
import { CustomerAccountRepositoryTypeorm } from "./infraestructure/adapters/out/typeorm/customer-account-repository.typeorm";
import { CreateCustomerAccountUseCase } from "./application/create-customer-account.usecase";
import { CustomerAccountValidation } from "./application/validations/customer-account.validation";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: 'schema.gql'
        }),
        TypeOrmModule.forFeature([
            AccountEntity,
            CustomerAccountEntity,
            CustomerEntity,
            CustomerTypeEntity
        ])
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        AccountResolver,
        CustomerResolver,
        CustomerTypeResolver,
        CreateCustomerAccountUseCase,
        CreateAccountUseCase,
        UpdateAccountUseCase,
        DeleteAccountUsecase,
        CreateCustomerTypeUseCase,
        UpdateCustomerTypeUseCase,
        DeleteCustomerTypeUseCase,
        CreateCustomerUseCase,
        UpdateCustomerUseCase,
        DeleteCustomerUseCase,
        QueryAccountUseCase,
        QueryCustomerTypeUseCase,
        QueryCustomerUseCase,
        AccountRepositoryTypeorm,
        CustomerAccountRepositoryTypeorm,
        CustomerRepositoryTypeorm,
        CustomerTypeRepositoryTypeorm,
        AccountValidation,
        CustomerValidation,
        CustomerTypeValidation,
        CustomerAccountValidation,
        PostgresRespositoryAdapter
    ],
})
export class CustomerModule { }