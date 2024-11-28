const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
    user: "YOUR_CPANEL_USERNAME",
    password: "YOUR_CPANEL_PASSWORD",
    host: "YOUR_CPANEL_HOST",
    port: 21,
    localRoot: __dirname + "/out",
    remoteRoot: "/public_html/", // or your specific directory
    include: ["*", "**/*"],      // Include all files
    exclude: [
        "**/*.map",              // Exclude source maps
        ".git/**",
        "node_modules/**",
        ".next/**",
        "src/**"
    ],
    deleteRemote: false,         // Set to true to delete ALL files before uploading
    forcePasv: true             // Use passive mode
};

ftpDeploy.deploy(config)
    .then(res => console.log("Deployment completed successfully!"))
    .catch(err => console.log(err));
