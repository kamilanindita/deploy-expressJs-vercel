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
      "src": "/user/(.*)", "dest": "/controllers/userEndpoint.js",
      "methods": ["GET"]
    },
    {
      "src": "/controllers/productEndpoint.js",
      "dest": "/controllers/productEndpoint.js",
      "methods": ["GET"]
    }
  ]
}