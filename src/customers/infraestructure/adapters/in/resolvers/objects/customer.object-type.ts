import { Field, Float, ObjectType } from "@nestjs/graphql";
import { CustomerTypeObjectType } from "./customer-type.object-type";

@ObjectType()
export class CustomerObjectType {
    @Field(type => Float, {nullable: true})
    id: number;

    @Field(type => CustomerTypeObjectType, {nullable: true})
    customerType: CustomerTypeObjectType;

    @Field({nullable: true})
    numberDocument: string;

    @Field({nullable: true})
    bussinessName: string;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    lastname: string;
}