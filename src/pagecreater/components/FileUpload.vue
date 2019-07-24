<template>
  <div class="fileupload">
    <el-upload
      class="avatar-uploader"
      action="http://up.qiniu.com"
      :data="otherData"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headerOptions"
      :before-upload="beforeAvatarUpload"
      :on-progress="onProgress"
    >
      <div class="imageshow">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-progress class="circle" v-else-if="progress" type="circle" :percentage="percent"></el-progress>
        <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 178px;"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    state: {
      type: String
    }
  },
  data() {
    return {
      headerOptions: {},
      progress: false,
      percent: 0
    };
  },
  computed: {
    ...mapState(["qiniutoken"]),
    otherData() {
      return {
        token: this.qiniutoken
      };
    },
    imageUrl() {
        return this.state;
    }
  },
  methods: {
    onProgress(e, f) {
      this.progress = true;
      this.percent = e.percent.toFixed(2) * 1;
    },
    handleAvatarSuccess(res, file) {
      this.progress = false;
      let imageUrl = 'http://p7.highstreet.top/' + res.key;
      this.$emit("update:state", imageUrl);
      this.$emit("change");
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const typeList = ['image/gif', "image/jpeg", "image/png"]
      const isJPG = typeList.includes(file.type);
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG、GIF 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return isJPG;
    }
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 40px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  display: block;
  width: 100%;
}
</style>
<style lang="less" scoped>
.imageshow {
  .circle {
    padding: 20px;
  }
}
</style>
