pipeline {
    agent any

    parameters {
        string(name: 'TAG_NAME', defaultValue: '@ui', description: 'Enter the tag to run')
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tagged Tests') {
            steps {
                bat "npm run test -- --tags ${params.TAG_NAME}"
            }
        }
    }

   post {
    always {
        withCredentials([string(credentialsId: 'groq-api-key', variable: 'GROQ_API_KEY')]) {
            bat "npm run report"
        }

        publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports/html-report',
            reportFiles: 'index.html',
            reportName: 'Cucumber HTML Report'
        ])
    }
}