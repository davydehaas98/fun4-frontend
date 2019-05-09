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
            sh 'which npm'
          },
          docker: {
            sh 'docker --version'
            sh 'which docker'
          },
          dockercompose: {
            sh 'docker-compose --version'
            sh 'which docker-compose'
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
    stage('Deploy development') {
      when {
        branch 'master'
      }
      steps {
        sh 'docker-compose -f docker-compose.development.yml up -d --build --force-recreate'
      }
    }
    // stage('Deploy') {
    //   steps {
    //     sh 'docker network create fun4 || true'
    //     sh 'docker build -t fun4-frontend .'
    //     sh 'docker rm -f fun4-frontend || true'
    //     sh 'docker run -d -p 4042:4042 --network fun4-network --restart always --name fun4-frontend fun4-frontend'
    //     sh 'docker image prune -f'
    //   }
    // }
  }
  post {
    always {
      cleanWs()
    }
  }
}
