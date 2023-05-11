import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AccountObjectType {
    @Field(type => Float, {nullable: true})
    id: number;

    @Field({nullable: true})
    name: string;

    @Field(type => Float, {nullable: true})
    openingBalance: string;
}