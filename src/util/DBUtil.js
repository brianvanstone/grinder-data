var AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
});

var newProfile = (userId) => {
    return {
        userId: userId,
        createdDate: Date.now()
    }
}

module.exports.createProfile = (userId, callback) => {
    this.saveProfile(newProfile(userId), callback);
};

module.exports.saveProfile = (profile, callback) => {
    var docClient = this.getDynamoClient();
    var putParams = {
        TableName: "UserData",
        Item: profile
    }
    docClient.put(putParams, (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, data.Item);
        }
    });
};

module.exports.getProfile = (userId, callback) => {
    var docClient = this.getDynamoClient();
    var getParams = {
        TableName: "UserData",
        Key: {
            userId: userId
        }
    }
    docClient.get(getParams, (err, data) => {
        if (err || !data.Item || !data.Item.userId) {
            if (!data) {
                callback(err);
            } else {
                this.createProfile(userId, callback);
            }
        } else {
            callback(null, data.Item);
        }
    });
};

module.exports.getDynamoClient = () => {
    return new AWS.DynamoDB.DocumentClient({ apiVersion: process.env.REACT_APP_DYNAMO_CLIENT_VERSION });
};