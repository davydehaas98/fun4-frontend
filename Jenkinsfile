pipeline {
  agent any
  options {
    disableConcurrentBuilds()
    timeout(time: 30, unit: 'MINUTES')
  }
  stages {
    stage('Verify Tools') {
      steps {
        parallel (
          node: {
            sh 'npm -v'
          },
          docker: {
            sh 'docker --version'
            sh 'which docker'
          }
        )
      }
    }
    stage('Build') {
      steps {
        sh 'npm prune'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker build -t fun4-frontend .'
        sh 'docker rm -f fun4-frontend || true'
        sh 'docker run -d -p 4042:4042 --restart always --name fun4-frontend fun4-frontend'
        sh 'docker image prune -f'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
