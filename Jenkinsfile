pipeline {
    agent {
        docker {
            image 'node:lts'
            args '-v /var/run/docker.sock:/var/run/docker.sock' // 挂载 Docker socket，以便在容器内使用 Docker
        }
    }

    environment {
        NODE_ENV = 'production'
        DOCKERHUB_CREDENTIALS = credentials('tf00185077') // 在 Jenkins 中配置的 Docker Hub 凭证 ID
    }

    stages {
        stage('Build') {
            steps {
                // 安装依赖
                sh 'npm install'
                // 构建 Nuxt.js 项目
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // 运行测试
                sh 'npm test'
            }
        }
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
    post {
        always {
            // 无论构建是否成功，始终清理工作区
            cleanWs()
        }
    }
}
