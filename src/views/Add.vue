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
        <van-cell title="分类" is-link :value="typeText" @click="chooseType()" />
        <van-field
          v-model="content"
          rows="3"
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
        <van-tag
          round
          v-for="(item,index) in tags"
          :key="'tag' + index"
          @click="removeTag(index)"
        >{{item}}</van-tag>
        <van-row>
          <van-field
            v-model="tag"
            left-icon="add-o"
            placeholder="添加新的标签"
            @keyup.enter="addTag"
            class="pl-0"
          />
        </van-row>
      </van-row>
    </van-row>
    <van-row class="p-3">
      <p class="font14">添加图片</p>
      <p class="font12 color-gray">图片只会显示在内容最下方</p>
      <van-uploader v-model="fileList" :before-read="beforeRead" multiple :max-count="5" />
    </van-row>
    <div v-show="showType">
      <van-picker
        title="选择分类"
        show-toolbar
        :columns="type"
        @change="onChange"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script>
import { addVote } from '@/api/data'
import {
  Cell,
  Field,
  CellGroup,
  Row,
  NavBar,
  Uploader,
  Toast,
  Tag,
  Button,
  Picker,
  Popup
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
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      title: '',
      fileList: [],
      content: '',
      showType: false,
      typeIndex: '',
      type: ['HTML/CSS/JS', 'Nodejs', '移动App', '桌面应用', 'React', 'Vue', 'Angular', '微信公众号', '小程序', '混合App', 'UI框架', 'Typscript', '网络安全', '工程化', '数据库', 'WebSocket', '算法与数据结构', 'Docker容器技术', '其他'],
      tags: [],
      tag: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 返回 Promise
    beforeRead (file) {
      return new Promise((resolve, reject) => {
        if (file instanceof Array) {
          let result = true
          file.forEach((item) => {
            if (['image/jpeg', 'image/png'].indexOf(item.type) === -1) {
              result = false
              Toast('请上传 jpg/png 格式图片')
              reject(new Error('type error'))
            }
          })
          resolve(result)
        } else {
          if (['image/jpeg', 'image/png'].indexOf(file.type) === -1) {
            Toast('请上传 jpg/png 格式图片')
            reject(new Error('type error'))
          } else {
            resolve(true)
          }
        }
      })
    },
    add () {
      if (this.title.trim() === '') {
        Toast('标题不得为空！')
        return
      }
      if (this.content.trim() === '') {
        Toast('内容不得为空！')
        return
      }
      if (this.tags.length === 0) {
        Toast('请给内容选择标签')
        return
      }
      if (this.typeIndex === '') {
        Toast('请选择内容分类')
        return
      }
      addVote({
        title: this.title,
        content: this.content,
        type: this.type[this.typeIndex],
        tags: this.tags
      }).then((res) => {
        if (res.code === 200) {
          Toast('发表成功！')
          this.$router.push({ name: 'detail', params: { id: res.data._id } })
        }
      })
    },
    addTag () {
      if (this.tag.trim() === '') {
        Toast('标签不得为空！')
        return
      }
      if (this.tags.indexOf(this.tag) === -1) {
        this.tags.push(this.tag)
        this.tag = ''
      } else {
        Toast('已添加，请勿重复添加')
      }
    },
    removeTag (index) {
      this.tags.splice(index, 1)
    },
    onChange (picker, value, index) {
      localStorage.setItem('typeIndex', this.typeIndex)
      this.typeIndex = index
    },
    chooseType () {
      this.showType = true
    },
    onConfirm () {
      if (this.typeIndex === '') this.typeIndex = 0
      this.showType = false
    },
    onCancel () {
      const index = localStorage.getItem('typeIndex')
      this.typeIndex = index || 0
      this.showType = false
    }
  },
  computed: {
    typeText () {
      return this.typeIndex === '' ? '点击选择大类' : this.type[this.typeIndex]
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
