import { AssistantClientProvider } from '../client/assistant-client.provider';
import { Patient } from '../model/patient';
import { ValidateToken } from '../response/validate-token.response';

describe('AssistantClientProvider', () => {
  const CLIENT_ID = 'client_id';
  const CLIENT_SECRET = 'client_secret';

  it('should throw error when clientId is null', () => {
    expect(() => {
      new AssistantClientProvider(null as unknown as string, CLIENT_SECRET);
    }).toThrow('clientId cannot be null');
  });

  it('should throw error when clientSecret is null', () => {
    expect(() => {
      new AssistantClientProvider(CLIENT_ID, null as unknown as string);
    }).toThrow('clientSecret cannot be null');
  });

  it('should throw error when patient is null in authenticatePatientAsync', async () => {
    const client = new AssistantClientProvider(CLIENT_ID, CLIENT_SECRET);
    await expect(client.authenticatePatientAsync(null as unknown as Patient)).rejects.toThrow(
      'patient cannot be null',
    );
  });

  it('should throw error when token is null in validateTokenAsync', async () => {
    const client = new AssistantClientProvider(CLIENT_ID, CLIENT_SECRET);
    await expect(client.validateTokenAsync(null as unknown as ValidateToken)).rejects.toThrow(
      'token cannot be null',
    );
  });
});
