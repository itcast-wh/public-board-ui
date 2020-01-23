<template>
  <div>
    <van-nav-bar
      title="新增内容"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="add"
    />
    <van-row>
      <van-cell-group>
        <van-field v-model="title" placeholder="请输入标题" label="标题" />
        <van-cell title="分类" is-link value="koa" />
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="内容"
          type="textarea"
          maxlength="800"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </van-row>
    <van-row class="van-cell van-field">
      <div class="van-cell__title van-field__label">
        <span>标签</span>
      </div>
      <van-row>
        <van-tag round>Nodejs</van-tag>
        <van-tag round>Javascript</van-tag>
        <van-tag round>Electron</van-tag>
        <van-tag round>Vue</van-tag>
        <van-tag round>React</van-tag>
        <van-tag round>Angular</van-tag>
        <van-tag round>大数据</van-tag>
        <van-tag round>Python</van-tag>
        <van-tag round>Java</van-tag>
        <van-tag round>API</van-tag>
        <van-tag round>Mock</van-tag>
        <van-tag round>Docker</van-tag>
        <van-row>
          <van-field v-model="tag" left-icon="add-o" placeholder="添加新的标签" class="pl-0" />
        </van-row>
      </van-row>
    </van-row>
    <van-row class="p-3">
      <p class="font14">添加图片</p>
      <p class="font12 color-gray">图片只会显示在内容最下方</p>
      <van-uploader v-model="fileList" :before-read="beforeRead" multiple />
    </van-row>
  </div>
</template>

<script>
import {
  Cell,
  Field,
  CellGroup,
  Row,
  NavBar,
  Uploader,
  Toast,
  Tag,
  Button
} from 'vant'
export default {
  name: 'add',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Uploader.name]: Uploader,
    [Field.name]: Field,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      title: '',
      fileList: [],
      message: '',
      type: [],
      tags: [],
      tag: ''
    }
  },
  methods: {
    // 返回 Promise
    beforeRead (file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片')
          reject(new Error('fiel type is wrong'))
        } else {
          resolve()
        }
      })
    },
    add () {
      console.log('添加新的内容')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
