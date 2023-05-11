export function Sequence(sequenceName: string) {
    return (target: Object, propertyKey: string | symbol) => {
        Reflect.defineMetadata('sequence-name', sequenceName, target, propertyKey);
    };
}