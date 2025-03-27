const { ProfileCredentials, ProfileInfo } = require("@zowe/imperative");
const util = require("node:util");
(async () => {
    const homeDir = __dirname;
    process.env["ZOWE_CLI_HOME"] = homeDir;
    const requireKeytar = () => require("@zowe/secrets-for-zowe-sdk").keyring;
    const profInfo = new ProfileInfo("zowe", {
        overrideWithEnv: true,
        credMgrOverride: ProfileCredentials.defaultCredMgrWithKeytar(requireKeytar),

        checkLevelLayers: process.argv[2] ? parseInt(process.argv[2]) : true, // New option
    });
    await profInfo.readProfilesFromDisk({ homeDir, projectDir: false }); // Works

    const baseProfNames = profInfo.getAllProfiles("base");
    const profileArgs = [];
    for (const [index, element] of baseProfNames.entries()) {
        profileArgs[index] = {
            mergedArgs: profInfo.mergeArgsForProfile(element, { getSecureVals: true }),
            name: element.profName, // save profile name
            type: element.profType, // save profile type - just in case
            jsonLoc: element.profLoc.jsonLoc, // save the json file location - just in case
        };
    }

    console.log(util.inspect(profileArgs, true, 6, true));
})().catch((err) => {
    console.error(err);
    process.exit(1);
});