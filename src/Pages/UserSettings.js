import React, {useEffect, useRef, useState} from "react";
import {useLoaderData} from "react-router";
import {Button, Col, Container, Form, FormControl, FormGroup, FormText, Row} from "react-bootstrap";
import {API_REFRESHUSERDATA, API_SETTINGS, API_UPDATEMYMAGAZINE} from "../api";
import {useAuth} from "../Components/Auth/Auth";
import {toast} from "react-toastify";
import Layout from "../Components/Layout/Layout";
import {Link} from "react-router-dom";

export default function UserSettings() {
  const {token, isLoggedIn, logout, profile} = useAuth();
  const settings = useLoaderData();
  const formRef = useRef()

  const [isPublic, setIsPublic] = useState(false)
  const [bio, setBio] = useState('');
  const UPDATE_TEXT = 'Update my Echo';
  const [updateButtonText, setUpdateButtonText] = useState(UPDATE_TEXT)
  const REFRESH_TEXT = 'Refresh my user data';
  const [refreshButtonText, setRefreshButtonText] = useState(REFRESH_TEXT)

  useEffect(() => {
    setIsPublic(settings.public)
  }, [settings]);

  useEffect(() => {
    setIsPublic(settings.public);
    if (settings.bio) {
      setBio(settings.bio);
    }
  }, [settings]);
  const updateMyMagazine = async () => {
    setUpdateButtonText("Updating...")
    const response = await fetch(
      API_UPDATEMYMAGAZINE, {
        headers: {
          "Authorization": `Token ${token}`,
        },
        method: "GET"
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      toast(responseData)
      setUpdateButtonText(UPDATE_TEXT);
      return;
    }

    toast('Your Echo has been updated.')
    setUpdateButtonText(UPDATE_TEXT);
  };

  const refreshUserData = async () => {
    setRefreshButtonText('Refreshing...')
    const response = await fetch(
      API_REFRESHUSERDATA, {
        headers: {
          "Authorization": `Token ${token}`,
        },
        method: "GET"
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      toast(responseData);
      setRefreshButtonText(REFRESH_TEXT);
      return;
    }

    toast('Your data has been refreshed')
    setRefreshButtonText(REFRESH_TEXT);
    return;
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    const response = await fetch(API_SETTINGS, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        "public": isPublic,
        "bio": bio
      })
    });
    if (response.ok) {
      const userSettingsData = await response.json();
      console.dir(response)
      toast("Settings successfully saved!")
    } else {
      toast("There was an error saving your settings. " + response.errored)
    }
  };

  // TODO: MAKE MODAL
  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h1>User Settings</h1>
            <Form ref={formRef}>
              <FormGroup>
                <FormText>Privacy Settings</FormText>
                <Form.Check name="public" label="Make my Echo public" type="checkbox" checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}/>
              </FormGroup>
              <FormGroup>
                <FormText>User Bio</FormText>
                <FormControl as="textarea" value={bio} placeholder={"Enter a brief bio here..."}
                             onChange={e => setBio(e.target.value)} aria-multiline={true} style={{maxWidth: "350px"}}/>
              </FormGroup>
              <Link to={'/dashboard/'} className="me-2 mt-2 btn btn-outline-danger" variant="dark">Cancel</Link>
              <Button className="me-2 mt-2" variant="dark" onClick={e => saveSettings(e)}>Save</Button>
            </Form>
            <hr/>
            <h2>Actions</h2>
            <Button className="me-2" variant="dark" onClick={() => updateMyMagazine()}>{updateButtonText}</Button>
            <Button className="me-2" variant="dark" onClick={() => refreshUserData()}>{refreshButtonText}</Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
