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
curl http://localhost:5000
```

```bash
curl http://localhost:5000 -o response.json
```

```bash
curl http://localhost:5000?sortby=pet
```

```bash
curl 'http://localhost:5000?sortby=pet&limit=3'
```

Note `''` in URL for multiple query parameters.

## 2. POST

```bash
curl http://localhost:5000 -d '{"pet":"lizard"}' -H 'Content-Type: application/json'
```

```bash
curl http://localhost:5000 -d '{"pet":"lizard"}' -H 'Content-Type: application/json' -H 'name:divya' -H 'password: password'  # send authentication credentials
```

## 3. PUT

```bash
curl http://localhost:5000/3 -d '{"pet":"bird"}' -X PUT -H 'Content-Type: application/json'
```

## 4. DELETE

```bash
curl http://localhost:5000/1 -X DELETE
```

```bash
curl http://localhost:5000/1 -X DELETE -i
```

| Flag        | Purpose                         |
| ----------- | ------------------------------- |
| -d          | POST given data                 |
| -H          | send request header             |
| -X          | specify HTTP request method     |
| -i          | include HTTP header in response |
| -o filename | save response in a file         |

# C. Concepts

1. Endpoint = URL that points to a resource
2. Resource
3. API
4. RESTful

5. Data Normalization  
   Normalizing data means that the following conditions are met:  
    i. Each record has a primary key  
    ii. No fields are repeated  
    iii. Each field entry contains a single data point (example: no arrays)  
    iv. There are no redundant data entries  
    v. All field relate directly to the main data keyed by the primary key  
   [Reference](https://www.youtube.com/watch?v=TUsoTNch95w)

6. Table Relationships  
   [Reference](https://www.youtube.com/watch?v=-Bau_Ed18Og)

   - One-to-One
        - Example: citizens & SSNs. A citizen has one SSN, and a SSN belongs to one citizen.

   - One-to-Many
        - Example: users & posts. A user makes many posts, but a post belongs to only one user.
        - This is a use case for using the foreign key. Foreign key always belongs to the many-table (posts) where it relates to the primary key from the one-table (user).

   - Many-to-Many
        - Example: students & classes. A student registers for many classes, and a class contains many students.
        - Many-to-many relationships are broken apart to two one-to-one relationships by having a third table (called the join table). This table has two fields: the primary key from each of the two tables. Each record shows how one primary key value relates to the other primary key value.

7. PUT vs. PATCH

   - PUT replaces an entire record with the new provided record. Whereas, PATCH updates a specific field within a record with the new provided value for that field.
   - PUT is idempotent. PATCH is not _guaranteed_ to be idempotent, i.e. successive identical PATCH requests _may_ lead to different results. Since PATCH updates a resource field, it _might_ require a concrete previous value of the field, which makes it non-idempotent. (PATCH can be made idempotent with [the use of HTTP ETag header with If-Match conditional](http://www.albertoleal.me/posts/how-to-prevent-race-conditions-in-restful-apis.html).)
