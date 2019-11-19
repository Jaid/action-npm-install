import {which} from "@actions/io"
import {exec} from "@actions/exec"

async function main() {
  const npmPath = await which("npm", true)
  await exec(npmPath, "install", {
    env: {
      NODE_ENV: "development",
    },
  })
}

main()