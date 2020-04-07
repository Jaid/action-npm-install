import {getInput, setFailed} from "@actions/core"
import {exec} from "@actions/exec"
import {which} from "@actions/io"
import guessPackageManager from "guess-package-manager"

async function getExecInfo() {
  const packageManager = guessPackageManager()
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
  return {
    execPath: await which("npm", true),
    execArgs: ["install"],
  }
}

async function main() {
  const nodeEnv = getInput("nodeEnv")
  const {execPath, execArgs} = await getExecInfo()
  const exitCode = await exec(execPath, execArgs, {
    env: {
      ...process.env,
      NODE_ENV: nodeEnv,
    },
  })
  if (exitCode !== 0) {
    setFailed(`Installation failed with code ${exitCode}`)
    return
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-npm-install threw an Error")
})