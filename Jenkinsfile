pipeline {
  agent none
  stages {

    stage("build & SonarQube Analysis") {
      agent any
      steps{
        withSonarQubeEnv('projet_ci_cd'){
          bat 'mvn clean package sonar:sonar'
        }
      }
    }
  }
}
