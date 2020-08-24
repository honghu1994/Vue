

# Vue.js - day16

## 完成商品分类的分页功能

- 复制 el-pagination 到自己项目里
- 把this.data的长度作为分页的总数据条数
- 把计算起始索引、结束索引、截取数组绑定到table的代码封装成函数
- 给el-pagination 加 页码改变事件，赋值为最新页码，调用这个封装的函数
- 给el-pagination 加 页容量改变事件，赋值为改变后的页容量，再把页码改为1，调用这个封装的函数

## element-tree-grid 使用

- 原来的element-ui不支持表格显示为tree的格式

- 所以以前可以用element-tree-grid插件来做成tree

- 现在最新版不需要

- 使用步骤

  - 下包：npm install element-tree-grid --save

  - 导包和注册成全局组件

    ```js
    import ElTreeGrid from 'element-tree-grid';
    Vue.component(ElTreeGrid.name,ElTreeGrid);
    ```

  - 在html里加

  ```html
   <el-table-tree-column 
          file-icon="icon icon-file" 
          folder-icon="icon icon-folder" 
          prop="label" label="labelname" width="220"></el-table-tree-column>
      <el-table-column prop="description" label="description"   width="180"></el-table-column>
  ```

  prop：它绑定显示什么属性的数据

  label：表头的名字

  必须给`treeKey` 设置每个tree的key，一般key都用id,商品分类里的id叫 cat_id

  还要给 `parentKey` 设置父节点的key 在商品分类里叫 cat_pid

  最后要给levelKey 设置为它们自身的层级 在商品分类里叫 cat_level



## 添加商品分类界面

- 准备对话框，它们的宽度设置为80
  - label-width="80px"
- 把第二行改成 `级联选择器`



## 级联选择器用法&填充数据

```html
 <el-cascader
    v-model="value"
    :options="level2List"
    clearable
    :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id', checkStrictly:true }"
</el-cascader>
```

- v-model：专门用来取出选中的值
- options： 绑定级联选择器默认选项的
- clearable：提供清空按钮
- props：配置选项
  - expandTrigger显示子节点的方式，有click 和hover
  - label： 设置数据要显示哪个属性的文字
  - value：文字对应的值，我们一般给id
  - checkStrictly：设置是否允许单独选一级选项，默认不允许，所以要给true就允许
- 在created里面，发请求，获取2级数据，绑定到级联
- element-ui老版本里，不支持`checkStrictly`这个配置，它支持写一个独立的属性：`change-on-select`
- 老版本里选一级目录前面没有单选框
- v-model可以绑定一个数据，用来获取级联选择器的值
- 如果毛都选，是一个长度为0的数组，选1个，长度为1，选2个长度为2



## 添加商品分类

核心总结：

 	1. 分类有层级：0代表1级，1代表2级，2代表3级，其实就是跟你选择的级联得到的结果的长度有关
     - 简单就是把 长度 作为 分类的层级
	2. 要取到被选择的级联的id，作为添加的分类的父id（cat_pid）
    - 如果级联的长度为0，代表毛都没选，父id就是0
    - 如果级联的长度为1，就直接取下标0里面的值就是它的父id
    - 如果级联的长度为2，就直接取下标1里面的值就是它的父id
    - 其实就是取 数组[长度-1]的值，作为父id

3. addForm.cat_name 跟文本框双向绑定
4. 调用接口发请求，传入addForm



## 添加商品界面

![1566447109802](assets\1566447109802.png)