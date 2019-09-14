# A. HTTP Codes

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

# B. CURL

## 1. GET

```bash
curl http://localhost:5000/pets
```

```bash
curl http://localhost:5000/pets -o response.json
```

| Flag        | Purpose                 |
| ----------- | ----------------------- |
| -o filename | save response in a file |
