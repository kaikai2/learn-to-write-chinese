
const chars = (/*"亮 星 我 明 树 叶 日 孩 红 "
    + "是 唱 子 友 习 戏 字 气 会 "
    + "见 早 鸡 黄 鸟 季 落 真 说 "
    + "跳 着 妹 东 就 还 快 得 西"
    + "东 捉 足 迷 球 很 爬 藏 向"
    + "对 叫 变 问 成 教 回 打 请"
    + "过 虫 把 驮 鹅 河 礼 背 拿"*/
    "里 后 谢 " +
    "边 貌 班 幼 园 照 "
    + "婆 甜 梦 老 盒 尺 刀 时 正 "
    + "文 具 笔 画 长 放 用 总 尾 "
    + "巴 玉 尖 竹 苗 听 话 猴 猩"
    + "给 进 告 电 诉 念 饭 乖 想"
    + "面 住 前 从 同 没 送 果 工"
    + "厂 产 动 关 找 按 年 节 桃"
    + "荷 菊 梅 冷 它 怕 躲 勇 敢"
    + "堆 仗 柳 农 民 伯 种 最 片"
    + "吹 浇 燕 睡 醒 蛙 呱 南 椅"
    + "坐 身 吧 桌 布 抱 摔 声 谁"
    + "呢 认 原 痛 喊 狼 啦 赶 救"
    + "假 掉 路 碰 哪 呀 两 逃 走"
    + "她 点 音 可 伸 缝 夹 根 棍"
    + "丢 灰 萝 卜 熟 拔 拉 鼠 咕"
    + "咚 倒 抬 晚 左 右 怎 么 办"
    + "知 道 午 这 座 洞 什 害 付 "
    + "顶 角 死 扑 期 带 分 清 今 "
    + "昨 光 阴 错 指 拇 食 无 名"
    + "加 共 事 帮 饿 肚 狮 觉 毛"
    + "求 等 香 肉 张 网 咬 力 啊"
    + "牙 嘴 漂 胡 虎 贴 才 数 更"
    + "朵 纸 圆 圈 亲 脸 眼 睛 接 "
    + "外 笨 以 自 己 慢 难 练 每 "
    + "颗 样 因 为 离 近 象 船 闪"
    + "金 美 丽 当 扇 满 干 朝 熊"
    + "娃 汽 车 北 京 往 呜 鹿 森"
    + "林 采 蘑 菇 篮 直 摸 苔 所"
    + "科 灯 应 该 题 停 而 窗 刚 "
    + "撞 比 记 串 被 够 命 颈 定 "
    + "吓 啄 破 湖 棵 瓜 透 腿 狐"
    + "粗 竿 狸 跟 钓 甩 钩 忘 装"
    + "饵 算 桶 坏 忙 洗 忽 然 全"
    + "条 怪 物 猪 影 信 呼 结 冰"
    + "枝 发 抖 暖 屋 法 件 于 松"
    + "帽 戴 热 候 劳 流 汗 凉 别"
    + "整 还 觉 盖 怜 窝 着 病 受"
    + "羽 望 骑 行 远 经 旁 婶 呵"
    + "稀 奇 祝 贺 哟 脑 呆 床 闹"
    + "钟 拨 准 备 其 实 轻 响 迟"
    + "已 叠 包 碗 写 冒 您 了").split(/ */);
var line = 1;
export var CharSheets = {
};
for (var i = 0; i < chars.length; i += 3) {
    CharSheets["L" + line.toString()] = chars[i] + chars[i + 1] + chars[i + 2];
    line++;
}

console.log(CharSheets);
