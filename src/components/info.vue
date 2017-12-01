<template>
<div>
    <router-link to="/users/addUser">
        <el-button type="primary" plain style="margin-bottom: 20px">添加</el-button>
    </router-link>
    <el-upload
            class="upload-demo"
            ref="upload"
            name="files"
            accept="application/vnd.ms-excel,application/x-xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            action="/ajax/users/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="success"
            :file-list="fileList"
            :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
    </el-upload>

    <el-table
            :data="tableData"
            v-loading="loading"
            height="500"
            stripe
            style="width: 100%">
        <el-table-column
                prop="mnum"
                label="工号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="mname"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="mphone"
                label="联系方式">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                tableData: [],
                loading: true
            };
        },
        created(){
            var that=this;
            fetch('/ajax/member/select').then(function (e) {
                return e.json();
            }).then(function (e) {
                that.tableData=e;
                that.loading=false;
            })
        },
        methods: {
            success(response, file, fileList){
                var obj=response;
                for(var i=0;i<obj.length;i++){
                    var flag=true;
                    for(var j=0;j<this.tableData.length;j++){
                        if(obj[i].mnum==this.tableData[j].mnum){
                            flag=false;
                        }
                    }
                    if(flag){
                        this.tableData.push(obj[i])
                    }
                }
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    duration:500
                });
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleEdit(index, row) {
               this.$router.push({path:'/users/editUser',query:row})
            },
            handleDelete(index, row) {
                var that=this;
                fetch('/ajax/member/del?mid='+row.mid).then(function (e) {
                    return e.text();
                }).then(function (e) {
                    if(e=="ok"){
                        that.tableData.splice(index,1);
                        that.$message({
                            message: '删除成功',
                            type: 'success',
                            duration:1000
                        });
                    }else{
                        that.$message({
                            message: '删除失败',
                            type: 'error',
                            duration:1000
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>