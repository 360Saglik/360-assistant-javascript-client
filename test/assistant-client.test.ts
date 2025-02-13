import { AssistantClient } from '../src';
import { Patient } from '../src/interface';
import { ValidateToken } from '../src/response';

describe('AssistantClient', () => {
  const CLIENT_ID = 'client_id';
  const CLIENT_SECRET = 'client_secret';

  it('should throw error when clientId is null', () => {
    expect(() => {
      new AssistantClient({ clientId: null as unknown as string, secretKey: CLIENT_SECRET });
    }).toThrow('clientId cannot be null');
  });

  it('should throw error when clientSecret is null', () => {
    expect(() => {
      new AssistantClient({ clientId: CLIENT_ID, secretKey: null as unknown as string });
    }).toThrow('secretKey cannot be null');
  });

  it('should throw error when patient is null in authenticatePatientAsync', async () => {
    const client = new AssistantClient({ clientId: CLIENT_ID, secretKey: CLIENT_SECRET });
    await expect(client.authenticatePatient(null as unknown as Patient)).rejects.toThrow('patient cannot be null');
  });

  it('should throw error when token is null in validateTokenAsync', async () => {
    const client = new AssistantClient({ clientId: CLIENT_ID, secretKey: CLIENT_SECRET });
    await expect(client.validateToken(null as unknown as ValidateToken)).rejects.toThrow('token cannot be null');
  });
});
