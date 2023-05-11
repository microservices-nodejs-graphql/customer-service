import { Account } from "src/customers/domain/models/account";
import { AccountEntity } from "src/customers/infraestructure/adapters/out/entities/account.entity";

export class AccountEntityMapper {
    public static toEntity(account: Account): AccountEntity {
        return this.maptoEntity(account);
    }

    public static toDomain(accountEntity: AccountEntity): Account {
        return this.mapToDomain(accountEntity);
    }

    public static toDomainList(accountEntities: AccountEntity[]): Account[] {
        return accountEntities.map(x => this.mapToDomain(x));
    }
    
    private static maptoEntity(account: Account): AccountEntity {
        const accountEntity = new AccountEntity();
        accountEntity.id = account.id;    
        accountEntity.name = account.name;
        accountEntity.openingBalance = account.openingBalance;

        return accountEntity;
    }

    private static mapToDomain(accountEntity: AccountEntity): Account {
        const account = new Account();
        account.id = accountEntity.id;
        account.name = accountEntity.name;
        account.openingBalance = accountEntity.openingBalance;

        return account;
    }
}