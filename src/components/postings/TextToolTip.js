import React, { Component } from 'react';
import styled from 'styled-components'
import ColorPicker from './ColorPicker'


class TextToolTip extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.bold=this.bold.bind(this)
        this.italic=this.italic.bind(this)
        this.toggle = this.toggle.bind(this);
        this.colorChange=this.colorChange.bind(this)
        this.fontsize=this.fontsize.bind(this)
        this.underline=this.underline.bind(this)
        this.strikeThrough=this.strikeThrough.bind(this)
        this.state = {
          popoverOpen: false,
          fontcolor:''
        };
    }

     //texttooltip의 position을 정하기 위한 함수들.
     //
    shouldComponentUpdate(nextProps,nextState){
    
            if(nextProps.open){
                var selection=getSelection().focusNode.parentElement
                var offsetTop2=getSelection().baseNode.parentElement.offsetTop
                var range = getSelection().getRangeAt(0).cloneRange();
                var offsetTop=selection.offsetTop
                var height =selection.offsetHeight
                var left = (range.getBoundingClientRect().left + range.getBoundingClientRect().right)/2 -40
                console.log( offsetTop, offsetTop2, height, left )
                    if(offsetTop>offsetTop2){
                        this.container.style.top=''+(offsetTop+height)+'px';
                    }else{
                        this.container.style.top=''+(offsetTop2+height)+'px';
                    }
                
                this.container.style.left= ''+(left)+'px'
            }
        
        return true;

    }

    strikeThrough(){
        document.execCommand('strikeThrough',false,'')
    }

    underline(){
        document.execCommand('underline',false,'')
    }

    /**
     * 
     * @param {number} a  select font size.
     */
    fontsize(a){
        console.log('font ',a)
        
        document.execCommand('fontSize',false,a)
    }

    /**
     * color change
     * @param {hex} color 
     */
    colorChange(color){
        console.log(color)
        document.execCommand('foreColor',false,color)
    }
   
    /**
     * reactcolor를 보여주기 위한 popup toggle
     */
    toggle(e){
       
        this.setState({
            popoverOpen: !this.state.popoverOpen
          });
          console.log(this.state.popoverOpen)
          e.stopPropagation()
    }
    /**
     * italic으로 바꿔주는 함수
     */
    italic(){
        document.execCommand('italic',false,'')
    }
    /**
     * bold해주는 함수.
     */
    bold(){
        console.log('sdfw')
        document.execCommand('bold',false,'')
    }
    /**
     * for stopPropagation을 위해
     * event bubble을 이용해야 하기 때문에 불가피하게 inner attribute onclick을 사용하지 못한다. 
     */
    componentDidMount(){
        this.container.addEventListener('click',(e)=> { console.log('sdf');console.log(e.target);this.setState({popoverOpen:false}); e.stopPropagation();},false)
        this.container.querySelector('b').addEventListener('click',this.bold,false)
        this.container.querySelector('i').addEventListener('click',this.italic,false)
        this.container.querySelector('.colorPicker').addEventListener('click',this.toggle,false)
        this.container.querySelector('.size6').addEventListener('click',()=>{this.fontsize(6)},false)
        this.container.querySelector('.size5').addEventListener('click',()=>this.fontsize(5),false)
        this.container.querySelector('.underline').addEventListener('click',this.underline,false)
        this.container.querySelector('.strikeThrough').addEventListener('click',this.strikeThrough,false)
    }
    


    // shouldComponentUpdate(nextProps,nextState){
    //     if(nextProps===this.props){
    //         console.log('같다')
    //         return 0;
    //     }else{
    //         open=nextProps.open
    //     }
    // }
    render() { 
        return ( <Container >
            <div className={this.props.open?'show default':'default'} ref={el=>this.container=el}>
                <b className='textToolTipBtns'>B</b> <i className='textToolTipBtns'>i</i>
                <span className='textToolTipBtns colorPicker'>
                    <span >C</span>
                    <div className={this.state.popoverOpen? 'popover1 popoverOpen':'popover1'} >
                    <ColorPicker select={this.colorChange} colors={['ffffff','959595','111', 'F3CE24', 'ec4c6a', '00c3b6', '5c5cb2', '2E84b6',]}/>
                    </div>
                </span>
                <font className='size6' size={6}>T</font> <font className='size5' size={5}>T</font><span className="underline">U</span>
                <span className="strikeThrough">S</span>
            </div>
             
             </Container> )
    }
}
const Container= styled.div`
.default{
    border: solid 1px black;
    border-top: solid 2px black;

    background-color:white;
    z-index:111;
    user-select:none;
    display:none;
    position:absolute;
}
.popover1{
    position:absolute;
    display:none;
    width: 300px;
    height:500px;

}
.popover1.popoverOpen{
    display: block;
}

.show{
    display:block !important;
}
h1{
    display:inline;
}
h3{
    display:inline;
}
`
 
export default TextToolTip;