import request from '@/utils/request'

export default {
  //获取筛查信息
  getSelectInfoList(page) {
    return request({
      url: `/item/all`,
      method: 'get',
      params:page,
    })
  },
  //修改筛查状态
  updateItemByStatus(updateParams){
    return request({
      url: `/item/updatestatus`,
      method: 'get',
      params:updateParams,
    })
  }
}