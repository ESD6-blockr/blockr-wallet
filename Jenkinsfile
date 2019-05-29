#!groovy

@Library('blockr-jenkins-lib') _

String repo = "blockr-wallet"

Map settings = [
    sonar_key: "blockr-wallet",
    source_folder: "src/",
    archive_folders: ["dist/", "release/"],
    yarn: true,
    skip_tests: true,
    sonar_exclusions: "src/*"
]

tsBuild(repo, settings)

