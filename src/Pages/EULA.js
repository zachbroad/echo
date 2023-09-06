import Layout from "../Components/Layout/Layout";
import {Container} from "react-bootstrap";

const EULA = () => (
  <Layout>
    <Container>
      <h2>
        ECHO END USER LICENSE AGREEMENT (EULA)
      </h2>
      <p>
        This End User License Agreement ("EULA") is a legal agreement between you and Echo. By using this software, you agree to be bound by the terms of this EULA.
      </p>

      <ul>
        <li>
          <b>Grant of License</b>: Echo grants you a non-exclusive, non-transferable license to use the software, subject to all the terms and conditions set forth here within.
        </li>

        <li>
          <b>Restrictions</b>: You may not rent, lease, sublicense, or lend the software. You may not reverse engineer, decompile, or disassemble the software.
        </li>

        <li>
          <b>Termination</b>: Without prejudice to any other rights, Echo may terminate this EULA if you fail to comply with its terms and conditions. In such events, you must destroy all copies of the software.
        </li>

        <li>
          <b>Disclaimer of Warranty</b>: The software is provided "AS IS", without warranty of any kind. The entire risk arising out of use or performance of the software remains with you.
        </li>

        <li>
          <b>Governing Law</b>: This EULA is governed by the laws of the jurisdiction in which you are located.
        </li>
      </ul>
    </Container>
  </Layout>
);

export default EULA;