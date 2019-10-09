
import React , { Component } from 'react';


export default class App extends Component {
    state = {
        list : ['吃饭','睡觉'],
        inputVal : ''
    }
        ;

    handleInput = (e) => {
       let inputVal = e.target.value;
       this.setState({
            inputVal
       })
    };

    handleClick = () => {
        const {list,inputVal} = this.state;
        //要考虑去重以及 有没有内容
        if(inputVal.trim() && list.indexOf(inputVal) === -1) {
            list.push(inputVal)
        }

        this.setState({
            list,
            inputVal : ''
        })
    };

    handleDel (index) {
        //由于bind的原因,这里的this指向了组件
        let { list } = this.state;
        list.splice(index,1);
        this.setState({
            list
        })
    }

    render () {
        let list = this.state.list
        return (
            <div className="container">
                <input type="text" value={this.state.inputVal} onChange={this.handleInput}/>
                <button onClick={this.handleClick}>todos</button>
                    {list.map((v,i) => <h3 onClick={this.handleDel.bind(this,i)} key={i}> {v} </h3>)}
            </div>
        )
    }
}