import React, { Component } from 'react';
import styled from 'styled-components'

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.container=React.createRef()
    }
       
     
    
    componentDidMount(){
        this.props.colors.map((value,index)=>{
            this.container.current.querySelector('.c'+this.props.colors[index] ).addEventListener('click',(e)=>{
                console.log(index);this.props.select('#'+this.props.colors[index]); e.stopPropagation();
            })
            return 0;
        })
            
        
    }
    render() { 
        var value=[]
        for(var i =0;i<this.props.colors.length;i++){
            value=[...value,
                    <span key={i}>
                        <div className='colors' >
                            <span>
                                <div style={{ boxShadow:`#${this.props.colors[i]} 0px 0px 0px 14px inset`}} className={'color c'+this.props.colors[i] } >
                                </div>
                            </span>
                        </div>
                    </span>
                ]
        }
        return ( 
        <Container>
            <div ref={this.container} id='ColorPickerContainer'>
             {value}
            
            </div>
        </Container> 
        )
    }
}
 

const Container = styled.div`

#ColorPickerContainer{
width: 252px;
display: flex;
flex-wrap: wrap;
margin-right: -14px;
margin-bottom: -14px;


.colors{
    width: 28px;
    height: 28px;
    margin-right: 14px;
    margin-bottom: 14px;
    transform: scale(1);
    transition: transform 100ms ease;
    .color{
        background: transparent;
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
        border: solid 0.5px #cacaca;
        border-radius: 50%;
        transition: box-shadow 100ms ease;
    }
 }  
}


`
 
export default ColorPicker;