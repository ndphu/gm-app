import React from "react";
import {Col, Grid, Row} from "react-bootstrap";


class RandomComponent extends React.Component {
  render = () => (
    <Grid>
      <Row>
        <Col>
          <div>
            <h2>Random</h2>
          </div>
        </Col>
      </Row>
    </Grid>
  )
}

export default RandomComponent;