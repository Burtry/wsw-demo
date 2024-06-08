<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
const confirm = () => {
    router.push("/login")
};
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="true">
                    <p class="title">黑龙江工程学院昆仑旅游学院-万事屋</p>
                    <li><a href="/management/user"><i class=" iconfont icon-user"></i>Burtry</a></li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="/management/user/reservation">我的预约</a></li>
                    <li><a href="/management/user/rental">我的租借</a></li>
                    <li><a href="/management/user/favorite">我的收藏</a></li>
                </template>
                <template v-else>
                    <p class="title">黑龙江工程学院昆仑旅游学院-万事屋</p>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="scss">
.app-topnav {
    background: #333;

    .title {
        //左对齐
        flex: 1;
        font-size: 20px;
        font-weight: normal;
        color: #cdcdcd;
    }

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: #069;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>