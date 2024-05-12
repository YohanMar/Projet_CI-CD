pipeline {
  agent none
  stages {

    stage("build & SonarQube Analysis") {
      agent any
      steps{
        withSonarQubeEnv('projet_ci_cd'){
          sh 'mvn clean package sonar:sonar'
        }
      }
    }
  }
}
