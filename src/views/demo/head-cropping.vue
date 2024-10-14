<script setup lang="ts">
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { StyleValue } from "vue";
const downImg = ref("");
const model = ref(false);
const modelSrc = ref("");
const crap = ref(false);
const previews = ref<any>({
  w: 100,
  h: 100,
  url: "",
  div: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    height: "100%",
  },
  img: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});
// const lists = reactive([
//   {
//     img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4",
//   },
// ]);
const option = reactive({
  img: "https://avatars2.githubusercontent.com/u/15681693?s=460&v=4",
  size: 1,
  full: false,
  outputType: "png",
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 750,
  autoCropHeight: 340,
  centerBox: true,
  high: true,
  max: 99999,
});
const show = ref(true);
const fixed = ref(false);
const fixedNumber = ref([75, 34]);
const cropper = ref(null);

// function  changeImg() {
//   option.img = lists[~~(Math.random() * functionlists.length)].img;
// }
function startCrop() {
  // start
  crap.value = true;
  (cropper.value as any)?.startCrop();
}
function stopCrop() {
  //  stop
  crap.value = false;
  (cropper.value as any)?.stopCrop();
}
function clearCrop() {
  // clear
  (cropper.value as any)?.clearCrop();
}
function refreshCrop() {
  // clear
  (cropper.value as any)?.refresh();
}
function changeScale(num: number) {
  num = num || 1;
  (cropper.value as any)?.changeScale(num);
}
function rotateLeft() {
  (cropper.value as any)?.rotateLeft();
}
function rotateRight() {
  (cropper.value as any)?.rotateRight();
}
function finish(type: any) {
  // 输出
  // var test = window.open('about:blank')
  // test.document.body.innerHTML = '图片生成中..'
  if (type === "blob") {
    (cropper.value as any)?.getCropBlob((data: any) => {
      console.log(data);
      var img = window.URL.createObjectURL(data);
      model.value = true;
      modelSrc.value = img;
    });
  } else {
    (cropper.value as any)?.getCropData((data: any) => {
      console.log(data);
      model.value = true;
      modelSrc.value = data;
    });
  }
  ElMessage.success("图片数据已返回 自行发挥吧！");
}
// 实时预览函数
function realTime(data: any) {
  previews.value = data;
  console.log(data);
}

function finish2(type: any) {
  (cropper.value as any)?.getCropData((data: any) => {
    model.value = true;
    modelSrc.value = data;
  });
}
function finish3(type: any) {
  (cropper.value as any)?.getCropData((data: any) => {
    model.value = true;
    modelSrc.value = data;
  });
}
function down(type: any) {
  // event.preventDefault()
  var aLink = document.createElement("a");
  aLink.download = "demo";
  // 输出
  if (type === "blob") {
    (cropper.value as any).getCropBlob((data: any) => {
      downImg.value = window.URL.createObjectURL(data);
      aLink.href = window.URL.createObjectURL(data);
      aLink.click();
    });
  } else {
    (cropper.value as any).getCropData((data: any) => {
      downImg.value = data;
      aLink.href = data;
      aLink.click();
    });
  }
}

function uploadImg(e: any, num: number) {
  //上传图片
  // this.option.img
  var file = e.target.files[0];
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
    alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
    return false;
  }
  var reader = new FileReader();
  reader.onload = (e) => {
    let data: any;
    if (typeof e.target?.result === "object") {
      // 把Array Buffer转化为blob 如果是base64不需要
      data = window.URL.createObjectURL(
        new Blob([e.target.result as ArrayBuffer])
      );
    } else {
      data = e.target?.result;
    }
    if (num === 1) {
      option.img = data;
    }
    // else if (num === 2) {
    //   this.example2.img = data;
    // }
  };
  // 转化为base64
  // reader.readAsDataURL(file)
  // 转化为blob
  reader.readAsArrayBuffer(file);
}
function imgLoad(msg: any) {
  console.log(msg);
}
function cropMoving(data: any) {
  console.log(data, "截图框当前坐标");
}
</script>

<template>
  <div>
    <div class="cut">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :fixed="fixed"
        :fixed-number="fixedNumber"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"
        :high="option.high"
        mode="contain"
        :max-img-size="option.max"
        @real-time="realTime"
        @img-load="imgLoad"
        @crop-moving="cropMoving"
      />
    </div>
    <div
      class="show-preview"
      :style="{
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '5px',
      }"
    >
      <!--      关闭 eslint style校验-->
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img" />
      </div>
    </div>
    <div class="test-button">
      <label class="btn" for="uploads">upload</label>
      <input
        id="uploads"
        type="file"
        style="position: absolute; clip: rect(0 0 0 0)"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
      <el-button v-if="!crap" class="btn ml-10px" @click="startCrop">
        start
      </el-button>
      <el-button v-else class="btn" @click="stopCrop">stop</el-button>
      <el-button class="btn" @click="clearCrop">clear</el-button>
      <el-button class="btn" @click="refreshCrop">refresh</el-button>
      <el-button class="btn" @click="changeScale(1)">+</el-button>
      <el-button class="btn" @click="changeScale(-1)">-</el-button>
      <el-button class="btn" @click="rotateLeft">rotateLeft</el-button>
      <el-button class="btn" @click="rotateRight">rotateRight</el-button>
      <el-button class="btn" @click="finish('base64')">
        preview(base64)
      </el-button>
      <el-button class="btn" @click="finish('blob')">preview(blob)</el-button>
      <el-button class="btn" @click="down('base64')">
        download(base64)
      </el-button>
      <el-button class="btn" @click="down('blob')">download(blob)</el-button>
      <el-button class="btn" @click="() => (option.img = '')">
        清除图片
      </el-button>
      <div style="display: block; width: 100%">
        <label class="c-item">
          <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
          <input v-model="option.original" type="checkbox" />
          <span>original: {{ option.original }}</span>
        </label>
        <label class="c-item">
          <span>能否拖动图片</span>
          <input v-model="option.canMove" type="checkbox" />
        </label>
        <label class="c-item">
          <span>能否拖动截图框</span>
          <input v-model="option.canMoveBox" type="checkbox" />
          <span>canMoveBox: {{ option.canMoveBox }}</span>
        </label>
        <label class="c-item">
          <span>截图框固定大小</span>
          <input v-model="option.fixedBox" type="checkbox" />
          <span>fixedBox: {{ option.fixedBox }}</span>
        </label>
        <label class="c-item">
          <span>是否输出原图比例的截图</span>
          <input v-model="option.full" type="checkbox" />
          <span>full: {{ option.full }}</span>
        </label>
        <label class="c-item">
          <span>是否自动生成截图框</span>
          <input v-model="option.autoCrop" type="checkbox" />
          <span>autoCrop: {{ option.autoCrop }}</span>
        </label>
        <label class="c-item">
          <span>是否根据dpr生成适合屏幕的高清图片</span>
          <input v-model="option.high" type="checkbox" />
          <span>high: {{ option.high }}</span>
        </label>
        <label class="c-item">
          <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
          <input v-model="option.centerBox" type="checkbox" />
          <span>centerBox: {{ option.centerBox }}</span>
        </label>
        <label class="c-item">
          <p>输出图片格式</p>
          <label>
            jpg
            <input
              v-model="option.outputType"
              type="radio"
              name="type"
              value="jpeg"
            />
          </label>
          <label>
            png
            <input
              v-model="option.outputType"
              type="radio"
              name="type"
              value="png"
            />
          </label>
          <label>
            webp
            <input
              v-model="option.outputType"
              type="radio"
              name="type"
              value="webp"
            />
          </label>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cut {
  width: 500px;
  height: 500px;
  margin: 30px auto;
}

.c-item {
  display: block;
  max-width: 800px;
  margin: 10px auto;
  margin-top: 20px;
  user-select: none;
}

.content {
  max-width: 1200px;
  margin: auto;
  margin-bottom: 100px;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
  place-content: center center;
}

.des {
  line-height: 30px;
}

.test {
  height: 500px;
}
</style>
