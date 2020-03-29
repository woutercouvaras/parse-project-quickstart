const express = require("express");
const bodyParser = require("body-parser");
const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
const ParseDashboard = require("parse-dashboard");

const config = require("./configuration");

const server = express();

server.use(bodyParser.json());

const parseApi = new ParseServer({
    databaseURI: config.parse.dbUri,
    serverURL: config.parse.serverUrl,
    masterKey: config.parse.masterKey,
    appId: config.parse.appId,
    cloud: config.parse.cloudFunctions,
    fileKey: config.parse.fileKey || undefined,
    preventLoginWithUnverifiedEmail: false,
    verifyUserEmails: false
});

const parseDashboard = new ParseDashboard({
    apps: [
        {
            serverURL: config.parse.serverUrl,
            masterKey: config.parse.masterKey,
            appId: config.parse.appId,
            appName: config.parse.appId
        }
    ]
});

const parseGraphQLService = new ParseGraphQLServer(parseApi, {
    graphQLPath: "/graphql",
    playgroundPath: "/playground"
});

server.use("/parse", parseApi.app);
server.use("/admin", parseDashboard);

parseGraphQLService.applyGraphQL(server);

if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    parseGraphQLService.applyPlayground(server);
}

server.get("/health-check", (req, res) => {
    res.sendStatus(200);
});

server.listen(4000, function() {
    console.log("Dashboard running on http://localhost:4000/admin");
    console.log("REST API running on http://localhost:4000/parse");
    console.log("GraphQL API running on http://localhost:4000/graphql");
    console.log("GraphQL Playground running on http://localhost:4000/playground");
});
