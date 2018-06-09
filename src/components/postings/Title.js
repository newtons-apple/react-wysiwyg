import React, { Component } from 'react';
import styled from 'styled-components'
class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleChange=this.handleChange.bind(this)
        this.onkeyPress=this.onkeyPress.bind(this)
    }
    /**
     * 제목을 state에 저장하도록 하는 함수
     * @param {event} e 
     */
    handleChange(e){
        this.props.onChange({target:{name:'title',value:e.target.value}})
    }
    /**
     * enter를 누르면 다음걸로 포커싱 하는 함수.
     */
    onkeyPress(e){
        
    }
    render() { 
        return (
        <Container>
            <textarea onKeyPress={this.props.onKeyPress} value={this.props.value} className='title' name="title" cols="30" rows="10" placeholder='제목을 입력하세요' onChange={this.handleChange}
                    autoFocus></textarea>


        </Container> )
    }
}

const Container = styled.div`
margin:0 100px;
.title{
    font-size:40px;
    border:none;
    width:500px;
    height:50px;
    resize:none;
    &:focus{
        outline:none;
    }
 }
`

export default Title;