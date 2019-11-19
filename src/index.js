import path from "path"

import hasContent from "has-content"
import zahl from "zahl"
import filterNil from "filter-nil"
import fsp from "@absolunet/fsp"
import {getInput, setFailed} from "@actions/core"
import {exec} from "@actions/exec"
import {which, mkdirP} from "@actions/io"

async function main() {
  const jestReportDirectory = getInput("jestReportDirectory")
  await mkdirP(jestReportDirectory)
  const logHeapUsage = getInput("logHeapUsage")
  if (logHeapUsage) {
    console.log("Logging RAM usage in Jest tests")
  }
  const failOnOpenHandles = getInput("failOnOpenHandles")
  if (logHeapUsage) {
    console.log("Open handles detection is turned on")
  }
  const statsFile = path.join(jestReportDirectory, "stats.json")
  const jestArgs = [
    "--ci",
    "--color",
    true,
    "--passWithNoTests",
    "--json",
    "--outputFile",
    statsFile,
    logHeapUsage ? "--logHeapUsage" : null,
    "--runInBand",
    "--testFailureExitCode",
    0,
    "--coverage",
    "--coverageReporters",
    "text-summary",
    "--coverageReporters",
    "json-summary",
    "--collectCoverageFrom",
    "src/**",
    "--coverageDirectory",
    path.join(jestReportDirectory, "coverage"),
    "--coverageThreshold",
    JSON.stringify({
      global: {
        lines: Number(getInput("requiredLinesCoverage")),
        functions: Number(getInput("requiredFunctionsCoverage")),
        branches: Number(getInput("requiredBranchesCoverage")),
        statements: Number(getInput("requiredStatementsCoverage")),
      },
    }),
    failOnOpenHandles ? "--detectOpenHandles" : null,
  ] |> filterNil
  const jestDependencyFile = path.join("node_modules", "jest", "bin", "jest.js")
  const isJestInstalled = await fsp.pathExists(jestDependencyFile)
  let exitCode
  if (isJestInstalled) {
    const nodeArgs = [
      logHeapUsage ? "--expose-gc" : null,
      jestDependencyFile,
      ...jestArgs,
    ] |> filterNil
    exitCode = await exec("node", nodeArgs)
  } else {
    const npxPath = await which("npx", true)
    console.warn("Jest not found in %s, using %s instead to install and run it", jestDependencyFile, npxPath)
    exitCode = await exec(npxPath, ["jest", ...jestArgs])
  }
  if (exitCode !== 0) {
    setFailed(`Jest CLI returned exit code ${exitCode}`)
    return
  }
  const stats = await fsp.readJson(statsFile)
  if (stats.numFailedTests) {
    setFailed(`${zahl(stats.numFailedTests, "test")} did fail`)
    return
  }
  if (failOnOpenHandles && hasContent(stats.openHandles)) {
    setFailed(`Jest detected ${zahl(stats.openHandles.length, "open handle")}`)
    return
  }
}

main()