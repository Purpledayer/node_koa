const InfoList = require('../db.js').InfoList;

// 查询列表数据
const findAllList = (params) => {
    // 查询条件
    if(params.page == 1){
        params.page == 0;
    }
    let query = {
        $or:[
            {status:"0"},
            {searchKeyword: params.searchKeyword},
            {searchType: params.searchKeyword},
            {taskType: params.searchKeyword}
        ]
    }
    return new Promise((resolve, reject) => {
        InfoList.find(query, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
            
        }).skip(0).limit(params.pageSize);
    })
};

const FindList = async(ctx) => {
    let doc = await findAllList(ctx.request.body);
        ctx.status = 200;
        ctx.body = {
            code:0,
            data:{ list: doc },
            msg: '成功',
            serviceVersion: '',
            v: 0,
            success: true
        };
};

// 修改状态(还原 && 彻底删除)
const uploadListInfo = async (ctx) => {
    return new Promise((resolve,reject) => {
        InfoList.findOneAndUpdate({'id':'10'},{$set:{'goodsTitle':'MongoDB'}},(err,doc) => {
            if (err) {
                reject(err);
            }
            resolve();
            console.log('更新状态成功');
        })
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    });
}

// 新增接口
const Addlist = async(ctx) => {
    let listInfo;
    if(ctx.request.body.status == '0'){
        listInfo = new InfoList({
            goodsTitle:ctx.request.body.goodsTitle,
            id:ctx.request.body.id,
            plan:ctx.request.body.plan,
            taskName:ctx.request.body.taskName,
            status:0,
            statusInfo:'已删除'
        });
    }else if(ctx.request.body.status == '1'){
        listInfo = new InfoList({
            goodsTitle:ctx.request.body.goodsTitle,
            id:ctx.request.body.id,
            plan:ctx.request.body.plan,
            taskName:ctx.request.body.taskName,
            status:1,
            statusInfo:'已恢复'
        });
    }else if(ctx.request.body.status == '2'){
        listInfo = new InfoList({
            goodsTitle:ctx.request.body.goodsTitle,
            id:ctx.request.body.id,
            plan:ctx.request.body.plan,
            taskName:ctx.request.body.taskName,
            status:2,
            statusInfo:'彻底删除'
        });
    }

    await new Promise((resolve, reject) => {
        listInfo.save((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    }).catch(function(reason) {
        console.log('catch:', reason);
    });
    console.log('添加成功');
    ctx.status = 200;
    ctx.body = {
        success: true
    }
};






module.exports = {
    FindList,
    Addlist,
    uploadListInfo
};