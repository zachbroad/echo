import React, {useEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import {useLoaderData} from "react-router";
import UserDashboardView from "../Components/UserDashboardView";
import {Button, ButtonGroup, Col, Container, Form, FormControl, FormGroup, FormText, Row} from "react-bootstrap";
import {useAuth} from "../Components/Auth";
import {API_REFRESHUSERDATA, API_SETTINGS, API_UPDATEMYMAGAZINE} from "../api";
import {toast} from "react-toastify";

export default function UserSettings() {
  const {token, isLoggedIn, logout, profile} = useAuth();
  const settings = useLoaderData();
  const [isPublic, setIsPublic] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    setIsPublic(settings.public)
  }, [settings]);

  const updateMyMagazine = async () => {
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
      return;
    }

    toast('Your Echo has been updated.')
    return;
  };

  const refreshUserData = async () => {
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
      toast(responseData)
      return;
    }

    toast('Your data has been refreshed')
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
        "public": isPublic
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

  return (
    <div>
      <Header/>
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
                <FormControl as="textarea"  aria-multiline={true} style={{maxWidth: "350px"}}/>
              </FormGroup>
              <Button className="me-2 mt-2" variant="dark" onClick={e => saveSettings(e)}>Save</Button>
            </Form>
            <hr/>
            <h2>Actions</h2>
            <Button className="me-2" variant="dark" onClick={() => updateMyMagazine()}>Update my Echo</Button>
            <Button className="me-2" variant="dark" onClick={() => refreshUserData()}>Refresh my user data</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
