'use strict';

// 表名
const UNICLOUD_TABLE_NAMES = {
  femap: 'femap',
  interview_collect: 'interview_collect',
}

const tags = [
		{
			"id": 10,
			"tagName": "JavaScript",
			"icon":"brandicon icon-javascript"
		}, 
		{
			"id": 11,
			"tagName": "CSS",
			"icon":"brandicon icon-css3"
		}, 
		{
			"id": 12,
			"tagName": "HTML",
			"icon":"brandicon icon-html5"
		}, 
		{
			"id": 13,
			"tagName": "React.js",
			"icon":"brandicon icon-react"
		}, 
		{
			"id": 14,
			"tagName": "Vue.js",
			"icon":"brandicon icon-vue-dot-js"
		}, 
		{
			"id": 18,
			"tagName": "Node.js",
			"icon":"brandicon icon-node-dot-js"
		},
		{
			"id": 28,
			"tagName": "工程化",
			"icon":"brandicon icon-webpack"
		},
		{
			"id": 29,
			"tagName": "工具",
			"icon":"iconfont icon-wrench-fill"
		},
		{
			"id": 19,
			"tagName": "Typescript",
			"icon":"brandicon icon-typescript"
		},
		{
			"id": 20,
			"tagName": "性能优化",
			"icon":"iconfont icon-rocket"
		}, 
		{
			"id": 21,
			"tagName": "前端安全",
			"icon":"iconfont icon-alert-fill"
		},
		{
			"id": 23,
			"tagName": "小程序",
			"icon":"iconfont icon-wechat"
		},
		{
			"id": 27,
			"tagName": "设计模式",
			"icon":"brandicon icon-fortinet"
		},
		{
			"id": 30,
			"tagName": "计算机基础",
			"icon":"iconfont icon-laptop"
		},
		{
			"id": 31,
			"tagName": "leetcode",
			"icon":"brandicon icon-leetcode"
		},
		// {
		// 	"id": 26,
		// 	"tagName": "编程题",
		// 	"icon":"iconfont icon-time-circle-fill"
		// },
		// {
		// 	"id": 32,
		// 	"tagName": "选择题",
		// 	"icon":"iconfont icon-check-circle-fill"
		// },
		// {
		// 	"id": 17,
		// 	"tagName": "趣味题",
		// 	"icon":"iconfont icon-smile-fill"
		// }
];

function responseData(errcode,errmsg,data=  {}){
	return {
		errcode:errcode,
		errmsg:errmsg,
		data:data
	}
}

const ACTIONS = {
	list: 'list',
	random: 'random',
	detail: 'detail',
	tags: 'tags',
	taginfo: 'taginfo',
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	const db  =  uniCloud.database();
	const dbCmd = db.command;
	
	let dbRes;
	switch (event.action) {
		case ACTIONS.list: {
			let whereOption = {
				// category:dbCmd.neq('Choice')
			};
			if(event.last) {
				whereOption['_id'] = dbCmd.gt(event.last);
			}

			if(event.tagid) {
				whereOption['tagId'] = dbCmd.eq(parseInt(event.tagid));
			}

			dbRes = await db.collection('femap')
				.where(whereOption)
				.field({
					title:true,category:true,level:true
				})
				.limit(20)
				.get();
			
			return responseData(0,'',dbRes.data);
		}
		case ACTIONS.random: {
			dbRes = await db.collection('femap')
				.aggregate()
				.sample({
					size: 3
				})
				.end();

			return responseData(0, '', dbRes.data);
		}
		case ACTIONS.detail: {
			if(!event.id) {
				return responseData(1,'没有找到题目');
			}

			dbRes =  await db.collection('femap').where({
				_id: dbCmd.eq(event.id)
			}).field({ exerciseKey: false }).limit(1).get();

			// 查看是否有收藏
			const collectDb = await db.collection(UNICLOUD_TABLE_NAMES.interview_collect).where({
				question_id: dbCmd.eq(event.id)
			}).get();

			if (collectDb && collectDb.data && collectDb.data.length > 0) {
				dbRes.data[0].collected = true;
			}
			
			return responseData(0,'',dbRes.data[0]);
		}
		case ACTIONS.tags: {
			return responseData(0,'',tags);
		}
		case ACTIONS.taginfo: {
			let tagInfo;
			for(let i in tags){
				if(tags[i].id == event.tagid){
					tagInfo = tags[i];
					break;
				}
			}
			
			return responseData(0,'',tagInfo);
		}
		default: 
			return;
	}
};
