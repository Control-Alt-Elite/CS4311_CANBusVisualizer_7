import React, { Component } from 'react';
import './ProjectConfigurationHolder.css'
const logoPic = new URL("./images/backgroundLogo.png",import.meta.url)

function projectConfigurration() {
    return<>
    <header className="logo-header"></header>
      <div className="logo-pic"> 

        <img src={logoPic}/>
      </div>
      </>
    
}
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
                {/* <div className='container'> */}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label className='configCreateLocation'>Create New Project</label>
                    </div>
                    <div>
                        <label className='configLabelProjectname'>Project Name</label>
                        <input className='configInputProjectname' type="text" value={projectName} onChange={this.handleProjectName} />
                        <label className='configLabelRequired'>Required</label>
                    </div>
                    <div>
                        <label className='configLabelLocation'>Stored Location</label>
                        <input className='configInputLocation' type="text" value={storedLocation} onChange={this.handleStoredLocation} />
                        <label className='configSecLabelRequired'>Required</label>
                    </div>
                    <br />
                    <div>
                    <button className= 'continueButton'type='Continue'>Continue</button>
                    <button className= 'cancelButton'type='Cancel'>Cancel</button>
                    </div>
                    <div>
                    <button className= 'browseButton'type='Browse'>Browse</button>
                    </div>
                    <div>
                    <button className= 'minButton'type='Min'>_</button>
                    <button className= 'maxButton'type='Max'>O</button>
                    <button className= 'exitButton'type='exit'>X</button>   
                    </div>
                </form>
                {/* </div>     */}
            </div>
   
            
        )
        
    }
  
    
}

export default ProjectConfigurationHolder;