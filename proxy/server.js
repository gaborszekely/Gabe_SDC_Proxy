const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3004;
const httpProxy = require("http-proxy");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

const proxy = httpProxy.createProxyServer();

const endpointConfig = target => (req, res) => {
  proxy.web(req, res, { target });
};

app.all("/tracks/*", endpointConfig("http://localhost:3000"));

app.listen(port, () => console.log('Server started on port ' + port));
/*
app.all("/data/artist/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-191-230-44.us-east-2.compute.amazonaws.com/"
  });
});

app.all("/data/toptracks", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-191-178-115.us-east-2.compute.amazonaws.com/"
  });
});

app.get('/data/albumswithartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-3-17-177-153.us-east-2.compute.amazonaws.com/'
  });
});

app.get('/data/albumsbyartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-3-17-177-153.us-east-2.compute.amazonaws.com/'
  });
});

app.get('/data/epswithartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-3-17-177-153.us-east-2.compute.amazonaws.com/'
  });
});

app.get('/data/compilationswithartist/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://ec2-3-17-177-153.us-east-2.compute.amazonaws.com/'
  });
});

app.all("/data/artist", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-34-227-148-64.compute-1.amazonaws.com/"
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
*/
