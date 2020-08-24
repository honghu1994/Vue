<template>
  <div>
    <!-- 头部搜索组件 -->
    <tophead />
    <!-- 内容区域 -->
    <div class="content">
      <div class="left">
        <!-- 左侧的内容 -->
        <div class="box">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div>22</div>
          <div>23</div>
          <div>24</div>
          <div>25</div>
          <div>26</div>
          <div>27</div>
          <div>28</div>
          <div>29</div>
          <div>30</div>
          <div>31</div>
          <div>32</div>
          <div>33</div>
          <div>34</div>
          <div>35</div>
          <div>36</div>
          <div>37</div>
          <div>38</div>
          <div>39</div>
          <div>40</div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div>22</div>
          <div>23</div>
          <div>24</div>
          <div>25</div>
          <div>26</div>
          <div>27</div>
          <div>28</div>
          <div>29</div>
          <div>30</div>
          <div>31</div>
          <div>32</div>
          <div>33</div>
          <div>34</div>
          <div>35</div>
          <div>36</div>
          <div>37</div>
          <div>38</div>
          <div>39</div>
          <div>40</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// 导入头部搜索组件
import tophead from '../../components/tophead.vue'

export default {
  components: {
    tophead
  }
}
</script>

<style lang="less">
.content {
  width: 100%;
  background-color: green;
  position: absolute;
  top: 100rpx;
  bottom: 0px;
  display: flex;
  .left {
    width: 198rpx;
    height: 100%;
    background-color: yellow;
    overflow: auto;
    .box {
      height: 200%;
      width: 190rpx;
      background-color: blue;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    background-color: pink;
    overflow: auto;
    .item {
      height: 200%;
      width: 90%;
      background-color: skyblue;
    }
  }
}
</style>
