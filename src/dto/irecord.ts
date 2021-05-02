export default interface IRecord {
    key: string
    createdAt: Date
    counts: Array<number>
    totalCount: number
}