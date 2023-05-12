import { Account } from "src/customers/domain/models/account";
import { Customer } from "src/customers/domain/models/customer";
import { CustomerAccount } from "src/customers/domain/models/customer-account";
import { AccountEntity } from "src/customers/infraestructure/adapters/out/entities/account.entity";
import { CustomerAccountEntity } from "src/customers/infraestructure/adapters/out/entities/customer-account.entity";
import { CustomerEntity } from "src/customers/infraestructure/adapters/out/entities/customer.entity";

export class CustomerAccountEntityMapper {
    public static toEntity(customerAccount: CustomerAccount): CustomerAccountEntity {
        return this.maptoEntity(customerAccount);
    }

    public static toDomain(customerAccountEntity: CustomerAccountEntity): CustomerAccount {
        return this.mapToDomain(customerAccountEntity);
    }

    public static toDomainList(customerAccounts: CustomerAccountEntity[]): CustomerAccount[] {
        return customerAccounts.map(x => this.mapToDomain(x));
    }
    
    private static maptoEntity(customerAccount: CustomerAccount): CustomerAccountEntity {
        const customerAccountEntity = new CustomerAccountEntity();
        customerAccountEntity.id = customerAccount.id;
        customerAccountEntity.mount = customerAccount.mount;
        customerAccountEntity.status = customerAccount.status;

        if (customerAccount.customer) {
            customerAccountEntity.customerEntity = new CustomerEntity();
            customerAccountEntity.customerEntity.id = customerAccount.customer.id;
        }

        if (customerAccount.account) {
            customerAccountEntity.accountEntity = new AccountEntity();
            customerAccountEntity.accountEntity.id = customerAccount.account.id;
        }

        return customerAccountEntity;
    }

    private static mapToDomain(customerAccountEntity: CustomerAccountEntity): CustomerAccount {
        const customerAccount = new CustomerAccount();
        customerAccount.id = customerAccountEntity.id;
        customerAccount.mount = customerAccountEntity.mount;
        customerAccount.status = customerAccountEntity.status;

        if (customerAccountEntity.customerEntity) {
            customerAccount.customer = new Customer();
            customerAccount.customer.id = customerAccountEntity.customerEntity.id;
            customerAccount.customer.numberDocument = customerAccountEntity.customerEntity.numberDocument;
            customerAccount.customer.bussinessName = customerAccountEntity.customerEntity.bussinessName;
            customerAccount.customer.name = customerAccountEntity.customerEntity.name;
            customerAccount.customer.lastname = customerAccountEntity.customerEntity.lastname;
        }

        if (customerAccountEntity.accountEntity) {
            customerAccount.account = new Account();
            customerAccount.account.id = customerAccountEntity.accountEntity.id;
            customerAccount.account.name = customerAccountEntity.accountEntity.name;
            customerAccount.account.openingBalance = customerAccountEntity.accountEntity.openingBalance;
        }

        return customerAccount;
    }
}