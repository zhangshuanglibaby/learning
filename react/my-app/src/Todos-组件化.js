import React , { Component } from 'react'

/**
 * 分了三个组件 
 * 父组件 Input组件 List 组件
 */

export default class App extends Component {
    
    //声明state
    state = {
        list : ['上课','吃饭'],
        inputVal : ''
    };

    //获取子组件传来的值
    handleGetValue = (value) => {
        //更新到state
        this.setState ({
            inputVal : value
        })
    }

    // 增加触发
    handleAdd = () => {
        let {list ,inputVal} = this.state;
        if(inputVal && list.indexOf(inputVal) === -1) {
            list.push(inputVal)
        }
        this.setState({
            list,
            inputVal : ''
        })
    }

    //删除触发
    handleDel = (index) => {
        let {list} = this.state
        list.splice(index,1)
        this.setState({
            list
        })
    }

    render () {
        let { list, inputVal } = this.state
        return (
            <div className="container">
                <Input  value={inputVal}
                onGetValue={this.handleGetValue}
                onAdd={this.handleAdd}
                />

                <List list={list} onDel={this.handleDel} />
            </div>
        )
    }

}

class Input extends Component {

    handleChange = (e) => {
        //把值传给父组件
        this.props.onGetValue(e.target.value)
    };

    handleClick = () => {
        this.props.onAdd()
    }

    render () {
        return (
            <div>
                <input value={this.props.value} onChange={this.handleChange} type="text" />
                <button onClick={this.handleClick}>todo</button>
            </div>
        )
    }
}

class List extends Component {
    handleClick(i) {
        this.props.onDel(i)
    }

    render() {
        return (
            <div>
                {this.props.list.map((v,i) => <h4 onClick={this.handleClick.bind(this,i)} key={i}>{v}</h4>)}
            </div>
        )
    }
}