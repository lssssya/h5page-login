/** 
 * @Date: 2022-02-17 14:18:42 
 * @Desc: 通用分页逻辑
 * @Param: getList 获取列表数据方法
 */
import { reactive } from 'vue';

export default function usePagination (getList) {
  const pageState = reactive({
    pager: {
      pageNo: 1,
      pageSize: 10
    },
    pageConfig: {
      loading: false,
      pageSizes: [10, 20, 50, 100],
      total: 0
    }
  })
  const handleSizeChange = val => {
    pageState.pager.pageNo = 1
    pageState.pager.pageSize = val
    getList()
  }
  const handleCurrentChange = val => {
    pageState.pager.pageNo = val
    getList()
  }
  return {
    pageState,
    handleCurrentChange,
    handleSizeChange
  }
}