import React, {Component} from 'react'
import { Table } from 'semantic-ui-react'
import _ from 'lodash';

class DisplayItem extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

          // <List>
          //   {Object.keys(item).map((key) => {
          //     return (<List.Item key={key}>{key + ': ' + item[key]}</List.Item>)
          //   })}
          //   <List.Item>{'Database ID: ' + id}</List.Item>
          // </List>


  render() {
    const { item, type, id} = this.props
    const { companyName, name, contactName, phone, email, address, notes, parts, date, expDate, partsCount } = item

    return(
      <Table.Row key={id}>
        
        {companyName && <Table.Cell>{companyName}</Table.Cell>}
        {name && <Table.Cell>{name}</Table.Cell>}
        {partsCount && <Table.Cell>{partsCount}</Table.Cell>}
        {contactName && <Table.Cell>{contactName}</Table.Cell>}
        {phone && <Table.Cell>{phone}</Table.Cell>}
        {email && <Table.Cell>{email}</Table.Cell>}
        {address && <Table.Cell>{address}</Table.Cell>}
        {date && <Table.Cell>{date}</Table.Cell>}
        {expDate && <Table.Cell>{expDate}</Table.Cell>}
        {id && <Table.Cell>{id}</Table.Cell>}
      </Table.Row>




    )
  }

      // <Card key={id}>
      //   <Card.Content>
      //     <Grid columns={3}>
      //       <Grid.Row>

      //         <Grid.Column width={6}>
      //           <Card.Header>
      //             {companyName && <div>{companyName}</div>}
      //             {name && <div>{name}</div>}
      //           </Card.Header>
      //           <Card.Meta>
      //             {contactName && <div>{contactName}</div>}
      //             {date && <div>{date}</div>}
      //           </Card.Meta>
      //           <Card.Description>
      //             {phone && <div>{phone}</div>}
      //             {email && <div>{email}</div>}
      //           </Card.Description>
      //         </Grid.Column>

      //         <Grid.Column>
      //           <Card.Description>
      //             {parts && parts.map(part => <div key={part.name}>{part.name} - {part.number} {part.revision}</div>)}
      //           </Card.Description>
      //         </Grid.Column>

      //         <Grid.Column>
      //           <Card.Description>
      //             {address && <div>{address}</div>}
      //             {notes && parts && <div>{notes}</div>}
      //           </Card.Description>
      //         </Grid.Column>

      //       </Grid.Row>
      //     </Grid>
      //   </Card.Content>
      // </Card>

  // render() {
  //   const { item, type } = this.props;
  //   return(
  //     <Card fluid>
  //       <Card.Content>
  //         <Card.Header>
  //           <Label as='span' color='blue' size='large' ribbon>{partsCount + 1}</Label>
  //           <Form.Field width={15} style={{float: 'right'}}>
  //             <label>Part Name</label>
  //             <input name={partsCount + ' name'} placeholder='Part Name' onChange={this.handleChange.bind(this)}/>
  //           </Form.Field>
  //         </Card.Header>
  //       </Card.Content>

  //       <Card.Content>
  //         <Form.Group width={16}>
  //           <Form.Field width={6}>
  //             <label>Part Number</label>
  //             <input name={partsCount + ' number'} placeholder='Part Number' onChange={this.handleChange.bind(this)} />
  //           </Form.Field>
  //           <Form.Field width={4}>
  //             <label>Revision</label>
  //             <input name={partsCount + ' revision'} placeholder='Revision' onChange={this.handleChange.bind(this)}/>
  //           </Form.Field>
  //         </Form.Group>

  //         <Form.Field>
  //           <label>Description</label>
  //           <TextArea rows={3} name={partsCount + ' description'} placeholder='Description' onChange={this.handleChange.bind(this)}/>
  //         </Form.Field>

  //         {this.props.prices.map((price, i) => {
  //           return (<AddPrice key={i} pricesIndex={i} partsCount={partsCount} handlePriceChange={this.props.handlePriceChange}/>)
  //         })}

  //         <Button type='button' style={{height: 40, marginTop: 20}} onClick={(e) => this.addPrice(e, partsCount)}>
  //           Add Pricing
  //         </Button>
  //         <Button type='button' style={{height: 40, marginTop: 20}} onClick={(e) => this.removePrice(e, partsCount)}>
  //           Remove Last Price
  //         </Button>
  //       </Card.Content>
  //     </Card>
  //   )
  // }

};

export default DisplayItem;
