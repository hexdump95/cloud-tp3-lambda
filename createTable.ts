import { CreateTableCommand, CreateTableCommandInput, DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamo = new DynamoDBClient({
  endpoint: 'http://localhost:8000'
});

var params: CreateTableCommandInput = {
  TableName: "Envio",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "pendiente", AttributeType: "S" }
  ],
  GlobalSecondaryIndexes: [{
    IndexName: 'EnviosPendientesIndex',
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
      { AttributeName: "pendiente", KeyType: "RANGE" }
    ],
    Projection: { ProjectionType: 'KEYS_ONLY' },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

const createTable = async () => {
  try {
    const data = await dynamo.send(new CreateTableCommand(params));
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
createTable();
