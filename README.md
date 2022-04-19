# Fabric-asset-transfer

## Getting started

### Reguirements:

* node & npm
* docker-compose

*Download the `fabric-asset-transfer` GitHub repository to your local machine:*

`git clone https://github.com/Dmitrii-Kh/fabric-asset-transfer.git`

And then install binary files:

```
cd fabric-asset-transfer

wget https://github.com/hyperledger/fabric/releases/download/v2.2.5/hyperledger-fabric-linux-amd64-2.2.5.tar.gz

tar xf hyperledger-fabric-linux-amd64-2.2.5.tar.gz 

wget https://github.com/hyperledger/fabric-ca/releases/download/v1.5.2/hyperledger-fabric-ca-linux-amd64-1.5.2.tar.gz

tar xf hyperledger-fabric-ca-linux-amd64-1.5.2.tar.gz

```

## Run network

After installing binaries, you need to deploy the fabric network:

```bash
cd test-network

./network.sh up createChannel -ca -c mychannel -s couchdb -verbose

./network.sh deployCC -ccn assetTransfer -ccp ../chaincode -ccl javascript
```

## Install chaincode dependencies

```
cd ../chaincode
```
Install node pakages:

``` bash
npm i 
```

## Run server

After successfully deploying the network, you can start the server in javascript-server:

```
cd ../server
```

Copy `.env.expample` file to `.env `and replace the appropriate fields

```
cp .env.example .env 
```

Install node pakages:

``` bash
npm i 
```

Then run server with comand:

```
npm start
```

## Stop fabric-asset-transfer

To stop the fabric-asset-transfer you need to stop the server in `server` folder and run next commands:

```
cd test-network

./network.sh down
```
