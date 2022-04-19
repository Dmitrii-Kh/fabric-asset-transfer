const {
    gateway,
    ccp,
    wallet,
    bufferToString,
    bufferToObject,
} = require('../utils');

const Tx = Object.freeze({
    CreateAsset: "CreateAsset",
    ReadAsset: "ReadAsset",
    GetAllAssets: "GetAllAssets",
    TransferAsset: "TransferAsset",
    DeleteAsset: "DeleteAsset"
});


const create = async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('username')) {
            throw {
                status: 404,
                message: 'Request must contain username field!'
            };
        }
        const { username, id, color, size, owner, appraisedValue } = req.body;
        await gateway.connect(ccp, {
            wallet: await wallet,
            identity: username,
            discovery: { enabled: true, asLocalhost: true }
        });
        const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        await contract.submitTransaction(Tx.CreateAsset, id, color, size, owner, appraisedValue);
        res.send({
            status: 200,
            message: 'Asset created successfully'
        })
    } catch (e) {
        res.send({
            status: e.status || 404,
            message: "Request error: " + e.message,
        })
    }
}

const get = async (req, res) => {
    try {
        if (!req.query.username) {
            throw {
                status: 404,
                message: 'Request must contain username field!'
            };
        }
        await gateway.connect(ccp, {
            wallet: await wallet,
            identity: req.query.username,
            discovery: { enabled: true, asLocalhost: true }
        });
        const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        const id = req.query.id;
        let data;
        if(!!id) {
            data = await contract.evaluateTransaction(Tx.ReadAsset, id);
        } else {
            data = await contract.evaluateTransaction(Tx.GetAllAssets);
        }
        res.send({
            status: 200,
            asset: bufferToString(data) === "" ? [] : bufferToObject(data)
        })
    } catch (e) {
        res.send({
            status: e.status || 404,
            message: "Request error: " + e.message,
        })
    }
}

const transfer = async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('username')) {
            throw {
                status: 404,
                message: 'Request must contain username field!'
            };
        }
        const { username, id, newOwner } = req.body;
        await gateway.connect(ccp, {
            wallet: await wallet,
            identity: username,
            discovery: { enabled: true, asLocalhost: true }
        })
        const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        await contract.submitTransaction(Tx.TransferAsset, id, newOwner);
        res.send({
            status: 200,
            message: 'Asset transferred successfully'
        })
    } catch (e) {
        res.send({
            status: e.status || 404,
            message: "Request error: " + e.message,
        })
    }
}


const deleteAsset = async (req, res) => {
    try {
        if (!req.query.username) {
            throw {
                status: 404,
                message: 'Request must contain username field!'
            };
        }
        const { username, id } = req.query;
        await gateway.connect(ccp, {
            wallet: await wallet,
            identity: username,
            discovery: { enabled: true, asLocalhost: true }
        })
        const network = await gateway.getNetwork(process.env.CHANNEL_NAME);
        const contract = network.getContract(process.env.CHAINCODE_NAME);
        await contract.submitTransaction(Tx.DeleteAsset, id);
        res.send({
            status: 200,
            message: 'Asset deleted successfully'
        })
    } catch (e) {
        res.send({
            status: e.status || 404,
            message: "Request error: " + e.message,
        })
    }
}

module.exports = {
    create,
    get,
    transfer,
    deleteAsset,
}