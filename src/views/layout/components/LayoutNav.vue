<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
const userStore = useUserStore()
const router = useRouter()
const confirm = () => {
    userStore.removeUserInfo()
    router.push("/login")
};
const isAdmin = ref(false)
const isUser = ref(false)
isAdmin.value = userStore.userInfo.role === 0
isUser.value = userStore.userInfo.role === 1
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 管理员显示 -->
                <template v-if=isAdmin>
                    <p class="title">黑龙江工程学院昆仑旅游学院-万事屋</p>
                    <li><a href="/management"><i class=" iconfont icon-user"></i>{{ userStore.userInfo.username }}</a>
                    </li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="/management/space">场地管理</a></li>
                    <li><a href="/management/equipment">器材管理</a></li>
                    <li><a href="/management/reserve">预约管理</a></li>
                    <li><a href="/management/rental">租借管理</a></li>
                    <li><a href="/management/usermanagement">用户管理</a></li>

                </template>
                <!-- 普通用户显示 -->
                <template v-else-if=isUser>
                    <p class="title">黑龙江工程学院昆仑旅游学院-万事屋</p>
                    <li><a href="/management"><i class=" iconfont icon-user"></i>{{ userStore.userInfo.username
                            }}</a></li>
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

                <!-- 未登录状态 -->
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