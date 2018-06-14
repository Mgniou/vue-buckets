export default {
    setTemp({commit}, temp){//这里的context和我们使用的$store拥有相同的对象和方法
        commit('setTemp', temp);
        //你还可以在这里触发其他的mutations方法
    },
}