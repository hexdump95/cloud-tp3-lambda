import { UpdateCommand, UpdateCommandInput, GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbClient } from './utils/ddbClient';

export const handler = async (event) => {
  const id = event.pathParameters.idEnvio;

  console.debug("Request to update Envio %s", id);

  const envio = await ddbClient.send(new GetCommand({ TableName: "Envio", Key: { id } }));
  if (envio.Item == null)
    return { statusCode: 404 };

  if (envio.Item.pendiente != null)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Envio ${id} cannot be updated` })
    };

  const params: UpdateCommandInput = {
    TableName: "Envio",
    Key: { id },
    UpdateExpression: "set pendiente = :t",
    ExpressionAttributeValues: {
      ":t": new Date().toISOString()
    },
  };
  try {
    await ddbClient.send(new UpdateCommand(params));
    return { body: JSON.stringify({ message: `Envio ${id} was updated` }) };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  }

}
