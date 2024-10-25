pipeline {
    agent any

    environment {
        dotenv = load '.env'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    docker.build('my-backend', './backend')
                }
            }
        }
        stage('Run Tests') {
            steps {
                sh 'docker-compose --env-file .env run backend npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose --env-file .env up -d'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
