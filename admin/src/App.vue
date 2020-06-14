<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,body {
  margin:  0;
  padding: 0;
  box-sizing: border-box;
}
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409EFF;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.uploader-img {
  /* width: 178px; */
  height: 178px;
  display: block;
}

</style>
