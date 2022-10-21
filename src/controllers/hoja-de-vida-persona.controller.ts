import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HojaDeVida,
  Persona,
} from '../models';
import {HojaDeVidaRepository} from '../repositories';

export class HojaDeVidaPersonaController {
  constructor(
    @repository(HojaDeVidaRepository)
    public hojaDeVidaRepository: HojaDeVidaRepository,
  ) { }

  @get('/hoja-de-vidas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to HojaDeVida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof HojaDeVida.prototype.id,
  ): Promise<Persona> {
    return this.hojaDeVidaRepository.persona(id);
  }
}
