pipeline {
    agent {
        docker {
          image 'docker:dind'
          args '-v /var/run/docker.sock:/var/run/docker.sock' // 挂载 Docker socket 以访问 Docker 守护进程
        }
      }

    environment {
        NODE_ENV = 'production'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // 确保凭证 ID 正确
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // 构建 Docker 镜像
                    sh "docker build -t tf00185077/jenkins ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // 推送 Docker 镜像
                    sh "docker push tf00185077/jenkins"
                }
            }
        }
    }
    
}

// docker run -u root -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  jenkins/jenkins:lts
// docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
