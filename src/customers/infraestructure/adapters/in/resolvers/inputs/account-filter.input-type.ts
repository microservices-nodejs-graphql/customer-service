import { Field, Float, InputType } from "@nestjs/graphql";
import { PaginationInputType } from "./pagination.input-type";

@InputType()
export class AccountFilterInputType extends PaginationInputType {
    @Field(type => Float, {nullable: true})
    readonly id: number;

    @Field({nullable: true})
    readonly name: string;
}