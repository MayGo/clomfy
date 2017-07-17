import * as React from 'react';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  buildpacks?: any[];
}

class BuildpacksList extends React.Component<IListProps, {}> {
  public render() {
    const { loading, error, buildpacks } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }

    if (error !== false) {
    
      return <div>Something went wrong, please try again!</div>;
    }
    if(!buildpacks){
      return <div>No buildpacks</div>;
    }
    console.log(buildpacks)
    const listItems = buildpacks.map((item) =>
      <ListItem
        primaryText={item.name}
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>{item.filename}</span> --
              Enabled:{item.enabled} Locked: {item.locked}
          </p>
        }
        secondaryTextLines={2}
      />
    );


    if (buildpacks) {
      return <List>{listItems}</List>;
    }

    return null;
  }
}


export default BuildpacksList;
