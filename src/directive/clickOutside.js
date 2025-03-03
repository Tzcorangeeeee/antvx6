export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      // 检查点击是否发生在元素外部
      if (!(el === event.target || el.contains(event.target))) {
        // 如果是，则调用绑定的函数
        binding.value(event)
      }
    }
    // 在文档上添加点击事件监听器
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    // 移除点击事件监听器
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
