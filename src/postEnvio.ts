import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { ddbClient } from './utils/ddbClient';

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (body.destino == null || body.email == null)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "destino and email cannot be null" })
    };

  const envio = {
    id: uuidv4().toString(),
    fechaAlta: new Date().toISOString(),
    destino: body.destino.toString(),
    email: body.email.toString(),
    pendiente: new Date().toISOString()
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
