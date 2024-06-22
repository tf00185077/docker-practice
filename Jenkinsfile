pipeline {
    agent {
        docker { 
            image 'node:20.14.0-alpine3.20'
            args '-v /var/run/docker.sock:/var/run/docker.sock' // 确保挂载 Docker socket
        }
    }

    environment {
        NODE_ENV = 'production'
        DOCKERHUB_CREDENTIALS = credentials('tf00185077') // 在 Jenkins 中配置的 Docker Hub 凭证 ID
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // 构建 Docker 镜像
                    def imageName = "tf00185077/jenkins"
                    sh "docker build -t ${imageName} ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // 登录 Docker Hub
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"

                    // 推送 Docker 镜像
                    def imageName = "tf00185077/jenkins"
                    sh "docker push ${imageName}"
                }
            }
        }
    }
    
}

// docker run -u root -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  jenkins/jenkins:lts
// docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
