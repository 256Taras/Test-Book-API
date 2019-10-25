export interface IDomainPersistenceMapper<DomainModel, DatabaseSchema> {
    toPersistence(domainModel: DomainModel): DatabaseSchema;
    toDomain(raw: DatabaseSchema): DomainModel;
}

export interface IDomainResponseDTOMapper<DomainModel, ResponseDTO> {
    toResponseDTO(domainModel: DomainModel):ResponseDTO;
}