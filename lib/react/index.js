import Component from './component'
const React = {
    createElement,
    Component
}
function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}


//为了能使外部通过import React, { Component } 导入
module.exports = React