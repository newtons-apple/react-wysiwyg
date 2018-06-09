import React, { Component } from 'react';
import styled from 'styled-components'
class ImgToolTip extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.onclick=this.onclick.bind(this)
        this.arrange=this.arrange.bind(this)
    }
    onclick(e){
        console.log(123123)
        e.stopPropagation();
    }
     componentDidMount(){
        this.container.addEventListener('click',this.onclick,false)
        var arrange=['left','center','right']
        console.log(this.container.children.length)
        for(let i=0; i< 3;i++){
            console.log(1)
            console.log(this.container.children[i])
            this.container.children[i].addEventListener('click',()=>{console.log(123);this.arrange(arrange[i])},false)
        }
       
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.targetImg!==this.props.targetImg){
            console.log('change height')
            console.log(nextProps.targetImg.offsetTop)
            this.container.style.top=''+(nextProps.targetImg.offsetTop-19)+'px';
            this.container.style.left=''+(nextProps.targetImg.offsetLeft+165)+'px';
        }
        return true;
    }

    arrange(a){
        console.log('123141')
        switch(a){
            case 'left': 
            console.log(this.props.targetImg)
            this.props.targetImg.style.float='left';
            this.props.targetImg.style.marginRight='15px'; break;
            case 'center': this.props.targetImg.style.float ='';
            this.props.targetImg.style.margin='auto'; break;
            case 'right':  this.props.targetImg.style.float='right';
            this.props.targetImg.style.marginLeft='15px'; break;
            default: ;
        }
    }
    render() { 
        return (
            <Container className={this.props.open?'show default':'default'} innerRef={el=>this.container=el}>
          <span >왼쪽정렬</span>
                <span >가운데정렬</span>
                <span >오른쪽정렬</span>

                
                
            </Container>)
    }
}

 
const Container = styled.div`
    border: solid 1px black;
    border-bottom: solid 2px black;
    background-color:white;
    z-index:111;
    user-select:none;
    display:none;
    position:absolute;
    span{
        cursor:pointer;
    }
&.show{
    display: block;
}
`
export default ImgToolTip;