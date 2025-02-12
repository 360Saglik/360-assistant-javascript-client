import { Policy } from '../model/policy';
import { GenderType } from '../enum/gender.type';

/**
 * Represents a patient in the assistants app.
 */
export interface Patient {
  /**
   * Unique identifier for the patient.
   */
  id?: string;

  /**
   * Patient's mobile phone number, required in a valid phone format.
   */
  gsm: string;

  /**
   * Country code for the patient's mobile number, in the format +code.
   * Example: "+90" for Turkey.
   */
  gsmCountryCode?: string;

  /**
   * Patient's first name.
   */
  firstName: string;

  /**
   * Patient's last name.
   */
  lastName: string;

  /**
   * ISO 3166-1 alpha-3 country code representing the patient's nationality.
   * Example: "TUR" for Turkey.
   * Example: Check other nationalities -> https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
   */
  countryCode: string;

  /**
   * Patient's national identification number. Must be exactly 11 digits.
   */
  nationalId?: string;

  /**
   * Optional passport number for the patient.
   */
  passportNumber?: string;

  /**
   * Insurance policy details associated with the patient.
   */
  policy: Policy;

  /**
   * Patient's date of birth.
   */
  birthDate: Date;

  /**
   * Patient's gender, represented by an integer value.
   * Example: 1 for Male, 2 for Female, 3 for Unknown.
   */
  gender: GenderType;
}

// Validation helper functions
export const validatePatient = (patient: Patient): boolean => {
  // GSM country code validation
  const gsmCountryCodeRegex = /^\+[0-9]{1,3}$/;
  if (patient.gsmCountryCode && !gsmCountryCodeRegex.test(patient.gsmCountryCode)) {
    throw new Error('Invalid GSM country code format');
  }

  // Country code validation
  const countryCodeRegex = /^[A-Z]{3}$/;
  if (!countryCodeRegex.test(patient.countryCode)) {
    throw new Error('Invalid country code format');
  }

  // National ID validation
  const nationalIdRegex = /^[0-9]{11}$/;
  if (patient.nationalId && !nationalIdRegex.test(patient.nationalId)) {
    throw new Error('Invalid national ID format');
  }

  return true;
};
