module.exports = {
    apps: [
        {
            name: "parse-server",
            script: "./server.js",
            watch: ["./dist"],
            watch_delay: 1000,
            watch_options: {
                followSymlinks: false
            },
            instance_var: "INSTANCE_ID"
        }
    ]
};
