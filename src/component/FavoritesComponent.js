import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";

class FavoritesComponent extends React.Component {
  render = () => (
    <div>
      <Grid>
        <Row>
          <Col sm={12}>
            <h2>Favorites</h2>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default FavoritesComponent;