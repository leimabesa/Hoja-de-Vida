import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {HojaDeVida} from './hoja-de-vida.model';

@model()
export class Foto extends Entity {
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
  Descripcion: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => HojaDeVida)
  hojaDeVidaId: string;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
