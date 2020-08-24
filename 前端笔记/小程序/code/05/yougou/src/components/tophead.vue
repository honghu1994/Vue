<template>
    <!-- 封装一个头部搜索组件 -->
    <div class="top">
        <div class="search">
            <icon type="search" size="16"></icon>
            <span>搜索</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    z-index: 9999;
    background-color: #eb4450;
    padding: 20rpx 16rpx;
    box-sizing: border-box;
    .search {
        width: 100%;
        height: 60rpx;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6rpx;
        icon {
            margin-right: 10rpx;
        }
        span {
            color: #666;
        }
    }
}
</style>
