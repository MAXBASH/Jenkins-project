pipeline {
    agent any

    environment {
        JAVA_HOME = '/opt/homebrew/opt/openjdk@17'
        // PATH = "/usr/local/bin:$PATH"
        PATH = "${JAVA_HOME}/bin:/usr/local/bin:$PATH"
        DOCKER_IMAGE = "manoz3896/devops-nodejs-app:${BUILD_NUMBER}"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        SONARQUBE_SCANNER = tool 'SonarQube-Scanner'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('sonarqube-token') 
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MAXBASH/devops-nodejs-app.git'
            }
        }

        stage('Check Docker') {
            steps {
                sh 'which docker'
                sh 'docker --version'
                sh 'docker ps'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Test') {
            steps {
                sh 'docker run --rm $DOCKER_IMAGE npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    $SONARQUBE_SCANNER/bin/sonar-scanner \
                      -Dsonar.projectKey=devops-nodejs-app \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=$SONAR_HOST_URL \
                      -Dsonar.login=$SONAR_LOGIN
                    '''
                }
            }
        }

        stage('Push to Registry') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 --name devops-nodejs-app $DOCKER_IMAGE'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}