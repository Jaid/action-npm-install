import {getInput} from "@actions/core"
import {which} from "@actions/io"
import {exec} from "@actions/exec"

async function main() {
  const nodeEnv = getInput("nodeEnv")
  const npmPath = await which("npm", true)
  await exec(npmPath, "install", {
    env: {
      NODE_ENV: nodeEnv,
    },
  })
}

main()