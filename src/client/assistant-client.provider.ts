import axios, { AxiosInstance } from 'axios';
import {
  Patient,
  ValidateToken,
  ServerType,
  AuthenticatePatientResponse,
  ValidateTokenResponse,
  ApiResponse,
} from '../interface';
import { Helpers } from '../util/helpers';

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

  async authenticatePatientAsync(patient: Patient): Promise<AuthenticatePatientResponse> {
    if (!patient) throw new Error('patient cannot be null');

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
