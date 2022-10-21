import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Foto,
  Persona,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoPersonaController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Foto.prototype.id,
  ): Promise<Persona> {
    return this.fotoRepository.persona(id);
  }
}
