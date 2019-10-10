import React , { Component } from 'react'


const list = ['赵云', '关羽',  '马超', '张飞' ,'黄忠', '魏延', '姜维'];
const arr = ['吕布', '赵云', '典韦', '关羽', '马超', '张飞', '黄忠'];

export default class App extends Component {
    //声明state
    state = {
        listData : list
    };

    handleClick = () => {
        const {listData} = this.state;

        this.setState ({
            listData : listData === arr ? list : arr
        })
    }

    render () {
        let { listData } = this.state
        return (
            <div className="container">
               <h2> {listData === arr ? '三国' : '蜀国'} 名将榜</h2>
               {listData.map((v,i) => <h3 key={i}>{ v }</h3>)}
               <button className="btn" onClick={this.handleClick}>改变</button>
            </div>
        )
    }
}