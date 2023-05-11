import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCustomerTypeInputType {
    @Field(type => Float)
    readonly id: number;

    @Field()
    readonly name: string;

    @Field({nullable: true})
    readonly description: string;
}