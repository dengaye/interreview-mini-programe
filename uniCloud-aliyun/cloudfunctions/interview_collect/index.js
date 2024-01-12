'use strict';

const ACTIONS = {
	list: 'list',
	add: 'add',
	remove: 'remove',
}

const INTERVIEW_COLLECT_TABLE_NAME = 'interview_collect';
const FEMAP_TABLE_NAME = 'femap';

function responseData(errcode,errmsg,data={}){
	return {
		errcode: errcode,
		errmsg: errmsg,
		data: data
	}
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db  =  uniCloud.database();
	const dbCmd = db.command;

	let dbRes;

	switch (event.action) {
		case ACTIONS.list: {
			const interreviewDbRes = await db.collection(INTERVIEW_COLLECT_TABLE_NAME).limit(20).get();
			if (interreviewDbRes.data && interreviewDbRes.data.length > 0) {
				const questionIds = interreviewDbRes.data.map(item => item.question_id);
				dbRes = await db.collection(FEMAP_TABLE_NAME).where({
					_id: dbCmd.in(questionIds)
				}).field({ title: true, category: true, level: true}).get();
			} else {
				dbRes = interreviewDbRes;
			}
			return responseData(0,'', dbRes.data);
		}
		case ACTIONS.add: {
			const postData = event.body;
			const dbRes = await db.collection(INTERVIEW_COLLECT_TABLE_NAME).add({ question_id: postData.question_id });
			return responseData(0, '', dbRes.data);
		}
		case ACTIONS.remove: {
			const postData = event.body;
			const dbRes = await db.collection(INTERVIEW_COLLECT_TABLE_NAME).where({ 
				question_id: postData.question_id,
			}).remove();
			console.log('remove', dbRes)
			return responseData(0, '取消成功', [])
		}
		default: 
		 return;
	}
};
