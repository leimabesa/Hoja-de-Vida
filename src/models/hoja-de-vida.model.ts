import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class HojaDeVida extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  FormacionAcademica: string;

  @property({
    type: 'string',
    required: true,
  })
  ExperienciaLaboral: string;

  @property({
    type: 'string',
    required: true,
  })
  ProductividadAcademica: string;

  @property({
    type: 'string',
    required: true,
  })
  PremiosYReconocimientos: string;

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<HojaDeVida>) {
    super(data);
  }
}

export interface HojaDeVidaRelations {
  // describe navigational properties here
}

export type HojaDeVidaWithRelations = HojaDeVida & HojaDeVidaRelations;
