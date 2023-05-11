import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CustomerTypeObjectType {
    @Field(type => Float, {nullable: true})
    id: number;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    description: string;
}