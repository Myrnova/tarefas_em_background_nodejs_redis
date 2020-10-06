import Queue from 'bull';
import redisConfig from '../../config/redis'

import  * as jobs from '../jobs'

const queues = Object.values(jobs).map( job =>({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options

})) // filas exibidas pro redis

export default { // quando inicia ele roda o export primeiro entao chama a queues
    queues, 
    add(name, data) {
        const queue = this.queues.find(queue => queue.name === name); // checagem primeiro

        return queue.bull.add(data, queue.options); //adicionar na fila
    },
    process(){
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (job, err) =>{
                console.log('Job failed', queue.key, job.data);
                console.log(err);
            })
        })
    }
}