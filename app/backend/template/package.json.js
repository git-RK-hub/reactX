const packageJSON = (project, author) => `{
    "name": "${project}",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
      "start": "node app.js",
      "dev": "nodemon app.js",
      "start:prod": "NODE_ENV=production nodemon app.js"
    },
    "author": "${author}",
    "license": "ISC",
    "dependencies": {
      "axios": "^0.21.1",
      "bcryptjs": "^2.4.3",
      "body-parser": "^1.19.0",
      "cookie-parser": "^1.4.4",
      "cors": "^2.8.5",
      "dotenv": "^7.0.0",
      "express": "^4.16.4",
      "express-rate-limit": "^3.5.0",
      "helmet": "^3.16.0",
      "morgan": "^1.9.1",
      "xss-clean": "^0.1.1"
    },
    "devDependencies": {
      "eslint": "^5.16.0",
      "eslint-config-airbnb": "^17.1.0",
      "eslint-config-prettier": "^4.1.0",
      "eslint-plugin-import": "^2.17.2",
      "eslint-plugin-jsx-a11y": "^6.2.1",
      "eslint-plugin-node": "^8.0.1",
      "eslint-plugin-prettier": "^3.0.1",
      "eslint-plugin-react": "^7.12.4",
      "prettier": "^1.17.0"
    }
  }
`;

export default packageJSON;
