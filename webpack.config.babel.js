import path from "path"

import configure from "webpack-config-jaid"

export default configure({
  type: "nodeScript",
  include: false,
  nodeExternals: false,
  outDir: path.join(__dirname, "build"),
  licenseFileName: false,
})