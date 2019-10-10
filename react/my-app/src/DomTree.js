import React , { Component } from 'react'

//定义一个数组
const arr = ['HTML Document',['HTML','css'],['Dom Tree(Dom 树)','CSSOM Tree(样式结构体)'],'构建渲染树','布局渲染树','绘制渲染树'];

export default class App extends Component {
    state = {
        list : ['HTML Document']
    };

    //下一步逻辑
    handleNext = () => {
        let { list } = this.state;
        let newList = []
        if(list.length < 6) {
          newList = arr.slice(0,list.length + 1)
        }

        this.setState({
            list : newList
        })
    };

    //上一步逻辑
    handlePre = () => {
        let { list } = this.state;
        let newList = [];
        if(list.length > 1) {
            newList = arr.slice(0,list.length - 1)
        }

        this.setState ({
            list : newList
        })
    }

    render () {
        let { list } = this.state
        return (
            <div className="container">
                {
                    list.map((v,i) => {
                        if(typeof v === 'string') {
                            return <div className="leval" key={i}><button className="btn">{v}</button></div>
                        }else {
                            return <div key={i} className="container">{v.map((v,i) => <button key={i} className="btn">{v}</button>)}</div>
                        }
                    })
                }

                {list.length === 1 ? null : <button className="btn2" onClick={this.handlePre}>上一步</button>}
                {list.length === 6 ? null : <button className="btn2" onClick={this.handleNext}>下一步</button>}
            </div>
        )
    }
}



