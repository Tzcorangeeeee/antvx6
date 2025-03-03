export const handleKeyDown = (e, graph, ElMessage) => {
  if (!graph?.value) return

  // 防抖处理（防止快速重复触发）
  const now = Date.now()

  if (now - (handleKeyDown.lastTrigger || 0) < 100) return
  handleKeyDown.lastTrigger = now

  // 提取公共逻辑
  const isMod = e.ctrlKey || e.metaKey
  const key = e.key.toLowerCase()

  // 创建操作映射表
  const operations = {
    // 复制操作
    copy: () => {
      const cells = graph.value.getSelectedCells()

      if (cells.length === 0) {
        ElMessage.warning('请选择要复制的元素')

        return false
      }
      graph.value.copy(cells, { deep: true, useLocalStorage: true })
      ElMessage.success(`已复制 ${cells.length} 个元素`)

      return true
    },

    // 粘贴操作
    paste: () => {
      e.preventDefault()
      if (graph.value.isClipboardEmpty()) {
        ElMessage.warning('剪贴板为空')

        return false
      }

      try {
        const cells = graph.value.paste({ offset: 32, deep: true })

        // 更安全的ID生成方式
        cells.forEach(cell => {
          if (cell.isNode()) {
            const baseId = cell.id.replace(/-copy-\d+$/, '') // 移除已有副本标记

            cell.prop('id', `${baseId}-copy-${Date.now()}`)

            // 自动递增副本标签
            const label = cell.attr('label/text') || ''

            if (!label.includes('(副本)')) {
              cell.attr('label/text')
            }
          }
        })

        graph.value.cleanSelection().select(cells)
        ElMessage.success(`已粘贴 ${cells.length} 个元素`)

        return true
      } catch (err) {
        ElMessage.error(`粘贴失败：${err.message}`)

        return false
      }
    },

    // 删除操作
    delete: () => {
      const selectedCells = graph.value.getSelectedCells()

      if (selectedCells.length === 0) {
        ElMessage.warning('请选择要删除的元素')

        return false
      }

      // 二次确认（删除3个以上元素时）
      if (selectedCells.length >= 3 && !confirm(`确定要删除 ${selectedCells.length} 个元素吗？`)) {
        return false
      }

      try {
        const connectedEdges = graph.value.getConnectedEdges(selectedCells)

        graph.value.removeCells([...selectedCells, ...connectedEdges])
        ElMessage.success(`已删除 ${selectedCells.length} 个元素`)

        return true
      } catch (err) {
        ElMessage.error(`删除失败：${err.message}`)

        return false
      }
    },

    // 撤销/重做操作
    history: (isUndo) => {
      e.preventDefault()
      try {
        isUndo ? graph.value.undo() : graph.value.redo()

        return true
      } catch (err) {
        ElMessage.warning(isUndo ? '无法继续撤回' : '无法继续重做')

        return false
      }
    },

    // 清空画布
    clear: () => {
      e.preventDefault()
      if (!confirm('确定要清空整个画布吗？')) return false
      graph.value.clearCells()
      ElMessage.success('画布已重置')

      return true
    }
  }

  // 快捷键映射表
  const keyMap = {
    // 删除相关
    'delete': operations.delete,
    // 复制粘贴
    'c': () => isMod && operations.copy(),
    'v': () => isMod && operations.paste(),

    // 历史记录
    'z': () => isMod && operations.history(true),
    'x': () => isMod && operations.history(false),

    // 清空画布
    'y': () => isMod && operations.clear()
  }

  // 执行对应操作
  const handler = keyMap[key] || (() => {})
  const result = handler()

  // 阻止默认行为（如果已处理）
  if (result) e.preventDefault()
}
