import React, { Component } from 'react';
import '././ProjectConfigurationHolder.css'

class ProjectConfigurationHolder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            storedLocation: '',
        }
    }
    

    handleProjectName = (event) => {
        this.setState({
            projectName: event.target.value
        })
    }

    handleStoredLocation = (event) => {
        this.setState({
            storedLocation: event.target.value
        })
    }

    handleSubmit = event => {
        console.log(`${this.state.projectName} has logged in with connector id: ${this.state.storedLocation}`);
        event.preventDefault()
    }
    
    render() {
        const { projectName,storedLocation } = this.state
        return (
            
            <div className='config'>
                 <div className= 'topButton'>
                    <button type='Min'>_</button>
                    <button type='Max'>O</button>
                    <button type='exit'>X</button>   
                </div>
                <div className='configTitle'>
                    <label >Create New Project</label>
                </div>
               
                {/* <div className='container'> */}
                <form onSubmit={this.handleSubmit}>
                    
                    
                    <div>
                        <label className='configLabel'>Project Name</label>
                        <label className='configLabel'style={{color:'red'}}>Required</label>
                        <input className='configInput' type="text" value={projectName} onChange={this.handleProjectName} />
                    </div>
                    <div>
                        <label className='configLabel'>Stored Location</label>
                        <label className='configLabel'style={{color:'red'}}>Required</label>
                        <div className='buttonInput'>
                            <input className='input' type="text" value={storedLocation} onChange={this.handleStoredLocation} />  
                            <button className= 'browseButton'type='Browse'>Browse</button>
                        </div>
                        
                        
                    </div>
                    <br />
                    <div>
                    <button className= 'bottomButton'type='Continue'>Continue</button>
                    <button className= 'bottomButton'type='Cancel'>Cancel</button>
                    </div>
                    
                </form>
                {/* </div>     */}
            </div>
   
            
        )
        
    }
  
    
}

export default ProjectConfigurationHolder;