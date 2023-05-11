import { Column, Entity, PrimaryColumn } from "typeorm";
import { Sequence } from "./decorators/sequence.decorator";

@Entity({name: "public.accounts"})
export class AccountEntity {
    @PrimaryColumn({name: "id"})
    @Sequence('public.seq_accounts')
    id: number;

    @Column({name: "name"})
    name: string;

    @Column({name: "opening_balance"})
    openingBalance: string;

    @Column({name: "log_state"})
    logState: number;
}