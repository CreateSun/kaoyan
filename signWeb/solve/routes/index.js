const moment = require('moment');
const { get } = require('mongoose');
const sign = require('../models/Sign');
const { model } = require('../models/Signin');

module.exports = app => {
    const express = require('express');
    const router = express.Router;
    const Sign = require('../models/Sign');
    const Signin = require('../models/Signin');
    const Word = require('../models/Word')
    const Note = require('../models/Note')
    app.post('/sign', function(req, res) {
        const data = req.body;
        res.send(data);
    })

    app.get('/word', async (req, res) => {
        const wordLen = await Word.find();
        let index = Math.floor(Math.random()*(wordLen.length));
        res.send({
            code: 200,
            msg: "获取成功",
            data: wordLen[index]
        })
    })

    app.get('/journal', async (req, res) => {
        
        let data = await Signin.find().sort({timeStamp: -1})
        res.send({
            code: 200,
            msg: '获取成功',
            data
        })
    })

    /**
     * 获取指定日期间隔中的签到日
     */
    app.get('/calendar', async (req, res) => {
        let startTime = req.query.startTime;
        let endTime = req.query.endTime;
        const signArr = await Signin.find({ timeStamp: { $lt: endTime, $gt: startTime } }).sort({timeStamp: 1});
        let result = [];
        signArr.forEach(item => {
            result.push(item.timeStamp)
        })
        res.send({
            code: 200,
            msg: "成功",
            data: result
        })
    })

    app.get('/statistic', async (req, res) => {
        
        let result = {
            total: 0,
            continue: 0,
        }

        let continueArr = [0];
        const arr = await Signin.find().sort({timeStamp: -1});
        
        result.total = arr.length;
        function cal(v1, v2) {
            let res = v1.valueOf() - v2.valueOf();
            res > 0 ? null : res = res*(-1);
            if(res > 24*60*60*1000) {
                return false;
            }
            return true;
        }
        arr.forEach((item, index) => {
            continueArr[continueArr.length -1 ] === 0 ? continueArr[continueArr.length -1 ] += 1 : null ;
            if(arr[index+1]) cal(item.timeStamp, arr[index+1].timeStamp) ? continueArr[continueArr.length -1 ] += 1 : continueArr.push(0);
        })
        result.continue = Math.max(...continueArr);
        
        res.send({
            code: 200,
            msg: "获取成功",
            data: result
        })
    })

    /**
     * 每日打卡
     */
    app.post('/Signin', async (req, res) => {
        let data = req.body;
        let preResult = await Signin.find().sort({timeStamp: -1}).limit(1)
        let newTime = moment(data.timeStamp).format("YYYY-MM-DD");
        let result = null;
        // console.log(preResult[0].timeStamp)
        if (preResult.length>0 && moment(preResult[0].timeStamp).format("YYYY-MM-DD") === newTime) {
            result = {
                code: 500,
                msg: "今天已经签过到了",
            }
        } else {
            let res = await Signin.create(data);
            result = {
                code: 200,
                msg: "打卡成功",
                data: res
            }
        } 
        res.send(result)
    })

    /**
     * 获取打卡项
     */
    app.get('/getSign', async (req, res) => {
        // 从数据库中返回签到item列表
        const data = await Sign.find().where({
            status: true
        });
        res.send(data)
    })

    /**
     * 新增打卡项
     */
    app.post('/addSign', async (req, res) => {
        const data = req.body;
        const preData = await sign.find().where({
            title: data.title,
            status: true
        })
        let result = null;
        if (preData.length > 0) {
            result = {
                code: 500,
                msg: "打卡项已经存在"
            }
        } else {
        const model = await Sign.create(data)
            result = {
                code: 200,
                msg: "添加成功",
                data: model
            }
        }
        res.send(result)
    })

    /**
     * 删除打卡项
     */
    app.delete('/delSign/:id', async  (req, res) => {
        const sign = await Sign.findById(req.params.id);
        sign.status = false;
        await sign.save();
        res.send({
            code: 200,
            msg: '删除成功',
        })
    })

    app.use('/uploads', express.static(__dirname + '/../uploads'))

    /**
     * 上传文件接口
     */
    const multer = require('multer');
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, __dirname+'/../uploads')
        },
        filename: function (req, file, cb) {
          let singfileArray = file.originalname.split('.');
          let fileExtension = singfileArray[singfileArray.length - 1];
          cb(null, require('uid')(8) + "." + fileExtension);
        }
      })
    const upload = multer({storage: storage});
    app.post('/upload', upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://yaoyao.ren:8080/uploads/${file.filename}`
        res.send(file)
    })

    /**
     * 添加笔记 {
     *  url: 笔记所在路径
     *  notename: 笔记名称
     * }
     */
    app.post('/notes', async (req, res) => {
        req.body['timeStamp'] = new Date();
        const note = await Note.create(req.body)
        res.send({
            code: 200,
            data: note
        })
    })

    /**
     * 获取笔记列表
     */
    app.get('/notes', async (req, res) => {
        const notes = await Note.find()
        res.send({
            code: 200,
            data: notes
        })
    })

    /**
     * 获取笔记列表
     */
    app.delete('/notes/:id', async (req, res) => {
        await Note.findByIdAndDelete(req.params.id, req.body);
        res.send({
            code: 200,
            msg: '删除成功'
        })
    })
}
