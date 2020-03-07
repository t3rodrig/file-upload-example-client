import React, { Component } from 'react';

// import the service file since we need it to send (and get)
// the data to (from) server
import service from '../api/service';

class AddThing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageUrl: ""
    };
  }

  // this method submits the form
  handleSubmit = event => {
    event.preventDefault();

    service.saveNewThing(this.state)
      .then(response => {
        console.log("added: ", response);
        // here you would redirect to some other page
      })
      .catch(err => console.log("Error while adding the thing: ", err));
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // this method handles just the file upload
  handleFileUpload = event => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the 
    // model since we pass req.body to .create() method when
    // creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", event.target.files[0]);

    service.handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({
          imageUrl: response.secure_url
        });
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  }
  
  render() {
    return (
      <div>
        <h2>New Thing</h2>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={event => this.handleChange(event)}
          />
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={event => this.handleChange(event)}
          />
          <input
            type="file"
            onChange={event => this.handleFileUpload(event)}
          />
          <button type="submit">Save new thing</button>
        </form>
      </div>
    );
  }
}

export default AddThing;