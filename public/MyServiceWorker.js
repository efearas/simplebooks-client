importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.routing.registerRoute(  
  /\.css$|fonts|.png$|.js$|login$/,  
  new workbox.strategies.StaleWhileRevalidate({
    "cacheName":"styles",
  })
);
