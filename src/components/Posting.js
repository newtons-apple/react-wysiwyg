import React, { Component } from 'react';
import styled from 'styled-components'

import { ContentEditable,Title, TextToolTip, Inputer,Img, ImgToolTip, VodToolTip, VodModal} from './postings'
class Posting extends Component {
    constructor(props) {
        super(props);
        this.state = { posting:"",title:'',subtitle:'',pictures:[],textToolTipOpen:false,inputerOpen:false,imgToolTipOpen:false,
                        targetImg:'', vodToolTipOpen:false,targetVod:'',modal:false}
        // this.changeText=this.changeText.bind(this)
        this.Container=React.createRef()
        this.titleToText=this.titleToText.bind(this)
        this.handlechange=this.handlechange.bind(this)

        // this.onkeyPress=this.onkeyPress.bind(this)
        this.putImg=this.putImg.bind(this)
        this.makeSetState = this.makeSetState.bind(this)
        this.hideImgToolTip= this.hideImgToolTip.bind(this)
        this.putVod=this.putVod.bind(this)
        this.hideVodToolTip=this.hideVodToolTip.bind(this)
        this.openVodInput=this.openVodInput.bind(this)
        this.modalToggle=this.modalToggle.bind(this)
        this.save=this.save.bind(this)
    }
    /**
     * 
     * 
     */
    save(){
        setTimeout(()=>{
            console.log(this.contentEditor)
            this.setState({posting:this.contentEditor.content.current.innerHTML})

        },5)
      
    }


    openVodInput(cursorPosition){
        this.modalToggle()
        this.setState({cursorPosition:cursorPosition})
    }
        /**
	 * 모달을 띄웠다 내렸다 하는 함수.
	 */
	modalToggle(){
        console.log('toggle')
		this.setState({
			modal: !this.state.modal
		  });
    }
    
    /**
     * vod tooltip을 숨기는 함수!
     */
    hideVodToolTip(){
        console.log('ad2')
        this.state.targetVod.style.border='none'
        this.setState({vodToolTipOpen:false,targetVod:'',cursorPosition:''})
        document.removeEventListener("click", this.hideVodToolTip);
        document.removeEventListener("keyup", this.hideVodToolTip);

    }
    /**
     * vod 를 추가하는 함수.
     * @param {string} link - youtube link
     */
    putVod(link){
        this.modalToggle()
        if(link===''){
            return 0;
        }

        let url=link.split('/')
        let query = url[3];
        console.log(query)
        let ytId = query.split('=')[1]
        if(ytId){
            console.log(ytId)
            const element = document.createElement('div')
            element.setAttribute('contentEditable',false)
            element.style.userSelect='none'
            element.className='vodContainer'
    
          
            const container = document.createElement('div')
            container.style.margin='auto'
           
            const vod = document.createElement('iframe')
            console.log(element)
            vod.setAttribute('src',url);
            vod.style.width='500px'
            vod.style.height='auto'
            vod.style.userSelect='none'
            vod.style.cursor='pointer';
            vod.src=`https://www.youtube.com/embed/${ytId}`;
            vod.allow='encrypted-media'
            vod.addEventListener('click',(e)=>{
                e.preventDefault()
                console.log('clicked')
                if(this.state.targetVod){
                    console.log('delete')
                    this.hideVodToolTip();
                }
                this.setState({vodToolTipOpen:true, targetVod:e.target})
                e.target.style.border='solid 2px #657acf'
                e.stopPropagation();
                e.stopImmediatePropagation();
                document.addEventListener('click',this.hideVodToolTip,false ) 
                },false)

    
            container.appendChild(vod)
            element.appendChild(container);
            this.state.cursorPosition.parentElement.insertBefore(element,this.state.cursorPosition);
            vod.click();
        }else{
            alert('input correct url')
        }
      

    }




    /**
     * setState를 불러일으키는 함수.
     * 만약 redux를 제대로 이용한다면 변경되야함.
     * @param { object } a -state.
     */
    makeSetState(a){
        this.setState(a)
    }

    hideImgToolTip(){
        console.log('ad2')
        this.state.targetImg.style.border='none'
        this.setState({imgToolTipOpen:false,targetImg:''})
        document.removeEventListener("click", this.hideImgToolTip);
        document.removeEventListener("keyup", this.hideImgToolTip);

    }
    /**
     * 이미지를 추가하는 함수.
     * @param {*} url 
     * @param {string} cursorPosition
     */
    putImg(url,cursorPosition){
        console.log(cursorPosition)
                   // 이거는 img를 추가하는 function.
                    const element = document.createElement('div')
                    element.setAttribute('contentEditable',false)
                    element.style.userSelect='none'
                    element.className='imgContainer'

                  

                    const img = document.createElement('img')
                    console.log(element)
                    img.setAttribute('src',url);
                    img.style.width='500px'
                    img.style.height='auto'
                    img.style.userSelect='none'
                    img.style.cursor='pointer';
                    img.addEventListener('click',(e)=>{
                        console.log('clicked')
                        if(this.state.targetImg){
                            console.log('delete')
                            this.hideImgToolTip();
                        }
                        this.setState({imgToolTipOpen:true, targetImg:e.target})
                        e.target.style.border='solid 2px #657acf'
                        e.stopPropagation();
                        document.addEventListener('click',this.hideImgToolTip,false ) 
                        },false)
                    element.appendChild(img);
                    cursorPosition.parentElement.insertBefore(element,cursorPosition);
                    img.click();

    }

   
    // componentDidMount(){
    //     this.setState({contents:[<ContentEditable  html={this.state.title}  className=''  name='' onChange={ this.changeText }
    //     newLine={this.newLine} ref={(el)=>this.content1=el}/>]})
        
    // }


    /**
     * 타이틀에서 엔터를 누르면 첫번쩨 컨텐츠로 넘어가게 하는 함수.
     * @param {event} e 
     */
    titleToText(e){
        if(e.charCode===13){
            e.preventDefault();
            // ref를 이용하는 방법 
            console.log( this.contentEditor.content.current.lastChild)
            this.contentEditor.content.current.focus()
            this.contentEditor.inputerOpen()
        }
    }
    // /**
    //  * newline 함수, 커서를 위,아래로 옮기는 함수사용.
    //  * @param {event} e 
    //  * @param {number} index 
    //  */
    // onkeyPress(e,index){

    //     if(e.charCode===13){ //newline 함수
    //         // this.newLine(e,index)
    //         // return 0;
            

    //     }
    //     // else if(e.keyCode===38){// move cursor up 함수
    //     //     console.log(12321)
    //     //     e.preventDefault()
    //     //     this['content'+(index-1)].setSelect()

    //     // }else if(e.keyCode===40){// move cursor down
    //     //     console.log(12321)

    //     //     e.preventDefault()
    //     // }
    // }

    
    /**
     * for change text
     * @param {event} e 
     */
    handlechange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    // /**
    //  * 컨텐츠 수정하는 함수.
    //  * @param {string} html inner value
    //  * @param {number} index number index
    //  */
    // changeText(html,index){
    //      var contents = [...this.state.contents]
    //      contents[index]={type:'text',content:html}
    //      console.log(contents)
    //      this.setState({contents:contents})
    // }
    render() { 
        return ( <Container>
            <div ref={this.Container}>
            <button onClick={this.save}>save</button>
                <Title onChange={this.handlechange} value={this.state.title} onKeyPress={this.titleToText}/>
                <div className='line'></div>
                <ContentEditable ref={el=>this.contentEditor=el} makeSetState={this.makeSetState}/>
                <TextToolTip open={this.state.textToolTipOpen}/>
                <Inputer open={this.state.inputerOpen} putImg={this.putImg} openVodInput={this.openVodInput}/>
                <ImgToolTip open={this.state.imgToolTipOpen} targetImg={this.state.targetImg}/>
                <VodToolTip open={this.state.vodToolTipOpen} targetVod={this.state.targetVod}/>
                <VodModal modal={this.state.modal} putVod={this.putVod} toggle={this.modalToggle}/>
            </div>
            <h2>{this.state.posting}</h2>
        </Container> )
    }
}
const Container = styled.div`
font-size:11pt;
img{
    display:block;
    margin:auto;
}
h1{
    font-size:40px;
    display:inline;
    font-weight:normal;
}
h2{
    font-size:30px;
    display:inline;
    font-weight:normal;
}
 
 .line{
     width:500px;
     border-bottom: solid 1px #111;
 }
`
export default Posting;