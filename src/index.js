import  express  from "express";
import { engine } from "express-handlebars";
import { join,dirname } from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import chalk from "chalk";

import homeRouter from './routes/routes.main.js';
import crudRouter from './routes/routes.crud.js';
import filesRouter from "./routes/routes.files.js";

// Initialization
const app = express();
const __dirname= dirname(fileURLToPath(import.meta.url));

// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', join(__dirname,'views'));
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(fileUpload({
    limits: 5000000,
    abortOnLimit:true,
    responseOnLimit:"El tamaño de la imagen supera lo aceptado"
}))

// Routes
app.use(homeRouter,crudRouter, filesRouter);

// Public Files

app.use(express.static(join(__dirname,'public')));
// Run Server
app.listen(app.get('port'), ()=>{
    console.log(chalk.bgGreenBright(`USE (alt)crtl + click: http://localhost:${app.get('port')}`))
    }
);
