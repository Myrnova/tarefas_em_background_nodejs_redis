import "dotenv/config";
import  express from "express"; 
import BullBoard from 'bull-board';

import UserController from './app/controllers/UserController';
import Queue from './app/lib/Queue';

const app = express();
BullBoard.setQueues(Queue.queues.map(queue => queue.bull)); // acessando todas as queues configuradas na fila e dando map para cada fila adicionando no bull
app.use(express.json());

app.post('/users', UserController.store);

app.use('/admin/queues', BullBoard.UI);

app.listen(process.env.PORT, () =>{
    console.log(`Server running on the ${process.env.Port}`)
})