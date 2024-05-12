pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'ng build --configuration production'
            }
        }
    }
}
