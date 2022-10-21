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
import {HojaDeVida} from '../models';
import {HojaDeVidaRepository} from '../repositories';

export class HojaDeVidaController {
  constructor(
    @repository(HojaDeVidaRepository)
    public hojaDeVidaRepository : HojaDeVidaRepository,
  ) {}

  @post('/hoja-de-vidas')
  @response(200, {
    description: 'HojaDeVida model instance',
    content: {'application/json': {schema: getModelSchemaRef(HojaDeVida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HojaDeVida, {
            title: 'NewHojaDeVida',
            exclude: ['id'],
          }),
        },
      },
    })
    hojaDeVida: Omit<HojaDeVida, 'id'>,
  ): Promise<HojaDeVida> {
    return this.hojaDeVidaRepository.create(hojaDeVida);
  }

  @get('/hoja-de-vidas/count')
  @response(200, {
    description: 'HojaDeVida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HojaDeVida) where?: Where<HojaDeVida>,
  ): Promise<Count> {
    return this.hojaDeVidaRepository.count(where);
  }

  @get('/hoja-de-vidas')
  @response(200, {
    description: 'Array of HojaDeVida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HojaDeVida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HojaDeVida) filter?: Filter<HojaDeVida>,
  ): Promise<HojaDeVida[]> {
    return this.hojaDeVidaRepository.find(filter);
  }

  @patch('/hoja-de-vidas')
  @response(200, {
    description: 'HojaDeVida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HojaDeVida, {partial: true}),
        },
      },
    })
    hojaDeVida: HojaDeVida,
    @param.where(HojaDeVida) where?: Where<HojaDeVida>,
  ): Promise<Count> {
    return this.hojaDeVidaRepository.updateAll(hojaDeVida, where);
  }

  @get('/hoja-de-vidas/{id}')
  @response(200, {
    description: 'HojaDeVida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HojaDeVida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HojaDeVida, {exclude: 'where'}) filter?: FilterExcludingWhere<HojaDeVida>
  ): Promise<HojaDeVida> {
    return this.hojaDeVidaRepository.findById(id, filter);
  }

  @patch('/hoja-de-vidas/{id}')
  @response(204, {
    description: 'HojaDeVida PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HojaDeVida, {partial: true}),
        },
      },
    })
    hojaDeVida: HojaDeVida,
  ): Promise<void> {
    await this.hojaDeVidaRepository.updateById(id, hojaDeVida);
  }

  @put('/hoja-de-vidas/{id}')
  @response(204, {
    description: 'HojaDeVida PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() hojaDeVida: HojaDeVida,
  ): Promise<void> {
    await this.hojaDeVidaRepository.replaceById(id, hojaDeVida);
  }

  @del('/hoja-de-vidas/{id}')
  @response(204, {
    description: 'HojaDeVida DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.hojaDeVidaRepository.deleteById(id);
  }
}
