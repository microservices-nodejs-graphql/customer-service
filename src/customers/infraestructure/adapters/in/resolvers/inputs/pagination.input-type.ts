import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PaginationInputType {
    @Field(type => Int, { defaultValue: 1, nullable: true })
    skip: number;
  
    @Field(type => Int, { defaultValue: 10, nullable: true })
    take: number;
}