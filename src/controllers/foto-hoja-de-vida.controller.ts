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
  HojaDeVida,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoHojaDeVidaController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/hoja-de-vida', {
    responses: {
      '200': {
        description: 'HojaDeVida belonging to Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HojaDeVida)},
          },
        },
      },
    },
  })
  async getHojaDeVida(
    @param.path.string('id') id: typeof Foto.prototype.id,
  ): Promise<HojaDeVida> {
    return this.fotoRepository.hojaDeVida(id);
  }
}
