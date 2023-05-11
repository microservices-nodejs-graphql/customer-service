import { Account } from "src/customers/domain/models/account";
import { AccountObjectType } from "../objects/account.object-type";

export class AccountMapper {
    public static toDomain(accountInput): Account {
        return this.mapToDomain(accountInput);
    }

    public static toObjectType(account: Account): AccountObjectType {
        return this.mapToObjectType(account);
    }

    public static toObjectTypeList(accounts: Account[]): AccountObjectType[] {
        return accounts.map(x => this.mapToObjectType(x));
    }

    private static mapToDomain(accountInput): Account {
        const account = new Account();
        account.id = accountInput.id;
        account.name = accountInput.name;
        account.openingBalance = accountInput.openingBalance;

        return account;
    }

    private static mapToObjectType(account: Account): AccountObjectType {
        const accountObjectType = new AccountObjectType();
        accountObjectType.id = account.id;
        accountObjectType.name = account.name;
        accountObjectType.openingBalance = account.openingBalance;

        return accountObjectType;
    }
}