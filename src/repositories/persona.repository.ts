import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, HojaDeVida} from '../models';
import {HojaDeVidaRepository} from './hoja-de-vida.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly hojaDeVidas: HasManyRepositoryFactory<HojaDeVida, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HojaDeVidaRepository') protected hojaDeVidaRepositoryGetter: Getter<HojaDeVidaRepository>,
  ) {
    super(Persona, dataSource);
    this.hojaDeVidas = this.createHasManyRepositoryFactoryFor('hojaDeVidas', hojaDeVidaRepositoryGetter,);
    this.registerInclusionResolver('hojaDeVidas', this.hojaDeVidas.inclusionResolver);
  }
}
