# Lanlink-Test


Este projeto usa as seguintes tecnologias:
- [React](https://reactjs.org) e [React Router](https://reacttraining.com/react-router/)
- [Express](http://expressjs.com/) e [Node](https://nodejs.org/en/) para o backend
- [MongoDB](https://www.mongodb.com/) para o Database
- [Redux](https://redux.js.org/basics/usagewithreact) para a condução do front com o back.

Outras tecnologias utilizadas no projeto (packages e servidor):
- [MongoDB Atlas](https://www.mongodb.com/cloud) server
- [Nodemon](https://nodemon.io/)

## Packages

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express](https://www.npmjs.com/package/express)
- [install](https://www.npmjs.com/package/install)
- [is-empty](https://www.npmjs.com/package/is-empty)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [npm](https://www.npmjs.com/package/npm)
- [passport](https://www.npmjs.com/package/bbody-parser)
- [passport-jwt](https://www.npmjs.com/package/passport-jwt)
- [save](https://www.npmjs.com/package/save)
- [validator](https://www.npmjs.com/package/validator)
- [axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [redux](https://www.npmjs.com/package/redux)
- [redux-thunk](https://www.npmjs.com/package/bbody-parser)

## Configuration

Caso deseje troque a `MONGOURI` pela sua própria no servidor/ou sua URI local em `config/keys.js`. E adicione um secret para segurança da sua API/password.

```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};

## Start
(Assumindo que possui node/npm e mongo).
```javascript
// Tenha convição que tem o nodemon instalado, se não tiver rode o comando:
npm install -g nodemon

// Run server com o comando:
npm run server

// Run client com o comando:
npm run client


// API irá rodar em http://localhost:5000 e o client em http://localhost:3000
```

## Mais informações

Para mais informações como contas, e conveções utilizadas no projeto favor verificar o e-mail. Grato.




