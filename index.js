import express from 'express'
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import{join,dirname} from 'path'
import{fileURLToPath} from 'url'



// inicializacion
const app=express();
const __dirname = dirname(fileURLToPath(import.meta.url));


//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
defaultLayout: 'main',
layoutsDir: join(app.get('views'), 'layouts'),
partialsDir: join(app.get('views'), 'partitials'),
extname:'hbs',

}));
app.set('view engine','.hbs');



//middeleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//rutas
app.get('/',(req,res)=>{
  res.json({"message": "hola"});
})

//public files
app.use(express.static(join(__dirname, 'public')));

//Run Server
app.listen(app.get('port'),()=>
  console.log('Server listening on port',app.get('port')));