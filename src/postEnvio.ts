import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { ddbClient } from './utils/ddbClient';

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  const id = uuidv4().toString();
  const fechaAlta = new Date().toISOString();

  if (body.destino == null || body.email == null)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "destino and email cannot be null" })
    };

  const envio = {
    id,
    fechaAlta,
    destino: body.destino,
    email: body.email
  };

  console.debug("Request to create Envio %s", envio);

  try {
    await ddbClient.send(new PutCommand({ TableName: "Envio", Item: envio }));
    return {
      statusCode: 201,
      body: JSON.stringify(envio)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  }
}
