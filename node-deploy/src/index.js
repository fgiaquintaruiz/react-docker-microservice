#!/usr/bin/env node
const AWS = require("aws-sdk");
const child_process = require("child_process");
const { format } = require("date-fns");
const fs = require("fs");
const path = require("path");
const util = require("util");

const deploymentDir = process.argv[2];
// const deploymentDir = "C:\\Users\\Fabio\\react-microservice\\api-gateway";
const deploymentDirName = path.basename(deploymentDir);

console.log("deploymentDir " + deploymentDir + " deploymentDirName " + deploymentDirName );

const rel = relPath => path.resolve(deploymentDir, relPath);

const tfFilePath = rel("../terraform/terraform.tfstate");
 console.log("tfFilePath " + tfFilePath);

if (!fs.existsSync(tfFilePath)) {
    throw Error("run terraform apply -auto-approve");
}

const { outputs } = JSON.parse(fs.readFileSync(tfFilePath, "utf-8"));


console.log("path " + rel("./.deploy.env"));

require("dotenv").config({ path: rel("./.deploy.env") });

const accessEnv = require("./helpers/accessEnv");

const exec = util.promisify(child_process.exec);

const getFullDate = () => format(new Date(), "yyyyMMddHHmmss");

const getFullDate2 = () => format(new Date(), "yyyy-MM-dd-HH:mm:ss");



const APPLICATION_NAME = accessEnv("APPLICATION_NAME");

const MAX_BUFFER_SIZE = 1024 * 1024; //1 MiB

const awsRegion = outputs["aws-region"].value;

const codeDeployClient = new AWS.CodeDeploy({
    accessKeyId: accessEnv("AWS_ACCESS_KEY_ID"),
    apiVersion: "2014-10-06",
    region: awsRegion,
    secretAccessKey: accessEnv("AWS_ACCESS_KEY_SECRET")
});

const s3Client = new AWS.S3({
    accessKeyId: accessEnv("AWS_ACCESS_KEY_ID"),
    endpoint: new AWS.Endpoint(`https://s3.${awsRegion}.amazonaws.com/`),
    s3ForcePathStyle: true,
    secretAccessKey: accessEnv("AWS_ACCESS_KEY_SECRET")
});

const rootDir = rel("../");

(async () => {
    console.log("Deploying in 3 seconds...");
    await new Promise(resolve => setTimeout(resolve, 3000));

    const lockFilePath = rel("../deploy.lock");
    console.log("Checking for lockfile...");
    if (fs.existsSync(lockFilePath)) {
        console.error("Lockfile found. Halting...");
        fs.unlinkSync("../deploy.lock");
        process.exit();
    }

    console.log("Creating lockfile");

    fs.writeFileSync(
        lockFilePath,
        "this file exist to prevent to run concurrent deploys"
    );

    console.log("Checking environment...");
    if (!fs.existsSync(rel(".production.env"))) {
        console.error("No .production.env found! Halting...");
        fs.unlinkSync("../deploy.lock");
        process.exit();
    }

    console.log("Copying appspec...");

    fs.copyFileSync(rel("./appspec.yml"), rel("../appspec.yml"));

    console.log("Generating deployment file... " + getFullDate2());
    const filename = `${deploymentDirName}-deployment-${getFullDate()}.zip`;
    const zipPath = `${filename}`;

    console.log("root dir " + rootDir);
    
    try {

        await exec(`zip -r ${zipPath} . -x **/node_modules**\* **terraform**\* **/.terraform**\* **.git**\* **.vscode**\* **/.cache**\*`,
        { cwd: rootDir, maxBuffer: MAX_BUFFER_SIZE }
        );
    } catch (e) {
        console.log("zip file error " + e);
    }

    console.log("Generated deployment file... " + getFullDate2() + " " + zipPath);
    
    console.log("Uploading deployment file ...");
    await s3Client.putObject({
        Body: fs.createReadStream(rootDir + '\\' + zipPath),
        Bucket: outputs[`${APPLICATION_NAME}-deployment-bucket-name`].value,
        Key: filename
    }).promise();
    
    console.log("Upload complete! Deployment file is ", filename);

    console.log("Deploying application...");

    await codeDeployClient.createDeployment({
        applicationName: outputs[`${APPLICATION_NAME}-codedeploy-app-name`].value,
        deploymentGroupName: accessEnv("CODEDEPLOY_DEPLOYMENT_GROUP_NAME"),
        revision: {
            revisionType: 'S3',
            s3Location: {
                bucket: outputs[`${APPLICATION_NAME}-deployment-bucket-name`].value,
                bundleType: "zip",
                key: filename
            }
        },
        ignoreApplicationStopFailures: true
    }).promise();
    
    console.log("Deployment initiated on Codedeploy!");

    console.log("Cleaning up...");
    console.log("Removing deployment file...");
    fs.unlinkSync(rootDir + '\\' + zipPath);
    fs.unlinkSync(rootDir + "/deploy.lock");
    fs.unlinkSync(rootDir + "/appspec.yml");
})();