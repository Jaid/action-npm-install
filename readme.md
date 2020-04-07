# action-npm-install


<a href="https://raw.githubusercontent.com/jaid/action-npm-install/master/license.txt"><img src="https://img.shields.io/github/license/jaid/action-npm-install?style=flat-square" alt="License"/></a> <a href="https://github.com/sponsors/jaid"><img src="https://img.shields.io/badge/<3-Sponsor-FF45F1?style=flat-square" alt="Sponsor action-npm-install"/></a>  
<a href="https://actions-badge.atrox.dev/jaid/action-npm-install/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2Fjaid%2Faction-npm-install%2Fbadge" alt="Build status"/></a> <a href="https://github.com/jaid/action-npm-install/commits"><img src="https://img.shields.io/github/commits-since/jaid/action-npm-install/v1.1.0?style=flat-square&logo=github" alt="Commits since v1.1.0"/></a> <a href="https://github.com/jaid/action-npm-install/commits"><img src="https://img.shields.io/github/last-commit/jaid/action-npm-install?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/jaid/action-npm-install/issues"><img src="https://img.shields.io/github/issues/jaid/action-npm-install?style=flat-square&logo=github" alt="Issues"/></a>  

**GitHub Action for installing dependencies from package.json after checkout.**








## Example

Example workflow that runs whenever commits are pushed on branch `master`.

`.github/workflows/example.yml`:
```yaml
name: Validate and autofix
on:
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: actions/checkout
        uses: actions/checkout@v2.0.0
      - name: actions/setup-node
        uses: actions/setup-node@v1.4.1
        with:
          node-version: "13.9.0"
      - name: npm install
        uses: jaid/action-npm-install@v1.1.0
```







## Options



<table>
<tr>
<th></th>
<th>Type</th>
<th>Default</th>
<th>Info</th>
</tr>
<tr>
<td>nodeEnv</td>
<td>string</td>
<td>a</td>
<td>NODE_ENV setting for installing execution (affects the amount of dependencies installed, but I would recommend keeping development in any case)</td>
</tr>
<tr>
<td>packageManager</td>
<td>string</td>
<td>auto</td>
<td>Can be "npm", "yarn", "pnpm" or "auto". "auto" will determine the package manager by looking into the repo's files. This is very accurate, so you normally don't want to change this.</td>
</tr>
</table>











## Development



Setting up:
```bash
git clone git@github.com:jaid/action-npm-install.git
cd action-npm-install
npm install
```


## License
[MIT License](https://raw.githubusercontent.com/jaid/action-npm-install/master/license.txt)  
Copyright © 2020, Jaid \<jaid.jsx@gmail.com> (https://github.com/jaid)
