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
    <div :key="sub.uid" style="margin-bottom: 40px;" v-for="(sub, index) in waitEditVideo.data">
      <el-row align="top" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <el-checkbox :value="true"/>
        </el-col>
        <el-col :span="6">
          <video :src="sub.video_url" controls height="180" width="320"/>
        </el-col>
        <el-col :span="6">
          <div>
            <el-input autosize style="margin-bottom: 10px;" type="textarea" v-model="video.subtitle[index][0]"/>
            <el-input autosize style="margin-bottom: 10px;" type="textarea" v-model="video.subtitle[index][1]"/>
            <el-input autosize type="textarea" v-model="video.episode[index]"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="font-weight: bold; margin-top: 50px; margin-bottom: 30px;">3、选择单词时间戳</div>
    <div :key="sub.subtile_sn" style="margin-bottom: 40px;" v-for="(sub, index) in waitEditVideo.data">
      <el-row align="top" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <el-checkbox :value="true"/>
        </el-col>
        <el-col :span="6">
          <video
              :id="'video' + index"
              :src="sub.video_url"
              @play="handleVideoPlay(index)"
              @timeupdate="videoOnTimeUpdate"
              controls height="180"
              width="320"/>
        </el-col>
        <el-col :span="6">
          <div style="margin-top: 30px;">
            <el-row align="middle" type="flex">
              <el-col :span="3">
                <el-button @click="handleAudioPlay(index)" circle icon="el-icon-caret-right" size="mini"/>
                <audio :id="'audio' + index" :src="sub.audio_url" @timeupdate="audioOnTimeUpdate"/>
              </el-col>
              <el-col :span="21">
                <div style="white-space: pre-wrap; margin-bottom: 5px; min-height: 20px; ">
                  {{ video.subtitle[index][1] }}
                </div>
                <VueSlider
                    :dotSize="0"
                    :drag-on-click="true"
                    :duration="0"
                    :enableCross="false"
                    :height="2"
                    :max="vueSlider.valueRange[index][1]"
                    :min="vueSlider.valueRange[index][0]"
                    :tooltip="'always'"
                    @change="handleSliderChange(index)"
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
              <el-input @input="handleSliderInputChange(index)" v-model="vueSlider.valueDisplay[index][0]"/>
              <div style="margin-left: 30px; margin-right: 30px;">-</div>
              <el-input @input="handleSliderInputChange(index)" v-model="vueSlider.valueDisplay[index][1]"/>
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
      <el-col :span="5">
        <el-input
            style="margin-right: 30px;"
            v-model="wordOperation.wordDisplayDuration"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>片尾时长</div>
      </el-col>
      <el-col :span="5">
        <el-input
            style="margin-right: 30px;"
            v-model="wordOperation.endingDuration"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>视频循环次数</div>
      </el-col>
      <el-col :span="5">
        <el-input
            style="margin-right: 30px;"
            v-model="wordOperation.rerunTimes"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="3">
        <div>单次循环次数</div>
      </el-col>
      <el-col :span="5">
        <el-input
            style="margin-right: 30px;"
            v-model="wordOperation.remixTimes"/>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px; margin-top: 50px;" type="flex">
      <el-col :span="8">
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
          <video :src="video.url" controls height="180" width="320"/>
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
    waitEditVideo: {
      type: Object,
      require: true,
    },
    pageJump: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      wordOperation: {
        spelling: 'this.waitEditVideo.data[0].word.spelling',
        phoneticSymbol: 'this.waitEditVideo.data[0].word.phonetic_symbol',
        paraphrase: 'this.waitEditVideo.data[0].word.paraphrase',
        wordDisplayDuration: 'this.waitEditVideo.data.wordDisplayDuration',
        endingDuration: 'this.waitEditVideo.data.endingDuration',
        rerunTimes: 'this.waitEditVideo.data.rerunTimes',
        remixTimes: 'this.waitEditVideo.data.remixTimes',
      },
      video: {
        url: 'https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/教父2-1402.mp4',
        subtitle: [],
        episode: [],
      },
      vueSlider: {
        value: [],
        valueRange: [],
        valueDisplay: []
      },
      dialogVisible: false,
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(['created', this.waitEditVideo, this.pageJump]);
    const count = this.waitEditVideo.data.length;
    let i;
    for (i = 0; i < count; i++) {
      // 滑块相关
      let begin_at = this.waitEditVideo.data[i].begin_at;
      let end_at = this.waitEditVideo.data[i].end_at;
      let min = this.formatTimerToInt(begin_at);
      let max = this.formatTimerToInt(end_at);
      this.vueSlider.valueRange.push([min, max]);
      this.vueSlider.value.push([min, max]);
      this.vueSlider.valueDisplay.push([begin_at, end_at]);
      // 字幕相关
      let [cn, en] = this.formatSubtitle(this.waitEditVideo.data[i].subtile);
      this.video.subtitle.push([cn, en]);
      // 来源
      this.video.episode.push('来源：' + this.waitEditVideo.data[i].episode_name)
    }
  },
  methods: {
    handlePreview() {
      // eslint-disable-next-line no-console
      console.log(this.waitEditVideo.data);
    },
    handleLastStep() {
      // if (this.pageJump.beforePage === 'createVideo') {
      //   this.pageJump.toPage = 'createVideo';
      //   this.pageJump.beforePage = 'editVideo';
      // } else {
      //   this.pageJump.toPage = 'wordTheatre';
      //   this.pageJump.beforePage = 'editVideo';
      // }
      // eslint-disable-next-line no-console
      console.log('nav to')
      this.$emit('navToLastStep')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {
        });
    },
    handleSliderChange(index) {
      const [begin_at, end_at] = this.vueSlider.value[index];
      this.vueSlider.valueDisplay[index] = [this.formatTimerToStr(begin_at), this.formatTimerToStr(end_at)];
    },
    handleSliderInputChange(index) {
      const min = this.vueSlider.valueRange[index][0];
      const [begin_at, end_at] = this.vueSlider.valueDisplay[index];
      const sliderIndex = [this.formatTimerToInt(begin_at) - min, this.formatTimerToInt(end_at) - min];
      this.$refs.slider[index].setIndex(sliderIndex)
    },
    handleAudioPlay(index) {
      const audio = document.getElementById('audio' + index);
      audio.currentTime = (this.vueSlider.value[index][0] - this.vueSlider.valueRange[index][0]) / 1000;
      audio.click();
      audio.play()
    },
    audioOnTimeUpdate(res) {
      const index = res.target.id.replace(res.target.localName, '');
      const audio = document.getElementById(res.target.id);
      const end_time = (this.vueSlider.value[index][1] - this.vueSlider.valueRange[index][0]) / 1000;
      if (res.target.currentTime >= end_time) {
        audio.pause();
      }
    },
    handleVideoPlay(index) {
      const video = document.getElementById('video' + index);
      video.currentTime = (this.vueSlider.value[index][0] - this.vueSlider.valueRange[index][0]) / 1000;
    },
    videoOnTimeUpdate(res) {
      const index = res.target.id.replace(res.target.localName, '');
      const video = document.getElementById(res.target.id);
      const end_time = (this.vueSlider.value[index][1] - this.vueSlider.valueRange[index][0]) / 1000;
      if (res.target.currentTime >= end_time) {
        video.pause();
      }
    },
    formatSubtitle(data) {
      const tmp = data.split('\n');
      if (tmp.length === 1) {
        return [data, '']
      } else {
        const en = tmp.splice(tmp.length - 1, 1)[0];
        const cn = tmp.join('\n');
        return [cn, en]
      }
    },
    formatTimerToInt(str) {
      const tmp = str.split(',');
      const ms = tmp.splice(tmp.length - 1, 1)[0];
      const [h, m, s] = tmp[0].split(':');
      const date = new Date(1970, 1, 1, h, m, s, ms);
      return date.getTime();
    },
    formatTimerToStr(int) {
      const date = new Date();
      date.setTime(int);
      const _h = String(date.getHours());
      const h = (_h.length === 1) ? '0' + _h : _h;
      const _m = String(date.getMinutes());
      const m = (_m.length === 1) ? '0' + _m : _m;
      const _s = String(date.getSeconds());
      const s = (_s.length === 1) ? '0' + _s : _s;
      const ms = String(date.getMilliseconds());
      return `${h}:${m}:${s},${ms}`;
    },
  },
}
</script>

<style scoped>

</style>