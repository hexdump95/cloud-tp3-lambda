import { ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ddbClient } from './utils/ddbClient';

export const handler = async () => {
  console.debug("Request to get all Envios Pendientes");
  var params: ScanCommandInput = {
    TableName: "Envio",
    IndexName: "EnviosPendientesIndex"
  };
  try {
    const data = await ddbClient.send(new ScanCommand(params));
    return {
      body: JSON.stringify(data.Items)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  }
}
