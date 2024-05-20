<script setup>
import { ref } from 'vue'
const goods = ref({
    name: '场地名1',
    picture: '../../assets/images/1.png',
    desc: '场地描述1',
})

</script>

<template>
    <div class="detail">
        <div class="container">
            <div class="info-container">
                <div>
                    <div class="info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <img src="@/assets/images/1.png" alt="" />
                        </div>
                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name"> {{ goods.name }} </p>
                            <p class="g-desc">{{ goods.desc }} </p>
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn">
                                    立即预约
                                </el-button>
                                <el-button size="large" class="btn">
                                    收藏
                                </el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.detail {
    .info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }
}

.g-name {
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: #999 solid 1px;
}

.g-desc {
    color: #999;
    margin-top: 20px;
}

.btn {
    margin-top: 20px;

}
</style>