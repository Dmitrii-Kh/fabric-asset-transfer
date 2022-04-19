require('dotenv').config();
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./AppUtil.js');

const databaseURL = "http://" + process.env.COUCHDB_USER 
                    + ":" + process.env.COUCHDB_PASSWD 
                    + "@" + process.env.COUCHDB_HOST 
                    + ":" + process.env.COUCHDB_PORT

class WalletData {
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

const walletData = new WalletData();

module.exports = {
    wallet: walletData.getWallet(),
    gateway: walletData.getGateway(),
    ccp: walletData.getCcp(),
    caClient: walletData.getCaClient(),
};
