/**
 * Test the repo list item
 */

import * as expect from 'expect';
import { shallow, mount } from 'enzyme';
import * as React from 'react';

import { RepoListItem } from '../index';
import ListItem from 'app/components/ListItem';

describe('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'mxstbr/react-boilerplate',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <RepoListItem item={item} />,
    );
    expect(renderedComponent.find(ListItem).length).toEqual(1);
  });

  
});
