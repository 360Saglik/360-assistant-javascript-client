import { AssistantClientProvider } from '../client/assistant-client.provider';
import { PatientBuilder } from '../builder/patient.builder';
import { PolicyBuilder } from '../builder/policy.builder';
import { ServerType, GenderType } from '../enum';
import { Patient } from '../model/patient';
import { Policy } from '../model/policy';
import { ValidateToken } from '../response/validate-token.response';
describe('API Check Tests', () => {
  const CLIENT_ID = 'client_id';
  const CLIENT_SECRET = 'client_secret';
  const ENV = ServerType.Development;

  let client: AssistantClientProvider;
  let policyInstance: Policy;
  let patientInstance: Patient;

  beforeEach(() => {
    policyInstance = PolicyBuilder.create()
      .withId(crypto.randomUUID())
      .withPolicyNumber('12345678901')
      .withStartDate(new Date())
      .withEndDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) // 1 year from now
      .withGroup('Custom Field')
      .withDescription('Test Policy')
      .build();

    patientInstance = PatientBuilder.create()
      .withId(crypto.randomUUID())
      .withGsmCountryCode('+90')
      .withGsm('5551231234')
      .withFirstName('Richard')
      .withLastName('Stallman')
      .withCountryCode('TUR')
      .withNationalId('12345678901')
      .withPassportNumber('12345678901')
      .withPolicy(policyInstance)
      .withBirthDate(new Date('1988-06-25'))
      .withGender(GenderType.Male)
      .build();

    client = new AssistantClientProvider(CLIENT_ID, CLIENT_SECRET, ENV);
  });

  it('should authenticate patient successfully', async () => {
    const auth = await client.authenticatePatientAsync(patientInstance);

    expect(auth).toBeDefined();
    expect(auth.data).toBeDefined();
    expect(auth.data.accessToken).toBeTruthy();
    expect(auth.data.accessTokenExpiredTime).toBeDefined();
    expect(new Date(auth.data.accessTokenExpiredTime!)).toBeInstanceOf(Date);
    expect(new Date(auth.data.accessTokenExpiredTime!).getTime()).toBeGreaterThan(new Date().getTime());
    expect(auth.data.redirectUrl).toBeTruthy();
    expect(auth.actions).toBeDefined();
    expect(auth.message).toBe('success');
  });

  it('should validate token successfully', async () => {
    const auth = await client.authenticatePatientAsync(patientInstance);
    expect(auth.data.accessToken).toBeDefined();

    if (auth.data.accessToken) {
      const validate = await client.validateTokenAsync({
        token: auth.data.accessToken,
      } as ValidateToken);

      expect(validate).toBeDefined();
      expect(validate.data).toBeDefined();
      expect(validate.data?.result).toBe(true);
      expect(validate.actions).toBeDefined();
      expect(validate.message).toBe('success');
    }
  });
});
