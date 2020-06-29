{
  "version": 2,
  "name": "pasar-restfulApi
  "builds": [{ "src": "/app.js", "use": "@now/node-server" }],
  "routes": [
    {
      "src": "/",
      "dest": "/app.js",
      "methods": ["GET"]
    },
    {
      "src": "/user", "dest": "/app.js",
      "methods": ["GET"]
    },
    {
      "src": "/product",
      "dest": "/app.js",
      "methods": ["GET"]
    }
  ]
}