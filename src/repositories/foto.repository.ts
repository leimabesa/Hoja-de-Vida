import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Foto, FotoRelations, Persona, HojaDeVida} from '../models';
import {PersonaRepository} from './persona.repository';
import {HojaDeVidaRepository} from './hoja-de-vida.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Foto.prototype.id>;

  public readonly hojaDeVida: BelongsToAccessor<HojaDeVida, typeof Foto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('HojaDeVidaRepository') protected hojaDeVidaRepositoryGetter: Getter<HojaDeVidaRepository>,
  ) {
    super(Foto, dataSource);
    this.hojaDeVida = this.createBelongsToAccessorFor('hojaDeVida', hojaDeVidaRepositoryGetter,);
    this.registerInclusionResolver('hojaDeVida', this.hojaDeVida.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
