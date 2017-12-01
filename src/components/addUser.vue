<template>
    <div style="width: 500px;margin: auto;margin-top: 100px">
        <el-button type="primary" plain style="margin-bottom: 20px" @click="back">返回</el-button>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="工号" prop="mnum">
                <el-input type="text" v-model="ruleForm2.mnum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="mname">
                <el-input type="text" v-model="ruleForm2.mname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="mphone">
                <el-input type="text" v-model="ruleForm2.mphone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {

            var checknum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('工号不能为空'));
                }else{
                    callback();
                }
            };
            var checkUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                }else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不能为空'));
                } else {
//                    if (this.ruleForm2.checkPass !== '') {
//                        this.$refs.ruleForm2.validateField('checkPass');
//                    }
                    callback();
                }
            };

            return {
                ruleForm2: {
                    mnum: '',
                    mname:'',
                    mphone:''
                },
                rules2: {
                    mnum: [
                        { validator: checknum, trigger: 'blur' }
                    ],
                    mname: [
                        { validator: checkUser, trigger: 'blur' }
                    ],
                    mphone: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            submitForm(formName) {
                var that=this;
                this.$refs[formName].validate((valid) => {    //获取dom对象
                    if (valid) {
                        fetch('/ajax/member/add',{
                            method:'post',
                            headers:{
                                "content-type":'application/x-www-form-urlencoded'
                            },
                            body:"mnum="+this.ruleForm2.mnum+"&mname="+this.ruleForm2.mname+"&mphone="+this.ruleForm2.mphone
                        }).then(function (e) {
                            return e.text();
                        }).then(function (e) {
                            if(e=="ok"){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    duration:1000
                                });
                            }else{
                                that.$message({
                                    message: '添加失败',
                                    type: 'error',
                                    duration:1000
                                });
                            }
                            that.ruleForm2.mnum='';
                            that.ruleForm2.mphone='';
                            that.ruleForm2.mname='';
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
</style>