//Todo: redux로 state 구조 변경하기!

import React, { Component } from 'react';
import styled from 'styled-components'
class Inputer extends Component {
    constructor(props) {
        super(props);
        this.state = { pictures:[],cursorPosition:'' }
        this.imgUpload=this.imgUpload.bind(this)
        this.saveCursorPosition=this.saveCursorPosition.bind(this)
    }
    componentDidMount(){
        this.inputer.addEventListener('click',(e)=>e.stopPropagation,false)
    }

    saveCursorPosition(){
        var txt= document.getSelection()
        this.setState({cursorPosition:txt.anchorNode})
        console.log(txt.anchorNode)
    }

    /**
     * img를 업로드 하는 함수
     * @param {event object} e 
     * by. g1
     */
    imgUpload(e){
        var imgfile = e.target.files[0]
        if(!imgfile){
            return 0
        }
        this.setState({pictures:[...this.state.pictures,imgfile]})
        var reader = new FileReader();
        //img를 다 읽었을때 onload하는 함수.
        reader.onload=(ev)=>{
            this.props.putImg(ev.target.result,this.state.cursorPosition)
        }
        reader.readAsDataURL(imgfile)
        e.target.value=null;
    }
    render() { 
        return ( 
        <Container>
            <div className={this.props.open?'show default':'default'} ref={el=>this.inputer=el}>
                <label onMouseDown={this.saveCursorPosition}>
                    사진
                <input type="file" style={{display: 'none'}} accept="image/*" onChange={this.imgUpload}/>
                </label>
                <div>
                    <span onClick={()=>this.props.openVodInput(this.state.cursorPosition)} onMouseDown={this.saveCursorPosition}>Vod</span>
                </div>
            </div>
        </Container> )
    }
}
const Container = styled.div`
position:fixed;
top: 300px;
.default{
    display:none;
}
.show{
    display:block;
}
`
 
export default Inputer;