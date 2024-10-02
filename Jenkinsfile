pipeline {
    agent any

    environment {
        JAVA_HOME = '/opt/homebrew/opt/openjdk@17'
        PATH = "/opt/homebrew/bin:${JAVA_HOME}/bin:/usr/local/bin:$PATH"
        DOCKER_IMAGE = "manoz3896/jenkins-project:${BUILD_NUMBER}"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        SONARQUBE_SCANNER = tool 'SonarQube-Scanner'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('sonarqube-token')
        ACR_NAME = 'jenkinsproj'
        ACR_LOGIN_SERVER = 'jenkinsproj.azurecr.io'
        AKS_RESOURCE_GROUP = 'deakinuni'
        AKS_CLUSTER_NAME = 'jenkinsproj'
        AZURE_CLIENT_SECRET = 'YLG8Q~Y~LUVmA-uStvPr.aQrGB-DmyylacOFpao8'
        AZURE_CLIENT_ID = 'bc2645bd-f803-48cd-8cd2-8ffbb67ff391'

    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MAXBASH/Jenkins-project.git'
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

        stage('Login to Azure') {
            steps {
                script {
                    sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant 2625129d-99a2-4df5-988e-5c5d07e7d0fb
                    az account set --subscription c5271556-05d6-4365-8efa-9142945f2e32
                    '''
                }
            }
        }

        stage('Push to Azure Container Registry') {
            steps {
                script {
                    sh '''
                    docker tag $DOCKER_IMAGE $ACR_LOGIN_SERVER/$DOCKER_IMAGE
                    docker login $ACR_LOGIN_SERVER -u $(az acr credential show --name $ACR_NAME --query "username" -o tsv) -p $(az acr credential show --name $ACR_NAME --query "passwords[0].value" -o tsv)
                    docker push $ACR_LOGIN_SERVER/$DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Azure Kubernetes Service (AKS)') {
            steps {
                script {
                    sh '''
                    az aks get-credentials --resource-group $AKS_RESOURCE_GROUP --name $AKS_CLUSTER_NAME
                    kubectl apply -f deployment.yml
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}