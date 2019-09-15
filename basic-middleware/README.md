```bash
curl http://localhost:5000/ # without authorization
```

```bash
curl http://localhost:5000/ -H 'name:divya' # with authorization
```

| Flag        | Purpose                               |
| ----------- | ------------------------------------- |
| -H          | send customized request header        |