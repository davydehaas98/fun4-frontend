pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 30, unit: "MINUTES")
    }
    stages {
        stage("Verify Tools") {
            steps {
                parallel (
                    java: {
                        sh "java -version"
                        sh "which java"
                    },
                    maven: {
                        sh "mvn -version"
                        sh "which mvn"
                    },
                    docker: {
                        sh "docker --version"
                        sh "which docker"
                    },
                    dockercompose: {
                        sh "docker-compose --version"
                        sh "which docker-compose"
                    }
                )
            }
        }
        stage("Build") {
            steps {
                sh "npm prune"
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Test") {
            steps {
                sh "npm test || true"
            }
        }
        stage("Deploy production") {
            when {
                branch "master"
            }
            steps {
                sh "docker-compose -f docker-compose.production.yml up -d --build --force-recreate"
            }
        }
        stage("Deploy development") {
            when {
                branch "development"
            }
            steps {
                sh "docker-compose -f docker-compose.development.yml up -d --build --force-recreate"
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
