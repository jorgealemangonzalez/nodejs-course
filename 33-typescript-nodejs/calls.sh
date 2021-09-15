curl -d "{\"text\": \"hello\"}" -H "Content-Type: application/json" -X POST http://localhost:3000/todo
curl "http://localhost:3000"
curl -X DELETE http://localhost:3000/todo/2021-09-15T11:43:52.050Z
curl -d "{\"text\": \"UPDATED\"}" -H "Content-Type: application/json" -X PUT http://localhost:3000/todo/2021-09-15T11:45:46.800Z