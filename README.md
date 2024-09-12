# Sandstorm Website

Welcome to the **Sandstorm Website** project! This guide will help you set up the project locally so you can contribute to the website's development. Follow the instructions carefully, and you'll be up and running in no time!

## Contribution Guide

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js**: Download and install from [nodejs.org](https://nodejs.org).
- **Nodemon** (installed globally): A tool to auto-restart your server when code changes.

To install Nodemon globally, use the following command:
```bash
npm install -g nodemon
```

### Setting Up Your Local Environment

Follow these steps to get the website running locally:

1. **Clone the repository**:  
   Begin by cloning the repository to your machine:
   ```bash
   git clone https://github.com/yourusername/sandstorm-website.git
   cd sandstorm-website/wiki
   ```

2. **Install dependencies**:  
   The project dependencies must be installed in the `wiki/` folder, so the `node_modules` directory is created inside it. Run the following command inside the `wiki/` folder:
   ```bash
   npm install
   ```

3. **Run the server**:  
   After installing the dependencies, start the server using Nodemon:
   ```bash
   nodemon server.js
   ```

   This will start the server on `localhost:80`. You can now access the website in your browser by simply typing `localhost` (no need to specify the port number since it's running on port 80).
   
   **Note:** You might need to run it with ``sudo`` to avoid access denied errors if they show up. If using Windows, elevate the terminal's admin privileges with UAC.
   
### Making Contributions

Now that the server is running, you can start making changes to the website! Here's a breakdown of the project's structure and how you can contribute.

#### Core Files and Directories

- **`views/`**:  
  This folder contains all the EJS files, which are the core of the website's pages. For example, the `index.ejs` file is the main homepage. You can add or modify these EJS templates to change the website's content.
  
  EJS allows us to include reusable components (partials) and pass dynamic content from the server to the views. For example:
  ```html
  <!-- views/index.ejs -->
  <html>
  <head>
      <title>Welcome to Sandstorm</title>
  </head>
  <body>
      <%- include('partials/header') %>
      <h1><%= content.welcomeMessage %></h1>
      <%- include('partials/footer') %>
  </body>
  </html>
  ```

- **`views/partials/`**:  
  This is where reusable components like headers, footers, and navigation menus are stored. These partials can be included in other EJS files. For example:
  ```ejs
  <%- include('partials/navbar') %>
  ```

- **`public/`**:  
  This directory contains all the static files served to the client, such as CSS, JavaScript, and images. Anything in this folder is publicly accessible. The structure usually looks like this:
  ```
  public/
  ├── css/
  ├── images/
  ├── webfonts/
  └── js/
  ```

  You can modify styles in `public/css/`, add images to `public/images/`, or include custom fonts and scripts.

#### Localization System

The website supports multiple languages using a localization system. The language-specific content is stored in the `localization/` folder as JSON files. Currently, there are two languages supported: English (`en.json`) and Portuguese (`pt.json`).

When a user visits the site, they can pass a `?lang=` query parameter in the URL to change the language. For example, `localhost?lang=pt` would load the website in Portuguese.

Example of a localization JSON file:
```json
{
  "welcomeMessage": "Bem-vindo ao Sandstorm!"
}
```

The server loads the appropriate file based on the user's language selection and injects it into the EJS templates.

### Workflow

After setting up the environment, you can start editing the EJS files or tweaking the server code. Once changes are made:
1. **Nodemon** will automatically restart the server.
2. Open your browser at `localhost` and hit **F5** to refresh the page to see your changes live.

Feel free to edit the server, styles, or EJS pages—then reload the browser to check out the updates!
