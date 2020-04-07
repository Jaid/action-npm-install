Example `.github/workflows/example.yml`:

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
        uses: jaid/action-npm-install@master
```