import { Account } from "src/customers/domain/models/account";
import { AccountObjectType } from "../objects/account.object-type";
import { CustomerAccount } from "src/customers/domain/models/customer-account";
import { CustomerAccountObjectType } from "../objects/customer-account.object-type";
import { Customer } from "src/customers/domain/models/customer";
import { CustomerObjectType } from "../objects/customer.object-type";

export class CustomerAccountMapper {
    public static toDomain(customerAccountInput): CustomerAccount {
        return this.mapToDomain(customerAccountInput);
    }

    public static toObjectType(customerAccount: CustomerAccount): CustomerAccountObjectType {
        return this.mapToObjectType(customerAccount);
    }

    public static toObjectTypeList(customerAccounts: CustomerAccount[]): CustomerAccountObjectType[] {
        return customerAccounts.map(x => this.mapToObjectType(x));
    }

    private static mapToDomain(customerAccountInput): CustomerAccount {
        const customerAccount = new CustomerAccount();
        customerAccount.id = customerAccountInput.id;
        customerAccount.mount = customerAccountInput.mount;
        customerAccount.customer = new Customer();
        customerAccount.customer.id = customerAccountInput.customerId;
        customerAccount.account = new Account();
        customerAccount.account.id = customerAccountInput.accountId;

        return customerAccount;
    }

    private static mapToObjectType(customerAccount: CustomerAccount): CustomerAccountObjectType {
        const customerAccountObjectType = new CustomerAccountObjectType();
        customerAccountObjectType.id = customerAccount.id;
        customerAccountObjectType.mount = customerAccount.mount;
        customerAccountObjectType.status = customerAccount.status;

        if (customerAccount.customer) {
            customerAccountObjectType.customer = new CustomerObjectType();
            customerAccountObjectType.customer.id = customerAccount.customer.id;
            customerAccountObjectType.customer.numberDocument = customerAccount.customer.numberDocument;
            customerAccountObjectType.customer.bussinessName = customerAccount.customer.bussinessName;
            customerAccountObjectType.customer.name = customerAccount.customer.name;
            customerAccountObjectType.customer.lastname = customerAccount.customer.lastname;
        }

        if (customerAccount.account) {
            customerAccountObjectType.account = new AccountObjectType();
            customerAccountObjectType.account.id = customerAccount.account.id;
            customerAccountObjectType.account.name = customerAccount.account.name;
            customerAccountObjectType.account.openingBalance = customerAccount.account.openingBalance;
        }

        return customerAccountObjectType;
    }
}