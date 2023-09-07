import {useRouteError} from "react-router";
import {Col, Container, Row} from "react-bootstrap";
import Layout from "../Components/Layout/Layout";


function ErrorPage() {
  const error = useRouteError();
  console.dir(error)

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h1>ERROR!</h1>
            <code>
              {error.stack}
            </code>
            <code>{error.toString()}</code>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ErrorPage;