<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="repassword">
      <el-input placeholder="确认密码" type="password" v-model="form.repassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致!"));
      }else {
          callback();
      }
    };
    return {
      form: {
        username: "13212345678",
        captcha: "000000",
        nickname: "abc",
        password: "",
        repassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 16, min: 6, message: "密码长度为6-16位", trigger: "blur" }
        ],
        repassword: [{ validator: validatepass, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSendCaptcha() {
        const phonenum = this.form.username.trim();
      if (!phonenum) {
        this.$confirm("手机号不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (phonenum.length !== 11) {
        this.$confirm("手机号格式不正确", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "error"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: phonenum }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          const { code } = res.data;
          this.$confirm(`模拟手机验证码为：${code}`, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          }).catch(err => {
              console.log(err)
          })
        }
      });
    },
    handleRegSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
        const {repassword,...props} = this.form;
        // console.log(props,'props');
        this.$store.dispatch('user/register',props)
        .then(res => {
          // 此处有bug，并没有验证注册是否成功，调用action成功时就会调用，登录页同理
            this.$message.success("注册成功，正在为您登录跳转...");
          
        })


        //   this.$axios({
        //     url: "/accounts/register",
        //     method: "POST",
        //     data:props
        //   }).then(res => {
        //     // console.log(res,'res');
        //     if (res.status === 200) {
        //         this.$store.commit('user/setUserInfo',res.data);
        //         this.$router.back();
        //     }
        //   }).catch(err => {
        //       console.log(err,'err')
        //   })
        }else{
            this.$message.warning('用户信息填写有误，请重新检查')
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}
.submit {
  width: 100%;
}
</style>
