# gatsby-plugin-create-client-paths

**Please Note:** With recent versions of Gatsby this plugin became obsolete. You should use the [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#creating-client-only-routes) to create client-only paths.

Use this plugin to simplify creating a “hybrid” Gatsby app with both statically rendered pages as well as "client-paths". These paths exist on the client only and do not correspond to index.html files in an app's built assets.

For more information refer to [client-only routes & user authentication](https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/).

## Usage

Install:

```shell
npm install gatsby-plugin-create-client-paths
```

Then configure via `gatsby-config.js`:

```js
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
```

In this example, all paths prefixed by `/app/` will render the route described
in `src/pages/app.js`.
