import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaUsuario implements AuthenticationStrategy {
  name = 'usuario';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (token) {
      const datos = this.servicioAutenticacion.ValidarToken(token);
      if (datos) {
        const perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre,
        });
        return perfil;
      } else {
        throw new HttpErrors[401](' el token incluido no es valido');
      }
    } else {
      throw new HttpErrors[401]('no hay un token para ejecutar su solicitud');
    }
  }
}
