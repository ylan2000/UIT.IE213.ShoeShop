Link on heroku: [Sneaker City site](glacial-reef-79728.herokuapp.com/)
## To run project
1. Install [npm](https://www.npmjs.com/get-npm)
2. Install all packages are defined in package.json via command: `npm install`
3. Rename file **virtual.config.env** to **config.env**

   > config.env is a file to define all environment variables are used in the project

4. Replace **?** in the _config.env_ file with **yours values**
   - PORT: port to run the project in localhost
   - DATABASE: the link to mongodb
   - DATABASE_PASSWORD: password of database
   - STRIPE_SECRET_KEY and STRIPE_PUBLIC_KEY: stripe key for transaction

5. Run project with given port via the command: `npm start`
----
Hope you enjoy :blush:
