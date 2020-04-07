import fsp from "@absolunet/fsp"
import {getInput, setFailed} from "@actions/core"
import {exec} from "@actions/exec"
import {which} from "@actions/io"
import getBooleanActionInput from "get-boolean-action-input"
import guessPackageManager from "guess-package-manager"

async function getExecInfo() {
  const packageManagerInput = getInput("packageManager")
  let packageManager
  if (packageManagerInput === "auto") {
    packageManager = guessPackageManager()
  } else {
    packageManager = packageManagerInput
  }
  if (packageManager === "yarn") {
    return {
      execPath: await which("npx", true),
      execArgs: ["yarn", "install"],
    }
  }
  if (packageManager === "pnpm") {
    return {
      execPath: await which("npx", true),
      execArgs: ["pnpm", "install"],
    }
  }
  if (packageManager === "npm") {
    return {
      execPath: await which("npm", true),
      execArgs: ["install"],
    }
  }
  throw new Error(`Unsupported package manager "${packageManager}"`)
}

async function main() {
  const skipIfNodeModulesExists = getBooleanActionInput("skipIfNodeModulesExists")
  if (skipIfNodeModulesExists) {
    const nodeModulesExists = await fsp.pathExists("node_modules")
    if (nodeModulesExists) {
      return
    }
  }
  const nodeEnv = getInput("nodeEnv")
  const {execPath, execArgs} = await getExecInfo()
  const env = {
    ...process.env,
  }
  if (nodeEnv) {
    env.NODE_ENV = nodeEnv
  }
  const exitCode = await exec(execPath, execArgs, {env})
  if (exitCode !== 0) {
    setFailed(`Installation failed with code ${exitCode}`)
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-npm-install threw an Error")
})