const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // recheck: String,
    token: String,
    create_time: Date
});

const InfoListSchema = mongoose.Schema({
    goodsTitle:String,
    id:Number,
    plan:Number,
    taskName:String,
    status:String,
    statusInfo:String,
});

//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema),
    InfoList:mongoose.model('InfoList',InfoListSchema)
};

module.exports = model;
