import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ArticleCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h2>Title: <span className="card-articleName">{this.props.article.title}</span></h2>
          <p>Synopsis: <span>{this.props.article.synopsis}</span></p>
          <p>Link: <span>{this.props.article.url}</span></p>
          {/* <button type="button" onClick={() => this.props.deleteAnimal(this.props.animal.id)}>Discharge</button>
          <Link to={`/animals/${this.props.animal.id}`}><button>Details</button></Link>
          <button type="button"
            onClick={() =>{ this.props.history.push(`/animals/${this.props.animal.id}/edit`) }}>Edit</button> */}
        </div>
      </div>
    );
  }
}

export default ArticleCard;