import React, {Component} from 'react';
import { Segment, Header, Table } from 'semantic-ui-react';
import DisplayItem from './DisplayItem';
import _ from 'lodash';
import config from './dataConfig';

class DisplayItemsContainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sorted: 'descending',
      activeSort: 'companyName'
    };
  }

  componentWillReceiveProps(props) {
    if(props.type === 'users')
      this.setState({activeSort: 'name'})
    else
      this.setState({activeSort: 'companyName'})
  }

  handleClick = (name) => {
    console.log(name)
    const { sorted, activeSort } = this.state;
    let sort;
    
    if(name === activeSort) {
      sort = sorted === 'ascending' ? 'descending' : 'ascending';
      this.setState({sorted: sort})
    } else {
      this.setState({activeSort: name, sorted: 'descending'})
    }
  }

  handleSort = (name) => {
    const { sorted, activeSort } = this.state;
    
    if(name === activeSort)
      return sorted
    else 
      return
  }

  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  render() {
    const { source, type } = this.props
    const { sorted, activeSort } = this.state
    const key = Object.keys(source)[0]
    const item = source[key]
    
    return(
      <Segment attached='bottom'>
        <Header size='huge' style={{marginLeft: 15}}>{this.capitalize(type)}</Header>
        <Table sortable verticalAlign='middle' striped>
          <Table.Header>
            <Table.Row>
              {key && item.companyName && <Table.HeaderCell sorted='descending' onClick={() => this.handleClick('companyName')}>Company Name</Table.HeaderCell>}
              {key && item.name && <Table.HeaderCell onClick={() => this.handleClick('name')}>Name</Table.HeaderCell>}
              {key && item.partsCount && <Table.HeaderCell onClick={() => this.handleClick('partsCount')}>Parts Count</Table.HeaderCell>}
              {key && item.contactName && <Table.HeaderCell onClick={() => this.handleClick('contactName')}>Contact Name</Table.HeaderCell>}
              {key && item.phone && <Table.HeaderCell onClick={() => this.handleClick('phone')}>Phone</Table.HeaderCell>}
              {key && item.email && <Table.HeaderCell onClick={() => this.handleClick('email')}>Email</Table.HeaderCell>}
              {key && item.address && <Table.HeaderCell onClick={() => this.handleClick('address')}>Address</Table.HeaderCell>}
              {key && item.date && <Table.HeaderCell onClick={() => this.handleClick('date')}>Date</Table.HeaderCell>}
              {key && item.expDate && <Table.HeaderCell onClick={() => this.handleClick('expDate')}>Expiration Date</Table.HeaderCell>}
              <Table.HeaderCell onClick={() => this.handleClick('id')}>ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.keys(source).map(key => <DisplayItem item={source[key]} type={type} key={key} id={key} />)}
          </Table.Body>
        </Table>
      </Segment>
    )
  }

};

export default DisplayItemsContainer;
