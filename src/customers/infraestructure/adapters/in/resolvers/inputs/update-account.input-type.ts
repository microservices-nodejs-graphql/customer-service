import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAccountInputType {
    @Field(type => Float)
    readonly id: number;

    @Field()
    readonly name: string;

    @Field({nullable: true})
    readonly openingBalance: string;
}