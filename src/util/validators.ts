import { Patient, PostInstantDoctorOrder } from '../interface';
import { isMongoId } from 'class-validator';

/**
 * Validator class for various validation functions.
 */
export class Validators {
  /**
   * Validates a phone number.
   * @param value
   */
  static gsmCountryCode(value: string): boolean {
    // GSM country code validation
    const gsmCountryCodeRegex = /^\+[0-9]{1,3}$/;
    if (value && !gsmCountryCodeRegex.test(value)) {
      throw new Error('Invalid GSM country code format');
    }
    return true;
  }

  /**
   * Validates a phone number.
   * @param value
   */
  static countryCode(value: string): boolean {
    // Country code validation
    const countryCodeRegex = /^[A-Z]{3}$/;
    if (!countryCodeRegex.test(value)) {
      throw new Error('Invalid country code format');
    }
    return true;
  }

  /**
   * Validates nationalId
   * @param value
   */
  static nationalId(value: string): boolean {
    // T.C. identity number should have 11 digits and first should be non-zero.
    if (!/^[1-9]\d{10}$/.test(value)) return false;

    const digits = value.split('');
    // store last 2 digits (10th and 11th) which are actually used for validation
    const d10 = Number(digits[9]);
    const d11 = Number(digits[10]);
    // we'll also need the sum of first 10 digits for validation
    let sumOf10 = 0;
    let evens = 0;
    let odds = 0;

    digits.forEach((d: any, index) => {
      d = Number(d);
      if (index < 10) sumOf10 += d;
      if (index < 9) {
        if ((index + 1) % 2 === 0) {
          evens += d;
        } else {
          odds += d;
        }
      }
    });

    // check if the unit-digit of the sum of first 10 digits equals to the 11th digit.
    if (sumOf10 % 10 !== d11) return false;

    // check if unit-digit of the sum of odds * 7 and evens * 9 is equal to 10th digit.
    if ((odds * 7 + evens * 9) % 10 !== d10) return false;

    // check if unit-digit of the sum of odds * 8 is equal to 11th digit.
    return (odds * 8) % 10 === d11;
  }

  static patient(params: Patient): boolean {
    const { countryCode, gsmCountryCode, nationalId } = params;
    Validators.countryCode(countryCode);
    if (gsmCountryCode) {
      Validators.gsmCountryCode(gsmCountryCode);
    }
    if (nationalId) {
      Validators.nationalId(nationalId);
    }
    return true;
  }

  static postInstantDoctorOrder(params: PostInstantDoctorOrder): boolean {
    const { orderId } = params;
    if (!isMongoId(orderId)) {
      throw new Error('orderId must be a valid MongoId');
    }
    return true;
  }
}
