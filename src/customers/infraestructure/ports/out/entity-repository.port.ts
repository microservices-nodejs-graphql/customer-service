import {EntityTarget} from "typeorm";

export interface EntityRepositoryPort {
    getById<T>(id: number, entityTarget: EntityTarget<T>): Promise<T>;
    getByFields<T>(fields: {}, entityTarget: EntityTarget<T>): Promise<T>;
    save<T>(entity, entityTarget: EntityTarget<T>): Promise<T>
    update<T>(entity, entityTarget: EntityTarget<T>): Promise<T>;
    delete<T>(entity, entityTarget: EntityTarget<T>): Promise<T>;
}