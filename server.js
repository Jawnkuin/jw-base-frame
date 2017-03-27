import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

import schema from './server/graphql';


const app = express();
const port = 3000;
mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost/jwp');
app.use(bodyParser.urlencoded({extnded: false}));
app.use(bodyParser.json({limit: 100000000}));

app.use('/graphql', graphqlHTTP({
  schema: schema.getSchema(),
  rootValue: {
    data: db
  },
  graphiql: true
}));

app.use('/assets', express.static(path.join(__dirname, 'client/assets')));

const webpackCompiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(webpackCompiler, {noInfo: false, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(webpackCompiler));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(port, () => {
  console.info(`start at localhost:${port}`);
});

export default app;
