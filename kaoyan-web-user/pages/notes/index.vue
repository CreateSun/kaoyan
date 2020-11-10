<!--Author: CreateSun -->
<!--Date: 2020/10/4 -->

<template>
  <a-row>
    <a-col class="header">
      <div class="inner">
        <a-button type="primary" @click="showModal">
          添加笔记
        </a-button>
        <a-button v-if="data.length>0" :ghost="url===item.url" :type="url===item.url?'primary':''" v-for="item in data" @click="url = item.url">
          {{item.notesName}}
        </a-button>
      </div>
    </a-col>
    <a-col>

      <iframe v-if="url&&data.length>0" :src="url"
              style="height: 100vh; width: 100%"
      >
      </iframe>
      <a-button v-if="url&&data.length>0" @click="delNote" type="danger">
        删除笔记
      </a-button>
      <p v-else>暂无笔记</p>
    </a-col>

    <a-modal
      :maskClosable="false"
      title="上传文件"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <a-row :gutter="5">
        <a-col>
          <a-switch v-model:checked="checked" size="small" style="margin: 1rem 0"/>
          上传文件
          <a-col>
            <a-upload
              v-if="checked"
              :action="require('../../api/user').uploadUrl"
              :multiple="false"
              :file-list="fileList"
              @change="handleChange"
            >
              <a-button> + Upload</a-button>
            </a-upload>
          </a-col>
          <a-col>
            <a-input :disabled="checked" v-model:value="fileUrl" placeholder="文件地址" class="url-input input"/>
            <a-input v-model:value="notesName" placeholder="笔记名称" class="note-name input"/>
          </a-col>
        </a-col>
      </a-row>
    </a-modal>
  </a-row>
</template>

<script>
    import {addnote, delnote, getnote} from "../../api/user";

  export default {
        name: "notes",
        data() {
            return {
                data: [],
                notesName: '',
                url: '',
                fileUrl: '',
                checked: true,
                visible: false,
                confirmLoading: false,
                fileList: [],
            }
        },
      mounted() {
        this.getNotes((data) => {
            this.url = data
        });
      },
        methods: {
            delNote() {
                let data = this.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].url === this.url) {
                        delnote(data[i]._id).then(res => {
                            if (res.code === 200) {
                                window.location.reload()
                            }
                        })
                    }
                }
            },
            getNotes(next) {
              getnote().then(res => {
                  if (res.code === 200) {
                      this.data = res.data;
                  }
                  if (next&&res.data.length>0) next(res.data[0].url);
              })
            },
            handleChange(info) {
                let fileList = [...info.fileList];

                // 1. Limit the number of uploaded files
                //    Only to show two recent uploaded files, and old ones will be replaced by the new
                fileList = fileList.slice(-1);

                // 2. read from response and show file link
                fileList = fileList.map(file => {
                    if (file.response) {
                        // Component will show file.url as link
                        file.url = file.response.url;
                    }
                    return file;
                });
                this.fileUrl = fileList[0].url;
                this.fileList = fileList;
            },
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                let that = this;
                if (this.notesName.length > 0) {
                    this.confirmLoading = true;
                    addnote({
                        url: that.fileUrl,
                        notesName: that.notesName,
                        timeStamp: new Date()
                    }).then(res => {
                        if (res.code === 200) {
                            that.$message.success({
                                content: "上传成功",
                                onClose: () => {
                                    window.location.reload()
                                }
                            });
                            that.visible = false;
                            that.confirmLoading = false;
                            that.fileList = [];
                            that.notesName = '';
                            that.fileUrl = ''
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>
  .input {
    margin: 0.5rem 0 1rem 0;
  }

  .inner {
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
    overflow: scroll;
    max-height: 3rem;
  }

  .inner button {
    margin: 0 0 0 0.5rem;
  }

  .header {
    /*height: ;*/
    margin: 1rem 0 1rem 0;
    width: 100%;
    overflow: hidden;
    height: 2.5rem;
  }

  .url-input {
    width: 100%;
  }
</style>
