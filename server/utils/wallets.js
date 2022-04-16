const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./AppUtil.js');

const databaseURL = "http://" + process.env.COUCHDB_USER 
                    + ":" + process.env.COUCHDB_PASSWD 
                    + "@" + process.env.COUCHDB_HOST 
                    + ":" + process.env.COUCHDB_PORT

class ValidateData {
    constructor(){
        this.ccp = buildCCPOrg1();
        this.caClient = buildCAClient(FabricCAServices, this.ccp, process.env.CA_HOST_NAME);
        this.wallet = undefined;
        this.gateway = new Gateway();
    }

    async createWallet() {
        this.wallet = await buildWallet(Wallets, databaseURL)
        try {
            await enrollAdmin(this.caClient, this.wallet, process.env.MSP_ORG);
            await registerAndEnrollUser(this.caClient, this.wallet, process.env.MSP_ORG, process.env.GARBAGE, process.env.AFFILICATION);
        } catch {
            return
        }
    }

    async getWallet() {
        if (this.wallet === undefined) {
            await this.createWallet();
        }
        return this.wallet;
    }
    getGateway() {
        return this.gateway;
    }
    getCcp() {
        return this.ccp;
    }
    getCaClient() {
        return this.caClient;
    }
}

const validateData = new ValidateData();
module.exports = {
    wallet: validateData.getWallet(),
    gateway: validateData.getGateway(),
    ccp: validateData.getCcp(),
    caClient: validateData.getCaClient(),
};
