import axios, { AxiosInstance } from 'axios';

import { Helpers } from '../util/helpers';
import { ApiResponse, AuthenticatePatientResponse } from '../response';
import { ServerType } from '../enum/server.type';
import { ValidateTokenResponse } from '../response/validate-token.response';
import { Patient, validatePatient } from '../model/patient';
import { ValidateToken } from '../response/validate-token.response';

/**
 * Client class for making authenticated API requests to the Assistant service.
 */
export class AssistantClientProvider {
  private static readonly client: AxiosInstance = axios.create({
    timeout: 20000,
    maxRedirects: 0,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly baseUrl: string;

  constructor(
    clientId: string,
    clientSecret: string,
    serverType: ServerType = ServerType.Development,
  ) {
    if (!clientId) throw new Error('clientId cannot be null');
    if (!clientSecret) throw new Error('clientSecret cannot be null');

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = Helpers.getServerUrl(serverType);
  }

  /**
   * Authenticates a patient and returns an access token.
   * @param patient The patient to authenticate. Check the patient model for more information.
   * @returns A promise that resolves to the authenticate patient response.
   */
  async authenticatePatientAsync(patient: Patient): Promise<AuthenticatePatientResponse> {
    if (!patient) throw new Error('patient cannot be null');
    if (!validatePatient(patient)) throw new Error('patient is not valid');

    return this.sendRequestAsync<Patient, AuthenticatePatientResponse>(patient, 'auth/join');
  }

  async validateTokenAsync(token: ValidateToken): Promise<ValidateTokenResponse> {
    if (!token) throw new Error('token cannot be null');

    return this.sendRequestAsync<ValidateToken, ValidateTokenResponse>(token, 'auth/validate');
  }

  private async sendRequestAsync<TRequest, TResponse extends ApiResponse>(
    model: TRequest,
    endpoint: string,
  ): Promise<TResponse> {
    try {
      const response = await AssistantClientProvider.client.post<TResponse>(
        `${this.baseUrl}/${endpoint}`,
        model,
        {
          headers: {
            'client-id': this.clientId,
            'secret-key': this.clientSecret,
          },
        },
      );

      return Helpers.fromJsonToObject<TResponse>(
        JSON.stringify(response.data),
        response.status,
        response.status >= 200 && response.status < 300,
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP request failed while processing ${endpoint}: ${error.message}`);
      }
      throw new Error(`An unexpected error occurred while processing ${endpoint}: ${error}`);
    }
  }
}
