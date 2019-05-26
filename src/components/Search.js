import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import Fields from './Fields';
import SelectField from './SelectField';
import { categories } from '../data/categories';

import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      fields: [/*{
        value: 'type',
        label: 'Type',
        type: 'text',
        query: ''
      }*/],
      categories: categories
    };

    this.onSelectField = this.onSelectField.bind(this);
    this.onRemoveField = this.onRemoveField.bind(this);
    this.onChangeFieldQuery = this.onChangeFieldQuery.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSelectField(field) {
    this.setState({
      fields: this.state.fields.concat({
        value: field.value,
        label: field.label,
        type: field.type,
        query: ''
      }),
      categories: this.state.categories.map((x) => (
        x.value === field.value ? {
          ...x,
          disabled: true
        } : x
      ))
    });
  }

  onRemoveField(value) {
    this.setState({
      fields: this.state.fields.filter((x) => (
        x.value !== value
      )),
      categories: this.state.categories.map((x) => (
        x.value === value ? {
          ...x,
          disabled: false
        } : x
      ))
    });
  }

  onChangeFieldQuery(value, query) {
    this.setState({
      fields: this.state.fields.map((x) => (
        x.value === value ? {
          ...x,
          query: query
        } : x
      ))
    });
  }

  onSearch() {
    if (this.state.fields.length === 0) {
      alert('Please add search fields.');
      return;
    }

    this.setState({
      inProgress: true
    });

    let ps = {};
    for (let field of this.state.fields)
      ps[field.value] = field.query;

    axios.get('https://v7s46p08ja.execute-api.us-east-1.amazonaws.com/search-es-api-test', {
      params: ps
    })
    .then(response => {
      console.log(response.data);
      this.props.setResults(response.data.hits);
      this.props.history.push('/results');
    })
    .catch(error => {
      console.log(error);
      this.setState({
        inProgress: false
      });
    });
  }

  render() {

    return (
      
      <Container style={{padding: "1em"}}>
      { this.state.inProgress && (
        <div className="loading">
          <div style={{ paddingTop: "45vh" }}>
            <Spinner
              color="primary" 
              style={{ width: '5rem', height: '5rem' }}/>
          </div>
        </div>
      )}
        <div className="Search">  
          <Col md={{ size: 12, offset: 0 }}>
            <Row style={{ marginBottom: "1.5em" }}>
              <Col >
                <h2 >What are you going to search?</h2>
              </Col>
            </Row>
            <Row>
              <Fields 
                fields={this.state.fields}
                onRemoveField={ this.onRemoveField }
                onChangeFieldQuery={ this.onChangeFieldQuery }
                />
            </Row>
            <Row style={{ marginTop: "1.5em" }}>
              <Col md="4">
                <SelectField 
                  onSelectField={this.onSelectField}
                  categories={ this.state.categories }
                  />
              </Col>
              <Col md="8">
                <Button 
                  color="primary" 
                  size="md" 
                  block
                  onClick={ this.onSearch }
                  >
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
        </div>
      </Container>
    );
  }
}

export default Search;
