const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

const convict = require("convict");
const config = convict({
    env: {
        doc: "The application environment",
        format: ["development", "staging", "production"],
        default: "development",
        env: "NODE_ENV"
    },
    parse: {
        appName: {
            doc: "Parse app name",
            format: String,
            default: "Parse App"
        },
        appId: {
            doc: "Parse app ID",
            format: String,
            default: "",
            env: "PARSE_SERVER_APPLICATION_ID"
        },
        masterKey: {
            doc: "Parse master key",
            format: String,
            default: "",
            env: "PARSE_SERVER_MASTER_KEY"
        },
        fileKey: {
            doc: "Parse file key",
            format: String,
            default: "",
            env: "PARSE_SERVER_FILE_KEY"
        },
        cloudFunctions: {
            doc: "Path to the location of Parse cloud functions",
            format: String,
            default: "",
            env: "PARSE_SERVER_CLOUD"
        },
        dbUri: {
            doc: "DB URI for Parse",
            format: "*",
            default: "mongodb://localhost:27017/parse",
            env: "PARSE_SERVER_DATABASE_URI"
        },
        serverUrl: {
            doc: "Parse API server URL",
            format: "*",
            default: "http://localhost:4000/parse",
            env: "PARSE_SERVER_URL"
        }
    }
});

config.loadFile(path.join(__dirname, "/config/" + config.get("env") + ".json"));

// config.validate({allowed: 'strict'});

module.exports = config.getProperties();
