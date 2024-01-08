import { getDay, getYestday } from './getTime';


const DETAIL_KEY_PREFIX = `_detail_`;

const TAG_LIST_KEY_PREFIX = '_tagList_';

const RANDOM_LIST_KEY_PREFIX = '_randomList_';

const TAG_INFO_KEY_PREFIX = '_tagInfo_';

/**
 * 设置 detail 的存储
 * @param {object} item 题目条类
 */
export const setDetailStorageSync = (item) => {
  if (item?._id) {
    uni.setStorageSync(`${DETAIL_KEY_PREFIX}${item._id}`, item);
  }
}

export const getDetailStorageSync = (itemId) => {
  uni.getStorageSync(`${DETAIL_KEY_PREFIX}${itemId}`);
}

/**
 * 存储 tagList 
 * 以今天的日期为 key，存储 tagList 的数据，比如 _tagList_20230102
 * @param {array[object]} data 
 */
export const setTagListStorageSync = (data) => {
  if (data) {
    const date = getDay();
    uni.setStorageSync(`${TAG_LIST_KEY_PREFIX}${date}`, data);
  }
}

export const getTagListStorageSync = () => {
  const date = getDay();
  return uni.getStorageSync(`${TAG_LIST_KEY_PREFIX}${date}`);
}

/**
 * 存储 random list
 * @param {array[object]} data 
 */
export const setRandomListStorageSync = (data) => {
  if (data) {
    const date = getDay();
    uni.setStorageSync(`${RANDOM_LIST_KEY_PREFIX}${date}`, data);
  }
}

export const getRandomListStorageSync = () => {
  const date = getDay();
  return uni.getStorageSync(`${RANDOM_LIST_KEY_PREFIX}${date}`);
}

/**
 * 移除 random list，即每天三套题的数据
 */
export const removeCurrentRandomListStorageSync = () => {
  const date = getDay();
  uni.removeStorageSync(`${RANDOM_LIST_KEY_PREFIX}${date}`);
}

/**
 * 移除前一天的 list 相关数据
 */
export const removeOutdateAllListStorage = () => {
  const date = getYestday();
  uni.removeStorageSync(`${TAG_LIST_KEY_PREFIX}${date}`);
  uni.removeStorageSync(`${RANDOM_LIST_KEY_PREFIX}${date}`);
}

/**
 * 存储标签信息
 * @param {object} tagInfo {id, tagName} 
 */
export const setTagInfoStorageSync = (tagInfo) => {
  if (tagInfo?.id) {
    uni.setStorageSync(`${TAG_INFO_KEY_PREFIX}${tagInfo.id}`, tagInfo);
  }
}

/**
 * 获取 tag 信息
 * @param {number} tagId tag id
 * @returns 
 */
export const getTagInfoStorageSync = (tagId) => {
  return uni.getStorageSync(`${TAG_INFO_KEY_PREFIX}${tagId}`);
}
