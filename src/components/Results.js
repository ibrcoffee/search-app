import React from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';

import './Results.css';

class Results extends React.Component {

  render() {
    console.log(this.props);
    const { results } = this.props;

    return (
      <Container style={{padding: "1em"}}>
        <div className="Results">
          { (results.total === 0 || results.hits === undefined) ? 
            (<p style={{ fontSize: "1.5em" }}>No results</p>) : 
          (<Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>FIPS</th>
                <th>APN</th>
                <th>Property Street Address</th>
                <th>Property City</th>
                <th>Property State</th>
              </tr>
            </thead>
            <tbody>
              { results.hits.map((x,i) => (
                <tr key={i}>
                  <th scope="row">{i+1}</th>
                  <td>{x._source["FIPS"]}</td>
                  <td>{x._source["APN"]}</td>
                  <td>{x._source['PROPERTY STREET ADDRESS']}</td>
                  <td>{x._source['PROPERTY CITY']}</td>
                  <td>{x._source['PROPERTY STATE']}</td>
                </tr>
              )) }
            </tbody>
          </Table>)}
          <Button 
            color="primary" 
            size="md" 
            style={{ width: "30em" }}
            onClick={ () => this.props.history.push('/search') }
            >
            Back to Search
          </Button>
        </div>
      </Container>
    );
  }
}

export default Results;
