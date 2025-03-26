import axios, { AxiosInstance } from 'axios';
import { Helpers, Validators } from '../util';
import {
  ApiResponse,
  AuthenticatePatientResponse,
  ValidateTokenResponse,
  ValidateToken,
  PreInstantDoctorOrderResponse,
  PostInstantDoctorOrderResponse,
} from '../response';
import { ServerType } from '../enum';
import { Patient, Client, PostInstantDoctorOrder, PreInstantDoctorOrder } from '../interface';

/**
 * Client class for making authenticated API requests to the Assistant service.
 */
export class AssistantClient {
  private readonly client: AxiosInstance;
  private readonly timeout: number = 20000;
  private readonly maxRedirects: number = 0;
  private readonly clientId: string;
  private readonly secretKey: string;
  private readonly baseUrl: string;
  private readonly headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor(params: Client) {
    const { clientId, secretKey } = params;
    let { serverType } = params;
    if (!clientId) throw new Error('clientId cannot be null');
    if (!secretKey) throw new Error('secretKey cannot be null');
    serverType = serverType || ServerType.Development;
    this.client = axios.create({
      timeout: this.timeout,
      maxRedirects: this.maxRedirects,
      headers: this.headers,
    });
    this.clientId = clientId;
    this.secretKey = secretKey;
    this.baseUrl = Helpers.getServerUrl(serverType);
  }

  /**
   * Authenticates a patient and returns an access token.
   * @param patient The patient to authenticate. Check the patient model for more information.
   * @returns A promise that resolves to the authenticate patient response.
   */
  async authenticatePatient(patient: Patient): Promise<AuthenticatePatientResponse> {
    if (!patient) throw new Error('patient cannot be null');
    if (!Validators.patient(patient)) throw new Error('patient is not valid');

    return this.sendRequest<Patient, AuthenticatePatientResponse>(patient, 'auth/join');
  }

  async validateToken(token: ValidateToken): Promise<ValidateTokenResponse> {
    if (!token) throw new Error('token cannot be null');

    return this.sendRequest<ValidateToken, ValidateTokenResponse>(token, 'auth/validate');
  }

  async preInstantDoctorOrder(params: PreInstantDoctorOrder): Promise<PreInstantDoctorOrderResponse> {
    if (!params) throw new Error('params cannot be null');
    const { token } = params;
    return this.sendRequest<any, PreInstantDoctorOrderResponse>({}, 'orders/pre-order/instant-doctor', { Authorization: `Bearer ${token}` });
  }

  async postInstantDoctorOrder(params: PostInstantDoctorOrder): Promise<PostInstantDoctorOrderResponse> {
    if (!params) throw new Error('params cannot be null');

    Validators.postInstantDoctorOrder(params);
    const { orderId, token } = params;
    return this.sendRequest<any, PostInstantDoctorOrderResponse>({}, `orders/${orderId}/post-order/instant-doctor`, { Authorization: `Bearer ${token}` });
  }

  private async sendRequest<TRequest, TResponse extends ApiResponse>(
    model: TRequest = {} as TRequest,
    endpoint: string,
    additionalHeaders?: Record<string, string>,
  ): Promise<TResponse> {
    try {
      const headers = {
        'client-id': this.clientId,
        'secret-key': this.secretKey,
        ...additionalHeaders,
      };

      const response = await this.client.post<TResponse>(`${this.baseUrl}/${endpoint}`, model, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response?.data?.code + ' - ' + error.response?.data?.message);
        }
        throw new Error(`HTTP request failed while processing ${endpoint}: ${error.message}`);
      }
      throw new Error(`An unexpected error occurred while processing ${endpoint}: ${error}`);
    }
  }
}
