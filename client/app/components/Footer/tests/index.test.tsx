import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';

import Footer from 'app/components/Footer';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(
      <Footer />,
    );
    expect(renderedComponent.contains(
      <section>
        <p>Clomfy @ 2017</p>
      </section>,
    )).toEqual(true);
  });

});
