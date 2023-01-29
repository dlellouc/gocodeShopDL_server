import { express } from 'express'
import cors from 'cors'

// server initialization
const app = express();

// middlewares for the server
app.use(express.json());
app.use(cors());

// listener at the bottom which concludes the listening function to fulfill all of the requests
app.listen(8000, () => {
    console.log('server listening at port *')
});