import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  HojaDeVida,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaHojaDeVidaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/hoja-de-vidas', {
    responses: {
      '200': {
        description: 'Array of Persona has many HojaDeVida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HojaDeVida)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HojaDeVida>,
  ): Promise<HojaDeVida[]> {
    return this.personaRepository.hojaDeVidas(id).find(filter);
  }

  @post('/personas/{id}/hoja-de-vidas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(HojaDeVida)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HojaDeVida, {
            title: 'NewHojaDeVidaInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) hojaDeVida: Omit<HojaDeVida, 'id'>,
  ): Promise<HojaDeVida> {
    return this.personaRepository.hojaDeVidas(id).create(hojaDeVida);
  }

  @patch('/personas/{id}/hoja-de-vidas', {
    responses: {
      '200': {
        description: 'Persona.HojaDeVida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HojaDeVida, {partial: true}),
        },
      },
    })
    hojaDeVida: Partial<HojaDeVida>,
    @param.query.object('where', getWhereSchemaFor(HojaDeVida)) where?: Where<HojaDeVida>,
  ): Promise<Count> {
    return this.personaRepository.hojaDeVidas(id).patch(hojaDeVida, where);
  }

  @del('/personas/{id}/hoja-de-vidas', {
    responses: {
      '200': {
        description: 'Persona.HojaDeVida DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HojaDeVida)) where?: Where<HojaDeVida>,
  ): Promise<Count> {
    return this.personaRepository.hojaDeVidas(id).delete(where);
  }
}
