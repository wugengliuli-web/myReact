import React from './lib/react'
import ReactDom from './lib/react-dom'


function El() {
    return (
        <div className="bbb">
            aaa
            <span id="ppp" style={{ width: 20, height: 30, background:'#000',color: '#fff' }}>bnbb</span>
            <div>ccc</div>
        </div>
    )
}

const el = (
    <div className="aa">
        aaa
        <span>bbb</span>
    </div>
)

class Elm {
    render() {
        return (
            <div className="aa">
                aaa
                <span title="ppp">bbb</span>
                <El></El>
            </div>
        )
    }
}
ReactDom.render(<Elm title={'aaa'}></Elm>, document.querySelector('#root'))