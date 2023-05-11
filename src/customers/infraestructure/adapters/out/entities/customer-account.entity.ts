import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Sequence } from "./decorators/sequence.decorator";
import { AccountEntity } from "./account.entity";
import { CustomerEntity } from "./customer.entity";

@Entity({name: "public.customers_accounts"})
export class CustomerAccountEntity {
    @PrimaryColumn({name: "id"})
    @Sequence('public.seq_customers_accounts')
    id: number;

    @OneToOne(type => CustomerEntity)
    @JoinColumn({name: "customer_id"})
    customerEntity: CustomerEntity;

    @OneToOne(type => AccountEntity)
    @JoinColumn({name: "account_id"})
    accountEntity: AccountEntity;

    @Column({name: "mount"})
    mount: string;

    @Column({name: "status"})
    status: string;

    @Column({name: "log_state"})
    logState: number;
}
