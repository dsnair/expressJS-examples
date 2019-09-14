# HTTP Codes

| Code | Purpose       |
| ---- | ------------- |
| 1xx  | Informational |
| 2xx  | Success       |
| 3xx  | Redirection   |
| 4xx  | Client Error  |
| 5xx  | Server Error  |

[https://www.restapitutorial.com/httpstatuscodes.html](https://www.restapitutorial.com/httpstatuscodes.html)

| Code | Meaning               | Details                                                           |
| ---- | --------------------- | ----------------------------------------------------------------- |
| 200  | OK                    | standard response for successful request                          |
| 201  | Created               | successful creation occurred via POST or PUT                      |
| 204  | No Content            | request was fulfilled and there is no body to return (eg: DELETE) |
| 400  | Bad Request           | client-side input validation failed                               |
| 401  | Unauthorized          | unauthorized user made the request                                |
| 404  | Not Found             | resource not found                                                |
| 500  | Internal Server Error | never explicitly set                                              |

# CURL

## GET

```bash
curl http://localhost:5000
```

```bash
curl http://localhost:5000?sortby=pet
```

```bash
curl 'http://localhost:5000?sortby=pet&limit=3'
```

Note `''` in URL for multiple query parameters.

## POST

```bash
curl http://localhost:5000 -d '{"pet":"lizard"}' -H 'Content-Type: application/json'
```

## PUT

```bash
curl http://localhost:5000/3 -d '{"pet":"bird"}' -X PUT -H 'Content-Type: application/json'
```

| Flag | Purpose                         |
| ---- | ------------------------------- |
| -d   | POST given data                 |
| -H   | specify request header type     |
| -X   | specify HTTP request method     |
| -i   | include HTTP header in response |

# Definitions

1. Endpoints = URL that points to a resource
2. Resource
3. API
4. RESTful
