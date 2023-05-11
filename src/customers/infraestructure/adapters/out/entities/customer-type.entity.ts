import { Column, Entity, PrimaryColumn } from "typeorm";
import { Sequence } from "./decorators/sequence.decorator";

@Entity({name: "public.customer_types"})
export class CustomerTypeEntity {
    @PrimaryColumn({name: "id"})
    @Sequence('public.seq_customer_types')
    id: number;

    @Column({name: "name"})
    name: string;

    @Column({name: "description"})
    description: string;

    @Column({name: "log_state"})
    logState: number;
}