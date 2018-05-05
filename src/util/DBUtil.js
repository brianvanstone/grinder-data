var AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
});

var newProfile = (userId, authProfile) => {
    var profile = {
        userId: userId,
        createdDate: Date.now()
    };

    if (authProfile) {
        for (var key in authProfile) {
            if (key === 'sub') continue;
            if (key === 'updated_at') continue;

            profile[key] = authProfile[key];
        }
    }

    return profile;
}

module.exports.createProfile = (userId, callback, authProfile) => {
    var profile = newProfile(userId, authProfile);
    this.saveProfile(profile, callback);
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

module.exports.getProfile = (userId, callback, authProfile) => {
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
                this.createProfile(userId, callback, authProfile);
            }
        } else {
            callback(null, data.Item);
        }
    });
};

module.exports.getDynamoClient = () => {
    return new AWS.DynamoDB.DocumentClient({ apiVersion: process.env.REACT_APP_DYNAMO_CLIENT_VERSION });
};