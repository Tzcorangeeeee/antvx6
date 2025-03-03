import { Graph } from '@antv/x6'
import { History } from '@antv/x6-plugin-history' // 历史记录插件
import { Export } from '@antv/x6-plugin-export' // 导出插件
import { Selection } from '@antv/x6-plugin-selection' // 选中插件
import { Clipboard } from '@antv/x6-plugin-clipboard' // 剪贴板插件
import { Keyboard } from '@antv/x6-plugin-keyboard' // 键盘插件
import { Snapline } from '@antv/x6-plugin-snapline' // 对齐线插件
import { Stencil } from '@antv/x6-plugin-stencil' // 元素模板插件
import { defineEmits } from 'vue'

// 默认图配置
export const getGraphConfig = (container) => {
  return new Graph({
    container,
    stackSize: 50,
    background: { color: '#faefef' },
    panning: { enabled: true, modifiers: 'ctrl' },
    interacting: { nodeMovable: true, magnetConnectable: true },
    highlighting: {
      magnetAvailable: {
        name: 'stroke',
        args: { padding: 4, attrs: { strokeWidth: 4 } }
      }
    },
    connecting: {
      snap: true,
      allowBlank: false,
      highlight: true,
      router: { name: 'metro' },
      connector: {
        name: 'jumpover',
        args: { type: 'gap', size: 8, radius: 12 }
      },
      connectionPoint: 'boundary'
    }
  })
}

// 初始化Stencil
export const initStencil = (graph, container) => {
  const stencil = new Stencil({
    title: '选择节点',
    target: graph,
    stencilGraphWidth: 300,
    stencilGraphHeight: 500,
    groups: [{ name: 'group1', title: '选择', collapsable: false }],
    search(cell, keyword) {
      const text = cell.attr('text/text') || ''

      return keyword ? text.toLowerCase().includes(keyword.toLowerCase()) : true
    },
    placeholder: '搜索节点',
    notFoundText: '没找到(⊙o⊙)'
  })

  container.appendChild(stencil.container)

  return stencil
}

// 节点定义
export const getNodeDefinitions = (graph) => {
  const basePorts = {
    groups: {
      group1: {
        position: 'absolute',
        markup: [{ tagName: 'circle', selector: 'circle' }],
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: '#89eceb',
            strokeWidth: 2,
            fill: '#ffffff',
            visibility: 'hidden'
          }
        }
      }
    }
  }

  return [
    createNode('rect', '矩形', { rx: 8, ry: 8 }, 120, 50),
    createNode('circle', '圆形', {}, 70, 70),
    createNode('ellipse', '椭圆', {}, 120, 50),
    createPolygonNode(),
    createNode('ellipse', '开始节点', { fill: '#cee4fd' }, 120, 50),
    createNode('ellipse', '结束节点', { fill: '#cee4fd' }, 120, 50)
  ]

  function createNode(shape, label, bodyStyle, width, height) {
    return graph.createNode({
      shape,
      width,
      height,
      label,
      attrs: {
        text: { text: label, fontSize: 14, fill: '#333' },
        body: { fill: '#fafafa', ...bodyStyle }
      },
      ports: {
        ...basePorts,
        items: generatePortsPositions(width, height)
      }
    })
  }

  function createPolygonNode() {
    return graph.createNode({
      shape: 'polygon',
      width: 120,
      height: 60,
      label: '菱形',
      attrs: {
        body: { refPoints: '0,10 10,0 20,10 10,20', fill: '#f3f3f3' },
        text: { text: '菱形', fontSize: 14, fill: '#000' }
      },
      ports: {
        ...basePorts,
        items: generatePortsPositions(120, 60)
      }
    })
  }

  function generatePortsPositions(width, height) {
    return [
      { id: 'port1', group: 'group1', args: { x: 0, y: height / 2 } },
      { id: 'port2', group: 'group1', args: { x: width, y: height / 2 } },
      { id: 'port3', group: 'group1', args: { x: width / 2, y: 0 } },
      { id: 'port4', group: 'group1', args: { x: width / 2, y: height } }
    ]
  }
}

// 注册插件
export const registerPlugins = (graph) => {
  graph.use(new History({ enabled: true }))
  graph.use(new Export({ enabled: true }))
  graph.use(new Selection({
    enabled: true,
    rubberband: true,
    showNodeSelectionBox: true
  }))
  graph.use(new Clipboard({ enabled: true }))
  graph.use(new Keyboard({ enabled: true }))
  graph.use(new Snapline({ enabled: true }))
}

// 节点事件处理
export const initNodeEvents = (graph) => {
  const togglePorts = (node, visible) => {
    graph.batchUpdate(() => {
      node.getPorts().forEach(port => {
        node.portProp(port.id, 'attrs/circle/visibility', visible ? 'visible' : 'hidden')
      })
      node.attr('body/stroke', visible ? '#fffdfd' : null, { silent: true })
    })
  }

  graph.on('node:mouseenter', ({ node }) => togglePorts(node, true))
  graph.on('node:mouseleave', ({ node }) => togglePorts(node, false))
}
