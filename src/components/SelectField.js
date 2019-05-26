import React from 'react';
import Select from 'react-select';
import { Row, Col, InputGroup, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';


class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDropright: false
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(evt) {
    let found = this.props.categories.find(x => x.value === evt.target.value);
    if (found)
      this.props.onSelectField(found);
  }

  render() {

    return (
      <Col md="6">
        <div className="SelectField">
          <Dropdown direction="up" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
            <DropdownToggle color="success" caret>
              Add a field
            </DropdownToggle>
            <DropdownMenu
              modifiers={{
                setMaxHeight: {
                  enabled: true,
                  order: 890,
                  fn: (data) => {
                    return {
                      ...data,
                      styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: 200,
                      },
                    };
                  },
                },
              }}
            >
              {
                this.props.categories.map((x, i) => (
                  <DropdownItem 
                    key={i} 
                    disabled={x.disabled}
                    onClick={this.onSelect}
                    value={x.value}
                    >
                    {x.label}
                  </DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>
    );
  }
}

export default SelectField;
