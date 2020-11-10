<!--Author: CreateSun -->
<!--Date: 2020/7/21 -->
<!--顶部状态栏，轮播图-->
<template>
  <div>
    <h3>每日一词</h3>
    <a-card class="word-card" :loading="loading" :title="word.word">
      <template v-slot:extra><a-button type="link" @click="getWord">换一换</a-button></template>
      <div>
      <span>{{word.pronunciation}}</span>
        <img class="sound" @touchstart="convertSound(1)" @touchend="convertSound(-1)" @mousedown="convertSound(1)" @mouseup="convertSound(-1)" :src="sound" alt="">
        <audio ref="audio">
          <source :src="word.mp3_link" type="audio/mp3">
          Your browser does not support the audio element.
        </audio>
      </div>
      <p style="font-size: 1.2rem">{{word.translate}}</p>
    </a-card>

  </div>
</template>

<script>
    import {word} from "../api/user";

    export default {
        name: "Header",
        data: function () {
            return {
                word: {
                    "mp3_link": "*",
                    "word": "加载中...",
                    "pronunciation": "*",
                    "translate": "*"
                },
                isPlay: true,
                sound: "/svg/sound_low.svg",
                loading: true,
            }
        },
        mounted() {
            this.getWord();
            // message.warning('12')
        },
        methods: {
            convertSound(status) {
              if(status>0) {
                  this.sound = "/svg/sound.svg"
              }
              else {
                  let that = this;
                  that.$refs.audio.play();
                  this.sound = "/svg/sound_low.svg"
              }
            },
            getWord() {
                this.loading = true;
                word().then(res => {
                    if (res.code) {
                        this.loading = false;
                        this.word = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .sound {
    height: 1rem;
    width: 1rem;
  }
  .ant-card-head-title {
    font-size: 1.5rem;
  }
  .sound:hover{
    cursor: pointer;
  }
</style>
