export interface IRepository {
    exists(id: string): Promise<boolean>
}