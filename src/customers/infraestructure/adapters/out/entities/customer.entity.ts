import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Sequence } from "./decorators/sequence.decorator";
import { CustomerTypeEntity } from "./customer-type.entity";

@Entity({name: "public.customers"})
export class CustomerEntity {
    @PrimaryColumn({name: "id"})
    @Sequence('public.seq_customers')
    id: number;

    @OneToOne(type => CustomerTypeEntity)
    @JoinColumn({name: "customer_type_id"})
    customerTypeEntity: CustomerTypeEntity;

    @Column({name: "number_document"})
    numberDocument: string;

    @Column({name: "bussiness_name"})
    bussinessName: string;

    @Column({name: "name"})
    name: string;

    @Column({name: "lastname"})
    lastname: string;

    @Column({name: "log_state"})
    logState: number;
}