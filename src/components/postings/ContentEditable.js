import React, { Component } from 'react';
import styled from 'styled-components'
/**
 * ex)
 * <ConentEditable 
          html={this.state.title}
          className="my-class"
          tagName="h1"
          onChange={ this.handleChange }/>
 */
class ContentEditable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.content=React.createRef()
        this.showToolTip=this.showToolTip.bind(this)
        this.hide=this.hide.bind(this)
        this.hideInputer=this.hideInputer.bind(this)
        this.save=this.save.bind(this)
        this.inputerOpen=this.inputerOpen.bind(this)
        this.onKeyUp=this.onKeyUp.bind(this)
        this.onKeyDown=this.onKeyDown.bind(this)
    }
    componentDidMount(){
       
        this.content.current.innerHTML='<div class="text"></br></div>'
    }
    hide() {
        console.log('ad')
        this.props.makeSetState({textToolTipOpen:false})
        document.removeEventListener("click", this.hide);
    }
    hideInputer(){
        console.log('ad1')
        this.props.makeSetState({inputerOpen:false})
        document.removeEventListener("click", this.hideInputer);
        document.removeEventListener("keyup", this.hideInputer);

    }
    /**
     * 어떤 툴팁을 보여줄지 정해주는 함수. target의 tagname을 기준으로
     * getSelection이 onclick때 일어나서 랜덤으로 됬다 안됬다 함. 그래서 settimeout해줌.
     * this.hide가 onclick에 등록되어 있어서.
     */
    showToolTip(){
        var txt= document.getSelection()
            if(txt.anchorNode!==null){
                setTimeout(()=>{
                   
                    console.log(txt)
                    var nodeName = txt.anchorNode.parentElement.nodeName
                    console.log(txt)
                    console.log(txt.anchorNode.parentElement.nodeName, txt.toString().length!==0)
                     if ( txt.toString().length!==0 && (nodeName==='DIV' || nodeName==='FONT' || nodeName==='B' || nodeName==='I' || nodeName==='STRIKE' || nodeName==='U' || nodeName==='SPAN') ) {
                             console.log("Selected text is " + txt);
                             this.props.makeSetState({textToolTipOpen:true})
                             document.addEventListener("click", this.hide, false);
                     }
                     //inputeropen하는 함수.
                   
                },5)
                this.inputerOpen()
                // else if (document.getSelection) {
                //     txt = document.getSelection();
                // } else if (document.selection) {
                //     txt = document.selection.createRange().text;
                // }

           
            }
            

       
    }

    /**
     * inputer를 여는 함수.
     */
    inputerOpen(){
        setTimeout(()=>{
            var txt= document.getSelection()

            console.log(txt.toString().length===0, txt.anchorNode.innerHTML)
            if(txt.toString().length===0 && txt.anchorNode.innerHTML==='<br>'){
                console.log('nothing here')
                this.props.makeSetState({inputerOpen:true})
                document.addEventListener("click", this.hideInputer, false);
                document.addEventListener("keyup", this.hideInputer, false);
            }
        },5)
        
    }

    /**
     * onkeydown일때 실행하는 함수
     */
    onKeyDown(e){
        // if(this.content.current.innerHTML===''){
        //     console.log(123)
        //     this.content.current.innerHTML='<div class="text"><br></div>'
        // }
        if(e.keyCode===8&&this.content.current.innerHTML==='<div class="text"><br></div>'){
            console.log(this.content.current.innerHTML==='<div class="text"><br></div>')
            e.preventDefault()
        }
    }
    /**
     * onkeyup일때 실행하는 함수 모음
     */
    onKeyUp(e){
        if(this.content.current.innerHTML===''){
            console.log(123)
            this.content.current.innerHTML='<div class="text"><br></div>'
        }

        if(e.keyCode===13){
            this.newLine(e)
        }
        this.inputerOpen()

    }


        /**
         * 새로운 구를 추가할때 className을 부여하는 함수.
         * @param {*} e 
         * 
         */
        newLine(e){

                console.log('hi')
                // var el = getSelection().anchorNode.parentElement 이거는 contentEditable통째로 보여줌
                var el = this.content.current.lastChild
                console.log(el)
                if(el!==null){
                    el.className='text'
                }else{

                }
            

        }

    /**글을 임시로 저장하는 함수 ---publish는 따로 있음. 
     * todo: save 버튼을 다른 곳으로 두어야 함.
    */
   save(){
    var html = this.content.current.innerHTML
    console.log(html)
    console.log(typeof html)
    this.props.makeSetState({posting:html})
}


    render() { 
        return ( <Container onClick={this.showToolTip}>
            <div ref={this.content}
            contentEditable
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            style={{
                minHeight:'300px', padding:'50px 50px'}}
            >
            
            </div>
            </Container> )
    }
}
export default ContentEditable;

const Container =styled.div`
padding: 0 50px;
.first{
    height:10px;
}
.text{
    margin-top:15px;
}
div:focus{
    outline:none;
    
}
/* div:empty::before {
    content: "제목을 입력하세요";
    font-size: 38pt;
    font-family: "Nanum Myeongjo";
    cursor: text;
    color: #111;
    opacity: 0.6;
} */
`

// var ContentEditable = React.createClass({
//     render: function(){
//         return ;
//     },
//     shouldComponentUpdate: function(nextProps){
//         return nextProps.html !== this.getDOMNode().innerHTML;
//     },
//     emitChange: function(){
//         var html = this.getDOMNode().innerHTML;
//         if (this.props.onChange && html !== this.lastHtml) {

//             this.props.onChange({
//                 target: {
//                     value: html
//                 }
//             });
//         }
//         this.lastHtml = html;
//     }
// });