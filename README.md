
start rabbitMQ in docker:
```
 docker run -d --name amqp.test -p 5672:5672 rabbitmq
```

start worker in one bash
```
  npm run worker
```

send tasks in another bash emulating the time taken by the dots
```
  npm run new-task task_name..............
```