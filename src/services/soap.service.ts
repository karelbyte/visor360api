import { Injectable } from '@nestjs/common';
import * as soap from 'soap';
import { AppConfig } from '../config';

export interface IPersonalData {
  type: string;
  valNumeroIdentificacion: string;
}
@Injectable()
export class SoapService {
  private client: any;

  async getDatosPersonalesCliente(props: IPersonalData) {
    const { type, valNumeroIdentificacion } = props;
    const wsdlUrl = AppConfig().soapUserDataUrl;
    this.client = await soap.createClientAsync(wsdlUrl);

    const args = {
      Request: {
        DataHeader: {
          nombreOperacion: 'ConsultaDatosPersonalesCliente',
          total: 1,
          jornada: 1,
          canal: 12,
          modoDeOperacion: 1,
          usuario: 'nahui.campos',
          perfil: 1,
          versionServicio: '1.0.0',
          idTransaccion: 85289,
        },
        Data: {
          codIdioma: 'ES',
          valOrigen: 0,
          codPais: 'PA',
          codTipoIdentificacion: type,
          valNumeroIdentificacion: valNumeroIdentificacion,
        },
      },
    };

    try {
      const response =
        await this.client.ConsultaDatosPersonalesClienteAsync(args);
      return response[0].Response.Data;
    } catch (error) {
      console.error('Error al consumir el servicio SOAP:', error);
      throw error;
    }
  }
}
