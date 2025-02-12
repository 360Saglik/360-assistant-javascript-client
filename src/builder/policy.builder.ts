import { Policy } from '../model/policy';

/**
 * Builder class for creating Policy objects.
 */
export class PolicyBuilder {
  private policy: Partial<Policy> = {};

  private constructor() {}

  static create(): PolicyBuilder {
    return new PolicyBuilder();
  }

  withId(id: string): PolicyBuilder {
    this.policy.id = id;
    return this;
  }

  withPolicyNumber(policyNumber: string): PolicyBuilder {
    this.policy.policyNumber = policyNumber;
    return this;
  }

  withStartDate(startDate: Date): PolicyBuilder {
    this.policy.startDate = startDate;
    return this;
  }

  withEndDate(endDate: Date): PolicyBuilder {
    this.policy.endDate = endDate;
    return this;
  }

  withGroup(group: string): PolicyBuilder {
    this.policy.group = group;
    return this;
  }

  withDescription(description: string): PolicyBuilder {
    this.policy.description = description;
    return this;
  }

  build(): Policy {
    return this.policy as Policy;
  }
}
