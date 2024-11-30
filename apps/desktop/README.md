# Modular Cloud desktop app

## How to run the project

1. Setup the environment variables needed to build the project with electron by modifying `app/web/.env` :

   ```shell
   INTERNAL_INTEGRATION_API_URL=<private-api-for-getting-network-chains>
   NEXT_PUBLIC_SVM_METRICS="https://fr64dzklc3.execute-api.us-west-2.amazonaws.com/prod"
   NEXT_PUBLIC_ADOBE_EMBED_API_KEY="a165f09589fc4cd29a574b37d1212a96"
   NEXT_PUBLIC_TARGET='electron'
   ```

2. Build the nextjs app :

   ```shell
   # go to the root
   cd ../..

   # build the nextjs app
   npx turbo run build --filter web
   ```

   You may get an error when building the app,
   for that you can go to the web folder and build it manually :

   ```shell
   cd apps/web
   npm run prefetch:networks
   npm run build
   ```

3. Export the built files from the next app :

   ```shell
   cd apps/web
   npm run prepare-electron
   ```

4. Run the desktop project :

   ```shell
   npx electron index.js
   ```

5. (Optional) Build and release the project :

   ```shell
   TODESKTOP_ACCESS_TOKEN=<token> TODESKTOP_EMAIL=<email>  todesktop build
   ```
