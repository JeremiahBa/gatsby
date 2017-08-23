/* @flow */

const buildCSS = require(`./build-css`)
const buildHTML = require(`./build-html`)
const buildProductionBundle = require(`./build-javascript`)
const bootstrap = require(`../bootstrap`)
const report = require(`gatsby-cli/lib/reporter`)
const { formatStaticBuildError } = require(`gatsby-cli/lib/reporter/errors`)
const apiRunnerNode = require(`../utils/api-runner-node`)
const copyStaticDirectory = require(`../utils/copy-static-directory`)

function reportFailure(msg, err: Error) {
  report.log(``)
  report.panic(
    msg,
    err.name !== `WebpackError` ? err : formatStaticBuildError(err)
  )
}

module.exports = async function build(program: any) {
  const { graphqlRunner } = await bootstrap(program)
  // Copy files from the static directory to
  // an equivalent static directory within public.
  copyStaticDirectory()

  let activity = report.activityTimer(`Generating CSS`)
  activity.start()
  await buildCSS(program).catch(err => {
    reportFailure(`Generating CSS failed`, err)
  })
  activity.end()

  activity = report.activityTimer(`Compiling production bundle.js`)
  activity.start()
  await buildProductionBundle(program).catch(err => {
    reportFailure(`Generating site JavaScript failed`, err)
  })
  activity.end()

  activity = report.activityTimer(`Generating static HTML for pages`)
  activity.start()
  await buildHTML(program).catch(err => {
    reportFailure(
      report.stripIndent`
        Generating static HTML for pages failed

        See our docs page on debugging HTML builds for help https://goo.gl/yL9lND
      `,
      err
    )
  })
  activity.end()

  await apiRunnerNode(`onPostBuild`, { graphql: graphqlRunner })

  report.info(`Done building in ${process.uptime()} sec`)
}
