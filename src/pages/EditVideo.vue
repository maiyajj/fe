<template>
  <div>
    <div style="font-weight: bold; margin-bottom: 30px;">1、选择单词释义</div>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="2">
        <div>单词</div>
      </el-col>
      <el-col :span="9">
        <el-input
            style="margin-right: 30px;"
            v-model="wordOperation.spelling"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="2">
        <div>音标</div>
      </el-col>
      <el-col :span="9">
        <el-input
            style="margin-right: 30px;"
            v-model="wordOperation.phoneticSymbol"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="2">
        <div>释义</div>
      </el-col>
      <el-col :span="9">
        <el-input
            autosize
            style="margin-right: 30px;"
            type="textarea"
            v-model="wordOperation.paraphrase"/>
      </el-col>
    </el-row>

    <div style="font-weight: bold; margin-top: 50px; margin-bottom: 30px;">2、选择视频片段</div>
    <div :key="sub.uid" style="margin-bottom: 40px;" v-for="(sub, index) in selectedVideo.data">
      <el-row align="top" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <el-checkbox :value="true" @change="handleSelectedVideo(index)"/>
        </el-col>
        <el-col :span="7">
          <video :src="sub.segments[0].video_url" controls height="180" width="320"/>
        </el-col>
        <el-col :span="6">
          <div>
            <el-input :value="sub.segments[0].subtile" autosize style="margin-bottom: 10px;" type="textarea"/>
            <el-input :value="sub.segments[0].subtile" autosize style="margin-bottom: 10px;" type="textarea"/>
            <el-input :value="'来源：' + sub.segments[0].episode_name" autosize type="textarea"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="font-weight: bold; margin-top: 50px; margin-bottom: 30px;">3、选择单词时间戳</div>
    <div :key="sub.subtile_sn" style="margin-bottom: 40px;" v-for="(sub, index) in selectedVideo.data">
      <el-row align="top" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <el-checkbox :value="true" @change="handleSelectedVideo(index)"/>
        </el-col>
        <el-col :span="7">
          <video :src="sub.segments[0].video_url" controls height="180" width="320"/>
        </el-col>
        <el-col :span="6">
          <div style="margin-top: 30px;">
            <el-row type="flex">
              <el-col :span="3">
                <el-button @click="handlePlay(index)" circle icon="el-icon-caret-right" size="mini"/>
                <audio :id="'audio' + index" :src="sub.segments[0].audio_url" @timeupdate="onTimeUpdate"/>
              </el-col>
              <el-col :span="21">
                <div style="white-space: pre-wrap">{{ sub.segments[0].subtile_sn }}</div>
                <VueSlider :dotSize="0"
                           :drag-on-click="true"
                           :duration="0"
                           :enableCross="false"
                           :height="2"
                           :tooltip="'always'"
                           ref="slider"
                           tooltipPlacement="bottom"
                           v-model="vueSlider.value[index]">
                  <template #tooltip>
                    <div style="margin-top: -17px">
                      <img alt="" src="../assets/sliderTooltip.png">
                    </div>
                  </template>
                </VueSlider>
              </el-col>
            </el-row>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
              <el-input v-model="vueSlider.value[index][0]"/>
              <div style="margin-left: 30px; margin-right: 30px;">-</div>
              <el-input v-model="vueSlider.value[index][1]"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="font-weight: bold; margin-top: 50px; margin-bottom: 30px;">4、设置视频属性</div>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>单词释义时长</div>
      </el-col>
      <el-col :span="8">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyWord"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>片尾时长</div>
      </el-col>
      <el-col :span="8">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyWord"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>视频循环次数</div>
      </el-col>
      <el-col :span="8">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyWord"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>单次循环次数</div>
      </el-col>
      <el-col :span="8">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyWord"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px; margin-top: 50px;" type="flex">
      <el-col :span="11">
        <div style="display: flex; justify-content:space-between;">
          <el-button
              @click="handleLastStep"
              round
              style="width: 150px"
              type="primary">上一步
          </el-button>
          <el-button
              @click="handlePreview"
              round
              style="width: 150px">预览
          </el-button>
          <el-button
              @click="dialogVisible = true"
              round
              style="width: 150px"
              type="primary">生成视频
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        width="30%">
      <span slot="title">
        <div style="font-weight: bold; font-size: 25px;">预览视频</div>
      </span>
      <span style="display: flex; justify-content: center;">
          <video :src="videoUrl" controls height="180" width="320"/>
      </span>
      <span slot="footer" style="display: flex; justify-content: center;">
        <el-button @click="dialogVisible = false" round type="primary">生成视频</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: "EditVideo",
  components: {VueSlider},
  props: {
    selectedVideo: {
      type: Object,
      require: true,
    },
    editVideo: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      wordOperation: {
        spelling: this.selectedVideo.data[0].word.spelling,
        phoneticSymbol: this.selectedVideo.data[0].word.phonetic_symbol,
        paraphrase: this.selectedVideo.data[0].word.paraphrase,
      },
      dialogVisible: false,
      videoUrl: 'https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/教父2-1402.mp4',
      vueSlider: {
        value: [
          [4, 30],
          [10, 30],
          [20, 30]
        ]
      },
    }
  },
  methods: {
    handleSelectedVideo(index) {
      // eslint-disable-next-line no-console
      console.log(index)
    },
    handlePreview() {
      // eslint-disable-next-line no-console
      console.log('3333')
      // eslint-disable-next-line no-console
      console.log(this.selectedVideo)
    },
    handleLastStep() {
      this.editVideo.show = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {
        });
    },
    handlePlay(index) {
      const audio = document.getElementById('audio' + index);
      audio.currentTime = 0.5;
      audio.click();
      audio.play()
    },
    onTimeUpdate(res) {
      // eslint-disable-next-line no-console
      console.log(res);
      // eslint-disable-next-line no-console
      console.log(res.target.id);
      const audio = document.getElementById(res.target.id);
      if (res.target.currentTime >= 1.5) {
        audio.pause();
      }
    },
    formatSubtitle(data, index) {
      const res = data.split('\n');
      if (res[index] === undefined) {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>