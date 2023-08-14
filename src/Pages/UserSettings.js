import React, {useEffect, useRef, useState} from "react";
import Header from "../Components/Header";
import {useLoaderData} from "react-router";
import UserDashboardView from "../Components/UserDashboardView";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useAuth} from "../Components/Auth";
import {API_SETTINGS} from "../api";
import {toast} from "react-toastify";

export default function UserSettings() {
  const {token, isLoggedIn, logout, profile} = useAuth();
  const settings = useLoaderData();
  const [isPublic, setIsPublic] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    setIsPublic(settings.public)
  }, [settings])

  // action: async ({params, request}) => {
  //   const response = await fetch(API_SETTINGS, {
  //     headers: {
  //       "Authorization": `Token ${token}`
  //     },
  //     method: "PUT",
  //     body: request.formData()
  //   });
  //   const userSettingsData = await response.json();
  //   return userSettingsData;
  // }

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
  }

  return (
    <div>
      <Header/>
      <Container>
        <Row>
          <Col>
            <h1>User Settings</h1>
            <Form ref={formRef}>
              <Form.Check name="public" label="Make my Echo public" type="checkbox" checked={isPublic}
                          onChange={() => setIsPublic(!isPublic)}/>
              <Button onClick={e => saveSettings(e)}>Save</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
