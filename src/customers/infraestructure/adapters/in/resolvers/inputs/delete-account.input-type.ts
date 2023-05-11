import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteAccountInputType {
    @Field(type => Float)
    readonly id: number;
}