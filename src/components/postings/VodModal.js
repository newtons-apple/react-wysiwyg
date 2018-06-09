import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class VodModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			link:''
		};
        this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){ 
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleKeyPress(e){
		if(e.charCode===13){
			
		    this.props.putVod(this.state.link);
		
        }
    }

	render(){

	
		return (
			<Modal isOpen={this.props.modal} toggle={this.props.toggle} style={{marginTop:'100px',width:'350px'}}>
			<div style={{paddingTop:"40px",paddingLeft:"50px"}} className="d-flex flex-row">
			<h3 style={{margin:0,paddingLeft:'10px',paddingTop:'5px'}}>plz copy and paste youtube link</h3>
			</div>
			<ModalBody style={{paddingTop:"0",paddingLeft:"30px"}}>

					<input
							name="link"
							type="text"
							onChange={this.handleChange}
							value={this.state.link}
                            placeholder='Link'/>

			<a className="waves-effect waves-light btn" onClick={()=>this.props.putVod(this.state.link)}>SUBMIT</a>

			</ModalBody>			
			</Modal>


		);
	}
}

export default VodModal;