import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class DebitToAccountInputType {
    @Field(type => Float, {nullable: true})
    readonly id: number;

    @Field()
    readonly mount: string;
}