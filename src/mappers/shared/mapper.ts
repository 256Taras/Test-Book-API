export interface IMapper<DomainModel, DatabaseSchema> {
    toPersistence(domainModel: DomainModel): DatabaseSchema;
    toDomain(raw: DatabaseSchema): DomainModel;
}