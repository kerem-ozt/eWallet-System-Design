import express from 'express';
import path from 'path';
import fs from 'fs';
import TokenHelper from '../Middlewares/TokenHelper';
const app = express();

const basename = path.basename(__filename);
const folderRoute = path.dirname(__filename);

fs.readdir(folderRoute, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach(file => {
      if (file === basename || !file.endsWith('.js')) return; 
      const routeName = path.parse(file).name.toLowerCase();
      const route = require(`./${file}`).default; 
      
      if (routeName === 'auth') {
        app.use(`/${routeName}`, route);
      } else {
        app.use(`/${routeName}`, TokenHelper.verifyToken, route);
      }
    });
  }
});

export default app;
