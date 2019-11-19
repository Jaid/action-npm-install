import {getInput, setFailed} from "@actions/core"
import {which} from "@actions/io"
import {exec} from "@actions/exec"

async function main() {
  const nodeEnv = getInput("nodeEnv")
  const npmPath = await which("npm", true)
  const exitCode = await exec(npmPath, "install", {
    env: {
      NODE_ENV: nodeEnv,
    },
  })
  if (!exitCode !== 0) {
    setFailed(`Installing failed with code ${exitCode}`)
    return
  }
}

main()