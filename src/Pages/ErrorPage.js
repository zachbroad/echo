import Header from "../Components/Header";
import {useRouteError} from "react-router";
import {Col, Container, Row} from "react-bootstrap";


function ErrorPage() {
  const error = useRouteError();
  console.dir(error)

  return (
    <>
      <Header/>
      <Container>
        <Row>
          <Col>
            <h1>ERROR!</h1>
            <code>
              {error.stack}
            </code>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ErrorPage;