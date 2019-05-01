require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const httpProxy = require('http-proxy');

const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const proxy = httpProxy.createProxyServer();

const proxyServices = [
  {
    member: 'Gabe',
    endpoint: '/tracks',
    url:
      'http://sdc-tcp-load-balancer-bcd1fa8871a2a068.elb.us-east-2.amazonaws.com/',
    bundle: 'bundle.js',
    component: 'Top tracks component',
  },
  {
    member: 'Jared',
    endpoint: '/artists',
    url:
      'http://related-artists-network-lb-d7115e4731d37adf.elb.us-east-1.amazonaws.com',
    bundle: 'app.js',
    component: 'Related artists component',
  },
  {
    member: 'Jared',
    endpoint: '/icon',
    url:
      'http://related-artists-network-lb-d7115e4731d37adf.elb.us-east-1.amazonaws.com',
    bundle: 'app.js',
    component: 'Related artists component',
  },
  {
    member: 'Pete',
    endpoint: '/albums',
    url:
      'http://artist-albums-12-0fde16dd76ec6186.elb.us-west-1.amazonaws.com/',
    bundle: '',
    component: 'Albums',
  },
  {
    member: 'Rick',
    endpoint: '/data',
    url: 'http://ec2-52-14-174-177.us-east-2.compute.amazonaws.com/',
    bundle: 'app.js',
    component: 'Header component',
  },
];

const endpointConfig = target => (req, res) => proxy.web(req, res, { target });

proxyServices.forEach(({ endpoint, url }) => {
  app.all(`${endpoint}`, endpointConfig(url));
  app.all(`${endpoint}/*`, endpointConfig(url));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
