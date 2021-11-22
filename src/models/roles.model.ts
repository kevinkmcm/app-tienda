import {Entity, hasOne, model, property} from '@loopback/repository';
import {RoleTypeEnum} from './RoleTypeEnum';


@model({settings: {strict: false}})
export class Roles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @hasOne(() => RoleTypeEnum)
  roles: RoleTypeEnum[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
