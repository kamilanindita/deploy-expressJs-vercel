{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@now/node-server" }],
  "routes": [
    {
      "src": "/",
      "dest": "/index.js",
      "methods": ["GET"]
    },
    {
      "src": "/user",
      "dest": "/index.js",
      "methods": ["GET"]
    },
    {
      "src": "/product",
      "dest": "/index.js",
      "methods": ["GET"]
    }
  ]
}