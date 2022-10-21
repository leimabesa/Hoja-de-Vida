import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {HojaDeVida, HojaDeVidaRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class HojaDeVidaRepository extends DefaultCrudRepository<
  HojaDeVida,
  typeof HojaDeVida.prototype.id,
  HojaDeVidaRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof HojaDeVida.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(HojaDeVida, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
