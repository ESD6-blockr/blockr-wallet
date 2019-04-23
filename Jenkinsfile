#!groovy

@Library('blockr-jenkins-lib') _

String repo = "blockr-wallet"
String project = ""
String solution = ""

Map settings = [
    sonar_key: "blockr-wallet",
    source_folder: "src/",
    archive_folders: ["dist/", "release/"]
]

tsBuildAndPublish(repo, settings)
