<template>
    <footer class="app_footer">
        <!-- 其它 -->
        <div class="extra">
            <div class="container">
                <div class="copyright">
                    <p>万事屋企业文化</p>
                    <p>
                        <a href="javascript:;">不抛弃，不放弃</a>
                        <a href="javascript:;">有福独享，有难同当</a>
                        <a href="javascript:;">大难临头各自飞</a>
                        <a href="javascript:;">有钱好办事</a>
                        <a href="javascript:;">死也要拉个垫背的</a>
                        <a href="javascript:;">一入银魂深似海</a>
                        <a href="javascript:;">从此节操是路人</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang='scss'>
.app_footer {
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;


    .extra {
        background-color: #333;
    }


    .copyright {
        height: 170px;
        padding-top: 40px;
        text-align: center;
        color: #999;
        font-size: 15px;

        p {
            line-height: 1;
            margin-bottom: 20px;
        }

        a {
            color: #999;
            line-height: 1;
            padding: 0 10px;
            border-right: 1px solid #999;

            &:last-child {
                border-right: none;
            }
        }
    }
}
</style>