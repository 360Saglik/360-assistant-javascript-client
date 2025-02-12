import { Patient } from '../model/patient';
import { Policy } from '../model/policy';
import { GenderType } from '../enum/gender.type';

/**
 * Builder class for creating Patient objects.
 */
export class PatientBuilder {
  private patient: Partial<Patient> = {};

  private constructor() {}

  static create(): PatientBuilder {
    return new PatientBuilder();
  }

  withId(id: string): PatientBuilder {
    this.patient.id = id;
    return this;
  }

  withGsmCountryCode(gsmCountryCode: string): PatientBuilder {
    this.patient.gsmCountryCode = gsmCountryCode;
    return this;
  }

  withGsm(gsm: string): PatientBuilder {
    this.patient.gsm = gsm;
    return this;
  }

  withFirstName(firstName: string): PatientBuilder {
    this.patient.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): PatientBuilder {
    this.patient.lastName = lastName;
    return this;
  }

  withCountryCode(countryCode: string): PatientBuilder {
    this.patient.countryCode = countryCode;
    return this;
  }

  withNationalId(nationalId: string): PatientBuilder {
    this.patient.nationalId = nationalId;
    return this;
  }

  withPassportNumber(passportNumber: string): PatientBuilder {
    this.patient.passportNumber = passportNumber;
    return this;
  }

  withPolicy(policy: Policy): PatientBuilder {
    this.patient.policy = policy;
    return this;
  }

  withBirthDate(birthDate: Date): PatientBuilder {
    this.patient.birthDate = birthDate;
    return this;
  }

  withGender(gender: GenderType): PatientBuilder {
    this.patient.gender = gender;
    return this;
  }

  build(): Patient {
    return this.patient as Patient;
  }
}
