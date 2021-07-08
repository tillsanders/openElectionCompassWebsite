# Deployment

Currently, there are at least three ways to set up and deploy your own election compass.

## Option 1: The simple, One-File-Only Set-up

This method is the simplest to use and is suited for people without a deeper technical
understanding. You use the tools provided on the site to generate a single HTML file. This file is
deployed to your webspace. And thats it. Easy as pie.

### Requirements

- **Webspace**: You need a webserver or a webspace on a shared hosting provider. If you currently
  have a website, you are good to go.
- **FTP-Access**: In order to upload the neccessary files to your webspace, you will need access to
  the server's filesystem. If you have a web developer at hand, you can give her/him access to the
  control panel of your webspace provider, or you can look for the FTP or SFTP credentials.
  Alternatively, most providers have a file manager embedded in their web portal. To upload a single
  file, this will suffice.
- **SSL Certificate**: Your website traffic should be accessible over HTTPS. This is however not a
  strict requirement. It is recommended and has a positive impact on your visitors privacy.

### Step-by-step

1. Gather your content and open the
   [Configuration Editor](/configurator/version-1/configuration-editor.html). **Paste your content
   accordingly.**
2. When you are done editing, click **'Download' and save the generated JSON file** to your hard
   drive. You don't need to understand how this file works. Just know, that it contains all the
   content you pasted into the Configuration Editor. Make sure to not loose this file – if you need
   to make changes later, you can open it again in the Configuration Editor.
3. Open the [HTML Generator](/configurator/version-1/html-generator.html), **upload your JSON file
   and hit 'Generate'**. Your HTML file will start downloading. This file now contains the whole
   software and your content.
4. **Upload the HTML file to your webspace.** You can rename it as long as it keeps the file extension
   `.html`. You could, for example, put it in the root directory and name it: `compass.html`. It
   would then be accessible under `example.com/compass.html`. If it is not, look for a directory
   called `web`, `public` or `static` and try putting it there. If that also won't help, contact a
   professional.

## Option 2: Manual, static set-up

TBD

## Option 3: Manual set-up using Nuxt.js

TBD