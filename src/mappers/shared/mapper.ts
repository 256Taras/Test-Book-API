export interface IMapper<DomainModel, DatabaseSchema, ResponseDTO> {
    toPersistence(domainModel: DomainModel): DatabaseSchema;
    toDomain(raw: DatabaseSchema): DomainModel;
    toResponseDTO(domainModel: DomainModel): ResponseDTO;
}