
import * as React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FormattedNumber} from 'react-intl';
import ListItem from '../ListItem';


interface IListItemProps {
  item?: any;
}

export class BuildpackListItem extends React.PureComponent<IListItemProps, {}>  { 
  render() {
    const item = this.props.item.entity;

    // Put together the content of the repository
    const content = (
      <div>
       <span>
          {item.enabled}
       </span>
        <span>
          {item.filename}
       </span>
        <span>
          {item.name}
       </span>
        <span>
          {item.locked}
       </span>
        <span>
          {item.position}
       </span>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.filename}`} item={content}/>
    );
  }
}
