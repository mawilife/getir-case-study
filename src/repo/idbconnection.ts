export default interface IDBConnection {
    connect(): void;
    end(): void;
}