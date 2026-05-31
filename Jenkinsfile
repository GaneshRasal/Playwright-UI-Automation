pipeline{
    agent any

    parameters{
       string(name: 'TAG_NAME', defaultValue:'@ui', description: 'Enter the tag to run') 
    }

    stages{
        stage('Checkout Code') {
            steps{
               checkout scm
            }
        }

        stage('Run Tagged Tests') {
            steps {
                // IMPORTANT: You must use double quotes (" ") here in Groovy 
                // so that the ${params.TAG_NAME} variable injects correctly!
                bat "npm run test -- ${params.TAG_NAME}"
            }
        }
    }

    post {
        always {
         bat "npm run test"
        }
    }
}