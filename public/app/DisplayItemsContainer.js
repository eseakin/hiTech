import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react';
import DisplayItem from './DisplayItem';
import _ from 'lodash';

class DisplayItemsContainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  renderItems(list) {
    let results = [];
    for(let key in list) {
      results.push(<DisplayItem item={item} type={type} key={key} id={key} />)
    }
    console.log(results)
    return results;
  }

  render() {
    const { source, type } = this.props
    
    return(
      <Segment attached='bottom'>
        {Object.keys(source).map((key) => <DisplayItem item={source[key]} type={type} key={key} id={key} />)}
      </Segment>
    )
  }

};

export default DisplayItemsContainer;
