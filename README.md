# 360 Assistant TypeScript Client Library

This library provides a simple way to authenticate and interact with an assistant API using TypeScript/JavaScript. The `AssistantClientProvider` class helps in setting up authentication and sending requests to the server.

## Features

- **Authentication**: Authenticate users with the provided patient information
- **Server Communication**: Send requests to different server environments (Development, Production, etc.)
- **Type Safety**: Full TypeScript support with type definitions

## 📋 Requirements

- Node.js 14.0+
- npm or yarn

## 🛠️ Installation

Add the package to your project using npm:

```bash
npm install @saglik360/assistant-client-library
```

Or using yarn:

```bash
yarn add @saglik360/assistant-client-library
```

## 🔑 Authentication

## 💻 Usage

```ts
import {
  AssistantClientProvider,
  PatientBuilder,
  PolicyBuilder,
  ServerType,
  GenderType,
} from "@saglik360/assistant.client-library";
import crypto from "crypto";

async function main() {
  const client = new AssistantClientProvider(
    "client_id",
    "client_secret",
    ServerType.Development
  );
  const policyInstance = PolicyBuilder.create()
    .withId(crypto.randomUUID?.() ?? Math.random().toString(36).substring(2))
    .withPolicyNumber("12345678901")
    .withStartDate(new Date())
    .withEndDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000))
    .withGroup("Custom Field")
    .withDescription("Test Policy")
    .build();
  const patient = PatientBuilder.create()
    .withId(crypto.randomUUID())
    .withGsmCountryCode("+90")
    .withGsm("5551231234")
    .withFirstName("Richard")
    .withLastName("Stallman")
    .withCountryCode("TUR")
    .withNationalId("12345678901")
    .withPassportNumber("12345678901")
    .withPolicy(policyInstance)
    .withBirthDate(new Date("1988-06-25"))
    .withGender(GenderType.Male)
    .build();
  const auth = await client.authenticatePatientAsync(patient);
  console.log(JSON.stringify(auth, null, 2));
}

main().catch(console.error);

```

## Response

```json
{
  "Data": {
    "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiIxZjcyNWRiNi01MjRjLTQwM2Qt.....",
    "AccessTokenExpiredTime": "2025-02-19T12:26:56.019Z",
    "RedirectUrl": "https://uri.360saglik.dev/OwXTRSuCJmPF1zt"
  },
  "Actions": [],
  "Message": "success",
  "IsSuccess": true,
  "StatusCode": 200,
  "Error": null
}
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.