import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class QueryResponse<T> {
  constructor(total: number, skip: number, take: number, items: T[]) {
    this.total = total;
    this.skip = skip;
    this.take = take;
    this.items = items;
  }
  
  @Field(type => Int)
  total: number;

  @Field(type => Int)
  skip: number;

  @Field(type => Int)
  take: number;

  items: T[];
}