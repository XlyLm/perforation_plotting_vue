export const wellTypeFormat = (row, column) => {
    switch (row.type) {
        case 10000: return "直井";
        case 20000: return "斜度井";
        default: return row.type;
    }
}
export const wellTypeFormat2 = (type) => {
    switch (type) {
        case 10000: return "直井";
        case 20000: return "斜度井";
        default: return type;
    }
}

export const paths = [
    {key: "explodeRes", name: "/爆炸载荷预测结果.csv"},
    {key: "explodePow", name: "/射孔弹爆炸载荷图（爆炸应力）.csv"},
    {key: "explodeTime", name: "/射孔弹爆炸载荷图（时间）.csv"},
    {key: "spearYTime", name: "/射孔枪y向载荷云图（时间）.csv"},
    {key: "spearYLoc", name: "/射孔枪y向载荷云图（位置）.csv"},
    {key: "spearYPow", name: "/射孔枪y向载荷云图（载荷）.csv"},
    {key: "spearZTime", name: "/射孔枪z向载荷云图（时间）.csv"},
    {key: "spearZLoc", name: "/射孔枪z向载荷云图（位置）.csv"},
    {key: "spearZPow", name: "/射孔枪z向载荷云图（载荷）.csv"},
    {key: "pipeRes", name: "/管柱校核结果.csv"},
    {key: "shiftY", name: "/位移动图数据(y轴数据).csv"},
    {key: "shiftZ", name: "/位移动图数据(z轴数据).csv"},
    {key: "shiftLoc", name: "/位移动图数据（节点与位置的对应关系）.csv"},
    {key: "shiftTime", name: "/位移动图数据（时间节点与时间关系）.csv"},
    {key: "axleShiftTime", name: "/轴向位移云图（时间）.csv"},
    {key: "axleShiftLoc", name: "/轴向位移云图（位置）.csv"},
    {key: "axleShift", name: "/轴向位移云图（轴向位移）.csv"},
    {key: "maxShiftLX", name: "/最大位移所在节点轨迹图（轨迹横坐标）.csv"},
    {key: "maxShiftLY", name: "/最大位移所在节点轨迹图（轨迹纵坐标）.csv"},
    {key: "maxShiftCX", name: "/最大位移所在节点轨迹图（圆圈横坐标）.csv"},
    {key: "maxShiftCY", name: "/最大位移所在节点轨迹图（圆圈纵坐标）.csv"},
    {key: "power", name: "/等效应力云图（等效应力）.csv"},
    {key: "powerTime", name: "/等效应力云图（时间）.csv"},
    {key: "powerLoc", name: "/等效应力云图（位置）.csv"},
    {key: "maxPowTime", name: "/最大等效应力图（位置）.csv"},
    {key: "maxPowLoc", name: "/最大等效应力图（最大等效应力）.csv"},
    {key: "pipeLen", name: "/管柱屈曲判断图（长度）.csv"},
    {key: "pipePow", name: "/管柱屈曲判断图（轴力）.csv"},
    {key: "helix", name: "/临界螺旋屈曲载荷.csv"},
    {key: "sine", name: "/临界正弦屈曲载荷.csv"}
];