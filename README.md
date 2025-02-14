# 360 Assistant Javascript Client Library

This library provides a simple way to authenticate and interact with an assistant API using TypeScript/JavaScript. The `AssistantClient` class helps in setting up authentication and sending requests to the server.

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
import { AssistantClient } from "@saglik360/assistant.client-library";
import { Patient, Policy } from "@saglik360/assistant.client-library/interface";
import { ServerType, GenderType } from "@saglik360/assistant.client-library/enum";
import crypto from "crypto";

async function main() {
  
  const client: AssistantClient = new AssistantClient({
    clientId: 'Your Client ID',
    secretKey: 'Your Secret Key',
    serverType: ServerType.Development // or ServerType.Production,
  });
  
  const policyInstance: Policy = {
    id: 'Your Policy Unique ID',
    policyNumber: 'Your Policy Number',
    startDate: new Date(),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    group: 'Custom Field',
    description: 'Test Policy',
  };
  
  const patient: Patient = {
    id: 'Your Patient Unique ID',
    gsmCountryCode: '+90',
    gsm: '5551231234',
    firstName: 'Richard',
    lastName: 'Stallman',
    countryCode: 'TUR',
    nationalId: '12345678901',
    passportNumber: '12345678901',
    policy: policyInstance,
    birthDate: new Date('1988-06-25'),
    gender: GenderType.Male,
  };
  
  const auth = await client.authenticatePatient(patient);
  console.log(JSON.stringify(auth, null, 2));
}

main().catch(console.error);

```

## Response

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNLZXkiOiIxZjcyNWRiNi01MjRjLTQwM2Qt.....",
    "accessTokenExpiredTime": "2025-02-19T12:26:56.019Z",
    "redirectUrl": "https://uri.360saglik.dev/OwXTRSuCJmPF1zt"
  },
  "actions": [],
  "message": "success",
  "isSuccess": true,
  "statusCode": 200,
  "error": null
}
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
