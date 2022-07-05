* 前端项目规范
    * 文件目录
        * components：用于存放一般组件
        * pages：用于存放路由组件
            * 路由文件的命名方式为大驼峰，路径的命名方式为小驼峰
                * 例如：Emp.vue /emp
        * assets：静态资源
    * 统一的消息提示(增删改后都要给出以下规定的提示消息)
        * 添加后给出消息提示
            * this.$message.success('添加成功');
            * this.$message.error('请求错误');
            * this.$message('取消添加');
        * 修改后给出消息提示
            * this.$message.success('修改成功');
            * this.$message.error('请求错误');
            * this.$message('取消修改');
        * 删除前给出对话框提示，删除后给出消息提示
            * ```javascript
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {//删除前给出对话框提示
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {//点击确定后执行的函数，发送请求
                this.$axios.delete("http://localhost:8080/deleteEmpByEid/" + row.eid
                  ).then(resp => {//删除后给出消息提示
                    if (resp.data.code === 200) {
                      this.$message.success('删除成功');
                      this.getEmp(this.$refs.refPag.internalCurrentPage);//删除后刷新页面
                    } else {
                    this.$message.error('请求错误');
                    }
                  })
                }).catch(() => {//点击取消后执行的函数
                  this.$message({
                    type: 'info',
                    message: '取消删除'
                });
                });

