import React, { Component } from 'react';

// import the service file since we need it to send (and get)
// the data to (from) server
import service from '../api/service';

class AddThing extends Component {
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