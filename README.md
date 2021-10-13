# cloud-tp3-lambda

## project installation
```
git clone https://github.com/hexdump95/cloud-tp3-lambda.git
```
### run dynamodb locally
```
docker network create awslocal
docker run -d -p 8000:8000 --network awslocal --name dynamodb amazon/dynamodb-local:1.16.0 -jar DynamoDBLocal.jar -sharedDb
```
### install dependencies and create table
```
npm install
npm start
```
### run lambda locally
```
npm run build
sam local start-api --docker-network awslocal
```
