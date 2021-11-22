import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
const generador = require('password-generator');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  cifrarClave(clave: string) {
    const claveCifrada = cryptojs.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string) {
    try {
      const p = this.personaRepository.findOne({
        where: {
          correo: usuario,
          clave: clave,
        },
      });
      if (p) {
        return p;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  GenerarTokenJWT(persona: Persona) {
    const token = jwt.sign(
      {
        data: {
          id: persona.id,
          correo: persona.correo,
          nombre: persona.nombres + ' ' + persona.pedidos,
          rol:persona.roles,
        },
      },
      Llaves.claveJWT);
    return token;
  }

  ValidarToken(token: string) {
    try {
      const datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
