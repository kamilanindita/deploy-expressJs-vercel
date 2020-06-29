{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@now/node-server" }],
  "routes": [
    {
      "src": "/",
      "dest": "/server.js",
      "methods": ["GET"]
    },
    {
      "src": "/user",
      "dest": "/server.js",
      "methods": ["GET"]
    },
    {
      "src": "/product",
      "dest": "/server.js",
      "methods": ["GET"]
    }
  ]
}