import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

const ddbConfig: DynamoDBClientConfig = {
  endpoint: 'http://dynamodb:8000'
};

export const ddbClient = new DynamoDBClient(ddbConfig);
