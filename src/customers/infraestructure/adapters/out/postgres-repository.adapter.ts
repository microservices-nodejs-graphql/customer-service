import { Injectable } from "@nestjs/common";
import { EntityRepositoryPort } from "../../ports/out/entity-repository.port";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, EntityTarget, FindOneOptions, FindOptionsWhere } from "typeorm";

@Injectable()
export class PostgresRespositoryAdapter implements EntityRepositoryPort {

  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {

  }

  async getById<T>(id: number, entityTarget: EntityTarget<T>): Promise<T> {
    const findOptions: FindOneOptions<T> = {
      where: {
        id,
        "logState": 1
      } as unknown as FindOptionsWhere<T>,
    };

    const repository = this.entityManager.getRepository<T>(entityTarget);
    return repository.findOne(findOptions);
  }

  async getByFields<T>(fields: {}, entityTarget: EntityTarget<T>): Promise<T> {
    const findOptions: FindOneOptions<T> = {
      where: {
        ...fields,
        "logState": 1
      } as unknown as FindOptionsWhere<T>,
    };

    const repository = this.entityManager.getRepository<T>(entityTarget);
    return repository.findOne(findOptions);
  }

  async save<T>(entity, entityTarget: EntityTarget<T>) {
    console.log(entity);
    const sequenceName = Reflect.getMetadata('sequence-name', entity, 'id');
    entity.id = await this.getId(sequenceName);
    entity.logState = 1;
    this.entityManager.connection.manager.save(entity);
    return entity;
  }

  async update<T>(entity, entityTarget: EntityTarget<T>) {
    this.entityManager.connection.manager.save(entityTarget, entity);
    return entity;
  }

  async delete<T>(entity, entityTarget: EntityTarget<T>) {
    this.entityManager.connection.manager.save(entityTarget, entity);
    return entity;
  }

  private async getId(sequenceName: string) {
    const nextval = await this.entityManager.connection.manager.query(`select nextval('${sequenceName}') as id`);
    return +nextval[0].id;
  }
}

/*
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectEntityManager } from '@nestjs/typeorm';
import { Connection, EntityManager, TransactionManager } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @TransactionManager()
  async createOrder(
    products: Product[],
    @TransactionManager() transactionManager?: EntityManager,
  ): Promise<Order> {
    const orderRepository = transactionManager.getRepository(Order);
    const productRepository = transactionManager.getRepository(Product);

    // Crear la orden
    const order = new Order();
    order.products = products;
    await orderRepository.save(order);

    // Actualizar la cantidad de productos
    for (const product of products) {
      product.quantity -= 1;
      if (product.quantity < 0) {
        throw new Error('No hay suficientes productos disponibles.');
      }
      await productRepository.save(product);
    }

    // Devolver la orden creada
    return order;
  }

  async createOrderWithTransaction(products: Product[]): Promise<Order> {
    return this.connection.transaction(async (transactionManager) => {
      const order = await this.createOrder(products, transactionManager);
      return order;
    });
  }
}
*/