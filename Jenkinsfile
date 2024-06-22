pipeline {
  
     agent {
        docker { 
            image 'chimon2000/docker-node'
        }
    }
  stages {
    stage('Clone Sources') {
      steps {
        git 'https://github.com/tf00185077/docker-practice'
      }
    }
    stage('Information') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }
    stage('Docker Image') {
      steps {
        script{
            sh 'docker -v'
            sh 'docker build -t tf00185077/jenkins .'
            sh 'docker push tf00185077/jenkins'
        }
      }
    }
  }
}

// docker run -u root -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  jenkins/jenkins:lts
// docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
