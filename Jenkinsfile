#!groovy

@Library('blockr-jenkins-lib') _

String repo = "blockr-wallet"

Map settings = [
    sonar_key: "blockr-wallet",
    source_folder: "src/",
    archive_folders: ["dist/", "release/"]
]

tsBuild(repo, settings)
