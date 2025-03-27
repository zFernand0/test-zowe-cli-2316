# test-zowe-cli-2316

1. `npm install`
2. `zowe config secure`
  - Provide a dummy user and password
3. `npm run test`

**Notes:**
- Use `npm run test:fix` to test the fix.
- Use `npm run test:bug` to see the bug.
- When testing the VSIX, please set the ZOWE_CLI_HOME to root of this project