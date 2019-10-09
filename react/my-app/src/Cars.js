import React , { Component } from 'react'

class AaoDi extends Component {
    render() {
        return (
            <span>奥迪</span>
        )
    }
};

class BaoMa extends Component {
    render () {
        return (
            <span>宝马</span>
        )
    }
};

class BenChi extends Component {
    render () {
        return (
            <span>奔驰</span>
        )
    }
};

class MaShaLaDi extends Component {
    render () {
        return (
            <span>玛莎拉蒂</span>
        )
    }
}

function SiYu () {
    return (
        <span>思域</span>
    )
}

function BieKe () {
    return (
        <span>别克</span>
    )
}

//把组件都放在一个数组上
let carsList = [AaoDi,BenChi,BaoMa,BenChi,MaShaLaDi,SiYu,BieKe]

//建一个类组件
export default class App extends Component {
    state = { 
        target : null
    };

    handleClick = () => {
        let target = carsList[Math.floor(Math.random() *carsList.length )]
        this.setState({
            target
        })
    }

    render () {
        let Comp = this.state.target
        return (
            <div className="container">
                {carsList.map((V,i) => <V  key={i} />)}
                <br />
                <button className="btn" onClick={this.handleClick}>抽奖</button>
                <br />
                <h2>恭喜你抽中了 : </h2>             
                   <h3>
                        {Comp ? <Comp /> : null}
                   </h3>
               
            </div>

        )
    }
}