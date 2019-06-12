
# Blockr Wallet
<p align="center">
  <img width="150" height="150" src="https://i.imgur.com/kHgOpzd.png">
</p>

<div align="center">
  
|**CI**|**SonarQube**|
|:-:|:-:|
|[![Build Status](https://jenkins.naebers.me/buildStatus/icon?job=Blockr%2Fblockr-wallet%2Fmaster)](https://jenkins.naebers.me/job/Blockr/job/blockr-wallet/job/master/)|[![Quality Gate Status](https://sonarqube.naebers.me/api/project_badges/measure?project=blockr-wallet&metric=alert_status)](https://sonarqube.naebers.me/dashboard?id=blockr-wallet)|
</div>

## Development
Because npm gave us some problems we use `yarn` for this project. If you don't have yarn this can be installed with `npm install -g yarn`, after intalling run `yarn`.
Both processes have to be started **simultaneously** in different console tabs:

```bash
yarn start-renderer-dev
yarn start-main-dev
```

This will start the application with hot-reload so you can instantly start developing your application.

You can also run do the following to start both in a single process:

```bash
yarn dev
```

## Installation
On the release tap you can download the executable for your system. (https://github.com/ESD6-blockr/blockr-wallet/releases) You can also build your own executable described above.

## Packaging
We use [Electron builder](https://www.electron.build/) to build and package the application. By default you can run the following to package for your current platform:

```bash
yarn dist
```

This will create a installer for your platform in the `releases` folder.

```bash
yarn dist -- -mwl
```


## Husky and Prettier
This project comes with both Husky and Prettier setup to ensure a consistent code style.
There are precommits for both of those.
