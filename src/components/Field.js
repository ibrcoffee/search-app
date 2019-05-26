import React from 'react';
import { Container, Row, Col, Label, Input, InputGroup, Button } from 'reactstrap';

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.field.query
    };

    this.onRemoveField = this.onRemoveField.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onRemoveField(evt) {
    this.props.onRemoveField(this.props.field.value);
  }

  onChange(evt) {
    this.setState({
      query: evt.target.value
    });
    this.props.onChangeFieldQuery(this.props.field.value, evt.target.value);
  }

  render() {
    const { field } = this.props;
    
    return (
      <Row style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
        <Col>
          <Row>
            <InputGroup>
              <Button 
                md={{ size: "1", offset: "2" }}
                style={{ color: "white" }}
                value={ field.value }
                onClick={ this.onRemoveField }
                close />
              <Label 
                for={field.value} 
                md="3"
                style={{textAlign: "right", paddingTop: ".1em", fontSize: ".8em"}}
                >{field.label}</Label>
              <Input 
                placeholder={field.label} 
                md="6"
                id={field.value}
                type={field.type}
                value={ this.state.query }
                onChange= { this.onChange }
                />
            </InputGroup>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Field;
