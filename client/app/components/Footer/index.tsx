import * as React from 'react';

const styles = require('./styles.css');

class Footer extends React.Component<{}, {}> {
  public render() {
    return (
      <footer className={styles.footer}>
        <section>
          <p>Clomfy @ 2017</p>
        </section>

      </footer>
    );
  }
}

export default Footer;
