# HTTP Codes

| Code | Purpose       |
|------|---------------|
| 1xx  | Informational |
| 2xx  | Success       |
| 3xx  | Redirection   |
| 4xx  | Client Error  |
| 5xx  | Server Error  |

[https://www.restapitutorial.com/httpstatuscodes.html](https://www.restapitutorial.com/httpstatuscodes.html)

| Code | Meaning               | Details                                                           |
|------|-----------------------|-------------------------------------------------------------------|
| 200  | OK                    | standard response for successful request                          |
| 201  | Created               | successful creation occurred via POST or PUT                      |
| 204  | No Content            | request was fulfilled and there is no body to return (eg: DELETE) |
| 400  | Bad Request           | client-side input validation failed                               |
| 401  | Unauthorized          | unauthorized user made the request                                |
| 404  | Not Found             | resource not found                                                |
| 500  | Internal Server Error | never explicitly set                                              |

# CURL

1. GET
```bash
curl http://localhost:5000
```

2. POST
```bash
curl http://localhost:5000 -d '{"name":"lizard"}' -H "Content-Type: application/json"
```

| Flag | Purpose                 |
|------|-------------------------|
| -d   | POST given data         |
| -H   | set request header type |

# Definitions

1. Endpoints = URL that points to a resource
2. Resource
3. API
4. RESTful
