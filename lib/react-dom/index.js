import React, { Component } from '../react'
const ReactDom = {
    render
}

/*
    渲染dom节点函数
    vnode: dom节点
    container: 容器(root)
*/
function render(vnode, container) {
    const node = _render(vnode)
    if(node) {
        container.appendChild(node)
    }
}

/*
   产生dom节点函数
    vnode: dom节点
*/
function _render(vnode) {
    //如果是undefined或者null或者为布尔值不进行操作
    if(vnode === undefined || vnode === null || typeof vnode === 'boolean') return '';
    else if(typeof vnode === 'string') {  //如果是字符串
        //创建文本节点
        const textNode = document.createTextNode(vnode)
        //将文本节点追加到容器中
        return textNode
    } else {  //如果是虚拟DOM
        //解构标签
        const { tag, attrs } = vnode
        //如果是组件
        if(typeof tag === 'function') {
            //创建组件
            const comp = createComponent(tag, attrs)
            //设置组件属性并返回节点
            comp.base = setComponentProps(comp, attrs)
            return comp.base
        } else {
            //创建dom节点
            const dom = document.createElement(tag)
            //如果attrs不为null
            if(attrs) {
                //设置属性
                for(let i in attrs) {
                    setAttribute(dom, i, attrs[i])
                }
            }
            //渲染子节点
            vnode.children.forEach(v => render(v, dom))
            return dom
        }
    }
}

/*
    产生组件函数
    comp: 组件
    props: 属性
*/
function createComponent(comp, props) {
    let insert;
    //如果是类定义的组件
    if(comp.prototype && comp.prototype.render) {
        insert = new comp(props)
    } else {  //如果是函数组件
        insert = new Component(props)
        insert.constructor = comp
        insert.render = function() {
            return this.constructor(props)
        }
    }
    return insert
}

/*
    设置组件属性
    comp：组件
    props：组件属性
*/
function setComponentProps(comp, props) {
    comp.props = props;
    //渲染组件
    return renderComponent(comp)
}

/*
    渲染组件函数
    comp: 组件
*/
function renderComponent(comp) {
    //返回一个jsx对象
    const renderer = comp.render()
    //调用渲染函数,返回节点
    return _render(renderer)
}

/*
    为dom元素添加attr
    dom: 给哪个dom添加属性
    key：键
    val：值
*/
function setAttribute(dom, key, val) {
    //如果为className
    if(key === 'className') {
        key = 'class'
    }
    //如果是label的for
    if(key === 'htmlFor') {
        key = 'for'
    }
    //处理事件
    if(/on\w+/.test(key)) {
        //转小写
        key = key.toLowerCase()
        dom[key] = val || ''
    }
    //处理添加style样式
    else if(key === 'style') {
        //如果是字符串
        if(typeof val === 'string') {
            dom.style.cssText = val || ''
        } else if(val && typeof val === 'object') {  //如果是一个对象
            for(let i in val) {
                if(typeof val[i] === 'number') {
                    dom.style[i] = val[i] + 'px'
                } else {
                    dom.style[i] = val[i]
                }
            }
        }
    } else {
        //如果val存在则添加属性
        if(val) {
            dom.setAttribute(key, val)
        } else {
            //如果val不存在则移除属性
            dom.removeAttribute(key)
        }
    }
}

export default ReactDom