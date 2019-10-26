import { Result } from './../../utils/Result';

export interface IDomainPersistenceMapper<DomainModel, DatabaseSchema> {
    toPersistence(domainModel: DomainModel): DatabaseSchema;
    toDomain(raw: DatabaseSchema): Result<DomainModel>;
}

export interface IDomainDTOMapper<DomainModel, RequestDTO, ResponseDTO> {
    toResponseDTO(domainModel: DomainModel): ResponseDTO;
    toDomain(requestDTO: RequestDTO): Result<DomainModel>;
}