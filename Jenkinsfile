#!groovy

@Library('blockr-jenkins-lib@implement-yarn') _

String repo = "blockr-wallet"

Map settings = [
    sonar_key: "blockr-wallet",
    source_folder: "src/",
    archive_folders: ["dist/", "release/"],
    yarn: true,
    skip_Tests: true
]

tsBuild(repo, settings)

