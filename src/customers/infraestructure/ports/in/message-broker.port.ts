export interface MessageBrokerPort {
    create<T>(tableName: string, entity): Promise<T>;
    update<T>(tableName: string, entity);
}