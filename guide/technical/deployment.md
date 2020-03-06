# Deployment

## Requirements

Open Election Compass works completely in the browser. At the moment, no server-side rendering is
necessary (we are working on that, though to make the system accessible for search engine crawlers).
This means, that neither PHP, nor Node.js is required. All you really need is a basic web server:

- **Webspace**: You need a webserver or a webspace on a shared hosting provider. If you currently
  have a website, you are good to go.
- **FTP-Access**: In order to upload the neccessary files to your webspace, you will need access to
  the server's filesystem. If you have a web developer at hand, you can give her/him access to the
  control panel of your webspace provider, or you can look for the FTP or SFTP credentials.
- **SSH Certificate**: Your website traffic should be accessible over HTTPS. This is however not a
  strict requirement. It is recommended and has a positive impact on your visitors privacy.