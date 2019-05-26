import React from 'react';
import { InputGroup, Col } from 'reactstrap';

import Field from './Field';

class Fields extends React.Component {
  constructor(props) {
    super(props);

    this.onRemoveField = this.onRemoveField.bind(this);
    this.onChangeFieldQuery = this.onChangeFieldQuery.bind(this);
  }

  onRemoveField(value) {
    this.props.onRemoveField(value);
  }

  onChangeFieldQuery(value, query) {
    this.props.onChangeFieldQuery(value, query);
  }

  render() {
    const { fields } = this.props;
    return (
      <Col>
        { fields.map( (x,i) => (
          <Field 
            key={i} 
            field={x} 
            onRemoveField={ this.onRemoveField }
            onChangeFieldQuery={ this.onChangeFieldQuery }
            />
        )) }
      </Col>
    );
  }
}

export default Fields;
