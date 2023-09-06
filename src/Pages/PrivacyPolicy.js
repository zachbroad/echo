import Layout from "../Components/Layout/Layout";
import {Container} from "react-bootstrap";

const PrivacyPolicy = () => (<Layout>
  <Container>
    <h2>
      ECHO PRIVACY POLICY
    </h2>
    <p>
      Your privacy is important to us. This privacy policy outlines the personal data Echo collects and how we use it.
    </p>

    <ul>
      <li>
        <b>Information Collection</b>: When you connect your Spotify account, we collect your public profile information
        and listening history.
      </li>

      <li>
        <b>Usage</b>: We use your data to visualize your Spotify listening history and provide personalized insights.
      </li>

      <li>
        <b>Storage</b>: Your data is stored securely and is not shared with third parties.
      </li>

      <li>
        <b>Cookies</b>: Our website uses cookies to enhance user experience. Cookies are small files saved on your
        computer that store preferences and other information.
      </li>

      <li>
        <b>Changes</b>: We may update our privacy policy from time to time. We will notify you of any changes by posting
        the new privacy policy on this page.
      </li>

      <li>
        <b>Contact</b>: If you have any questions about our privacy practices or this policy, please contact us.
      </li>
    </ul>
  </Container>
</Layout>
);

export default PrivacyPolicy;