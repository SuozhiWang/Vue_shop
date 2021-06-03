<!--
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-06-03 15:36:31
 * @LastEditors: wsz
 * @LastEditTime: 2021-06-03 17:04:54
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索添加区 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <!-- 搜索的文本输入框 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodslist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodslist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table区域 -->
      <el-table :data="goodsList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"> </el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px">
        </el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="80px">
        </el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="150px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      // 商品数据列表
      goodsList: [],
      // 总数据条数
      total: 0,
    }
  },
  created() {
    this.getGoodslist()
  },
  methods: {
    // 根据分页获取商品数据列表
    async getGoodslist() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品数据失败！')
      }
      // this.queryInfo
      // this.$message.success('获取商品数据成功！')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    // 当pagesize改变时触发的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodslist()
    },
    // 当当前页改变时触发的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodslist()
    },
    // 根据id删除对应的商品
    async removeById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除商品')
      }
      const { data: res } = await this.$http.delete(`goods/${id}`)
      if (res.meta.status !== 200) return this.$message.error('删除商品失败')
      return this.$message.success('已确认删除商品')
      this.getGoodsList() // 删除数据之后刷新数据列表
    },
    // 添加商品函数
    goAddpage(){
      this.$router.push('/goods/add')
    }
  },
  components: {},
}
</script>

<style lang="less" scoped>
</style>
