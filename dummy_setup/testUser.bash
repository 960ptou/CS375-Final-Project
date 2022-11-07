# username test, userpass test
curl -X POST http://localhost:3000/cred/signup -H "Content-Type: application/json" -d '{"username": "test", "userpass":"test"}'