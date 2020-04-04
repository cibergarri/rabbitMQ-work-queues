
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

Note you cam have more than one worker running, the tasks will be picked by one or another and if one of the workers stops, the task will be moved to the iother.