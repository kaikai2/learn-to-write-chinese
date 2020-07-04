
const chars = ("亮 星 我 明 树 叶 日 孩 红 "
    + "是 唱 子 友 习 戏 字 气 会 "
    + "见 早 鸡 黄 鸟 季 落 真 说 "
    + "跳 着 妹 东 就 还 快 得 西"
    + "东 捉 足 迷 球 很 爬 藏 向"
    + "对 叫 变 问 成 教 回 打 请"
    + "过 虫 把 驮 鹅 河 礼 背 拿"
    + "里 后 谢 边 貌 班 幼 园 照 "
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
    + "已 叠 包 碗 写 冒 您 了 碱"
    + "过桥沙报台视步课体色惊对排岸江房青伞静夜举" /*2020.7.4 review*/
    + "见都捉迷很藏变急教只泳拿幼文"
    + "尾玉进告关桃荷菊吹浇燕睡醒蛙"
    + "椅桌赶救假逃伸夹棍丢熟咚抬"
    + "知道午这什害付顶角扑分昨拇指"
    + "加求咬力贴亲接慢每因像金扇满"
    + "熊直该停撞颈").split(/ */);


/* two chars per day*/
const charsNew = (  
      "头低故乡弯像野晨常短扁杏苹群堆商场巾作业菜"
    + "豆心越风鲜尘灭男休手众城安广升旗彩飘空答搭"
    + "间这些都吗深景次再仔细兴现生许格艳言语参让"
    + "起玩烧化砍造舍结直束万复苏歌舞泉丁百齐争鸣"
    + "雷澡软梳梢耍线论趣底颜淋洒滴油欢邓植岁龄息"
    + "站扶栽古诗首眠处闻村居醉烟童散评访挤邮局轿"
    + "钱懂父母改愿筷扫夸妙却精赛完换员蹈胖喜墙替"
    + "拖鞋情棉晒收脱躺合摆帘女另顾太累医悄户票元"
    + "旦值篇遍雾霜霞夕蝶蜂碧紫千李杨秀蛋取捧连仿"
    + "佛投聪活泼眨如主意先积鼻袋推辆久净失级观围"
    + "专队双各代舌页弓秒炒蜻蜓展蝴蚯蚓蚂蚁运蝌蚪"
    + "蜘蛛牧捕蝉闭立池惜晴柔露珠摇晶坪翅膀蹲嘻莲"
    + "哭睁趴腰非感激急坡割闷潮湿消搬阵哗壁借蚊蛇"
    + "姐新擦抄拾拦团量相遇及攻互尊重令纯挂街伙伴"
    + "尝温冻乌鸦喝渴瓶石渐司缸慌块使劲砸称官柱议"
    + "杆秤艘沉止微矮瘦暗丑闲旧海鸥滩军舰帆秧稻塘"
    + "溪铜号领挖井席导革战士解刻王助哨敌荡顺突枪"
    + "杀英雄冲部宽虾脚捡贝壳奔密匹市楼希祖国由丰"
    + "理敬度甲申句兄虚骄傲淡诚赢赞招翻施肥挑担滚"
    + "苦懒洋吞将靠餐矿糟糕概保管盆位选并宣芽规盛"
    + "丝表煮饼饮饺初眉辨斗即雁归转寒姑娘蚜盼治斑"
    + "俩摘且踢引兰梁程波架特砖划薄巧稳郊列弄查速"
    + "断提修建世界创迎阿姨追披鼓甘埋闯掰跌宜层尽"
    + "染翠爽壮谷登华图梨笼浪粱燃勤区尤仙盘峰胳膊"
    + "巨脖著形状旅蒲降纷苍洼啪炸蹦察识刘残君橙橘"
    + "径斜枫交支龙凡利棋弹钢琴喂鸽养航模株踮院除"
    + "疲倦牵困委补室宁愣切集掌零哈欠叹决悔计览馆"
    + "紧怦握容普奋灿烂柏纪纺织优胜湾粒神州川涌岛"
    + "隔峡与陆族庆献帜洁奏曲亿央瓦庄严阔碑周似拼"
    + "案坛迹厦讯传约聚挥锣击拥泪泽克扬省店橱讲铺"
    + "毯银退危险买卖反杂简单寸益彰豹障泰徒功渠沿"
    + "际葫芦藤哇盯邻枣浅秃忍呗虽乘思抽续吸极夫驶"
    + "示筝踪伤责酸葡萄迫待硬茶泡饱袍鞭炮移谋柴焰"
    + "易折搓绳斤独刺猬板凳糙但傍瞧留术铅惹吐注削"
    + "皱扎抓莓幸福吵之轮第任惯式眯郑铁钉裙裤袄疼"
    + "疯恨漠炭贫富饥索奉永亚始猜拴逗良缩遥寻泣健"
    + "康操则纱羡慕粉料套份贵寄费客何赠汪舟欲踏潭"
    + "历贡肯确愁护牢孔雀锦鹰丛鹂灵嬉叽喳蓬跃棱巢"
    + "崭牌侧卷欣赏龟镜映幻演蕉扔跨甚至蒸继乎叨蒙"
    + "喃味浓腾猎黎射卫填嫦娥宇宙载箭浮雹暴躁灌溉"
    + "器淹稼毁灾哩纹返舒必须绑通杯塑咳嗽喷设浴博"
    + "珍孙悉绝史核缺乏技袁隆介绍培育棚控制泥茁羞"
    + "遮掩探嫩符触鹊枯荣宿徐篱疏未笋唤揉漆轰扭钻"
    + "唠辫抚滋润冈豪玫瑰骨终瘸拐惋莺材牺牲渡烈达"
    + "哦股罐塔杜鹃脆锋叔曾泞迈荆棘瓣莹觅需弱末萨"
    + "托铃簇随芬芳聊倾递娇掀卡罗尔适余垫洛喵绒屉"
    + "免糊涂厨蹭义占勾库粮唐荒爪环绕茂隐筑晰朦胧"
    + "境沟疆鲁番蜜梯维吾碉堡凤凰恩敲襟褂咖啡踩端"
    + "蘸寿幕临烁辉煌夺幢伟犹焕府绚繁扮宫窄穷贱恶"
    + "善强败内减朗志漫鳞伊琳娜哎哄骗齿枚裁伦敦酒"
    + "便撕研究政仍宋涛陈丹赵艺显充膝联旋暑泳囊剪"
    + "膜胎差粘嘿棒肤胆姓厕毕斧驾警庐瀑炉疑鹭含岭"
    + "泊吴压乱垂虹质勘岩册厚印痕刨煤宝针忠盏稠财"
    + "栏喉咙拌搅榜馒租价购墨抹蔼批翘驱蝇惭愧拱滑"
    + "玻璃碎攒封歉箱顿既嗓拎晃甸柜芒售货药品兵咱"
    + "抢裕茄炖烤扒扛拣跺玲详幅奖催叭脏筋莫斯附派"
    + "谈讶寓焦喘截守窜桩此锄烘卧剩裂欺负讨厌孤笆"
    + "讥苇僵亏灶铝锅漏勺铲壶汤碟撒仰傻距组楚衡汉"
    + "迪检性阑炎溜斥屈堂恍悟恐类庞避耐萎亡哺乳偷"
    + "孵谜或者籍德段屏喽型污销预订系愉榆描瞄址趾"
    + "帐账篷坝傣昌昂跤拢陡链颤攀鲫朱乔亭禁乙某章"
    + "寺录桦胸脯婉渣摄基媚鞠躬胶秘社坑考秦域遗震"
    + "促忆异逢佳倍插依歇丧磨坊钥匙趁柿菠喇衔裳怒"
    + "暮燥雅昆播吻致试验证阻测括误途陌超阅固调皇"
    + "俄拜肩臂膛腹肠胃脊兼仆纳丘毫授佩猛缓丈逐肢"
    + "肌辽血液宗县济匠砌横坚雕抵智慧搞稿编妨防叮"
    + "剧据磅亦妆饶屿崖威武卵渔栖粪辈融汇涨葱挡浸"
    + "缕剑刮舔矛盾持般蜗坦匣锯阶陶懦辩恼耻逝殿掘"
    + "朴素谎笛港愤袜捆妇麻症疾姿势况镇绪述励锤堵"
    + "获予圣诞享默糖逛援仁偿俊俏拂增掠偶沾漾谱咏"
    + "绦泗滨挨胀翩秆绣赤褐衬衫泛锐饲翁峭欧洲瑞启"
    + "殊骤跋涉濒覆厢郁澈湛犁裸扩栋咆哮浊廉贪罪偏"
    + "罚劣窟窿叼劝缠魏弦悲惨愈嘱审肃晌悦诲忧哀慰"
    + "梭狂若俱拄伍洪纠嫉妒肘骂哼侍承缘谅瞟御戒尚"
    + "迅蕴霎寂恰犯稚拙烦输睫否恒拭捂拳竭竟匆绊瞬"
    + "凑咽唾沫槐梧桐榴桂桑棕橡氏兽存殖蔬较疗悬遐"
    + "奥努菌藻项估络庭敞恋蒜椒姜盐咸醋辣酱彤陪摊"
    + "奈凝竖尼构栩释掏豫恳憾宾标企置配贷款岔郎廊"
    + "厅虏俘届乞霄烛晓娶逼旱绸吊跪淌塌挣熄冶炼罩"
    + "屹鼎沸贯崩恢穆玛涓滔脉卉罕茫桨律榕隙耀暇抛"
    + "檀盈凶庙惚腊浑豚均匀茎柄蛟宅蔽弃慎择穴搜谧"
    + "振枉浩资召源溢允喧添训酷颊拆彼锹杈诧麦务伐"
    + "拽茸副魔杖厉吭吠苟倘脾供腔掂涟漪虑属宰凭职"
    + "痒淘辟勃怨抗侮绩凄慈辛崇峻嘉峪瞭屯垒魄颐耸"
    + "阁航眺堤态誉瞰统率征靡魁搏鹤孟陵辞唯遣惰俗"
    + "协序绰伏凋苞袭怀旷暂躯胞遭悯咛咐啕崛帝范巡"
    + "嚷惩铿锵荐删词洽昏晖楷漱惬码驳逻辑昧寞睦析"
    + "患匪逾赖耕潜舶哲仓储烹盗综判钝凌仅绘吨敏捷"
    + "例筛辐汰肴尿"
    ).split(/ */);
var line = 0;
export var CharSheets = {
    length: 0
};
for (var i = 0; i < chars.length; i += 3) {
    line++;
    CharSheets["L" + line.toString()] = chars.slice(i, i + 3).join('')
}
line = 0;
for (var i = 0; i < charsNew.length; i += 2) {
    line++;
    CharSheets["L" + line.toString()] = charsNew.slice(i, i + 2).join('')
}
CharSheets.length = line
