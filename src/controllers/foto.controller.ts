import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Foto} from '../models';
import {FotoRepository} from '../repositories';

export class FotoController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository : FotoRepository,
  ) {}

  @post('/fotos')
  @response(200, {
    description: 'Foto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Foto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFoto',
            exclude: ['id'],
          }),
        },
      },
    })
    foto: Omit<Foto, 'id'>,
  ): Promise<Foto> {
    return this.fotoRepository.create(foto);
  }

  @get('/fotos/count')
  @response(200, {
    description: 'Foto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Foto) where?: Where<Foto>,
  ): Promise<Count> {
    return this.fotoRepository.count(where);
  }

  @get('/fotos')
  @response(200, {
    description: 'Array of Foto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Foto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Foto) filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.fotoRepository.find(filter);
  }

  @patch('/fotos')
  @response(200, {
    description: 'Foto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Foto,
    @param.where(Foto) where?: Where<Foto>,
  ): Promise<Count> {
    return this.fotoRepository.updateAll(foto, where);
  }

  @get('/fotos/{id}')
  @response(200, {
    description: 'Foto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Foto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Foto, {exclude: 'where'}) filter?: FilterExcludingWhere<Foto>
  ): Promise<Foto> {
    return this.fotoRepository.findById(id, filter);
  }

  @patch('/fotos/{id}')
  @response(204, {
    description: 'Foto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Foto,
  ): Promise<void> {
    await this.fotoRepository.updateById(id, foto);
  }

  @put('/fotos/{id}')
  @response(204, {
    description: 'Foto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() foto: Foto,
  ): Promise<void> {
    await this.fotoRepository.replaceById(id, foto);
  }

  @del('/fotos/{id}')
  @response(204, {
    description: 'Foto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fotoRepository.deleteById(id);
  }
}
