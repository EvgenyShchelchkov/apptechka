import React from 'react';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Spinner.module.css';

export default function SpinnerUI(): React.JSX.Element {
  return (
    <Row className={styles.spinnerContainer}>
      <Spinner animation="grow" variant="dark" />
    </Row>
  );
}
