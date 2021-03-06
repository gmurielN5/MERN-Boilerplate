import React, { useState, useEffect, useContext, useRef } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { useParams } from "react-router-dom"
import { getProfile, updateProfile, deleteUser } from "../Services/UserService"
import Editable from "../Components/Editable"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import { removeToken } from "../util"
import ImageUpload from "../Components/ImageUpload"

const Settings = ({ history }) => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext)
  let params = useParams()
  const inputRef = useRef({})
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState({ username: "", bio: "" })
  const [fileData, setFileData] = useState()
  const [avatar, setFile] = useState("")
  const [imgpreview, setImgpreview] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getProfile(params.id)
      .then((data) => {
        if (params.id !== user.id) {
          history.push("/error")
        }
        setUpdate({ username: data.user.username, bio: data.user.bio })
        setLoading(false)
      })
      .catch((error) => {
        history.push("/error")
      })
  }, [params.id, user.id, history])

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }

  // avatar image
  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
    setFile(target.value)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImgpreview(reader.result)
    }
    reader.readAsDataURL(target.files[0])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("avatar", fileData)
    formdata.append("username", update.username)
    formdata.append("bio", update.bio)
    updateProfile(user.id, formdata)
      .then((data) => {
        const { user, message } = data
        setMessage(message)
        if (!message.msgError) {
          setUser(user)
        }
      })
      .catch((error) => {
        history.push("/error")
      })
  }

  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then((data) => {
        removeToken("token")
        setIsAuthenticated(false)
        setUser(null)
        history.push("/signup")
      })
      .catch((error) => {
        history.push("/error")
      })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Container sm>
            <Row className="justify-content-center py-4">
              <h3>About You</h3>
            </Row>
            <Row className="justify-content-center">
              {message ? <Message message={message} /> : null}
              <Form onSubmit={onSubmit}>
                <FormGroup className="py-2">
                  <Editable
                    text={update.username}
                    placeholder={
                      !update.username ? "Enter a username" : update.username
                    }
                    childRef={inputRef}
                    type="input"
                    label=" Your bio appears on your Profile page. Max 160 characters."
                  >
                    <Input
                      ref={inputRef}
                      type="text"
                      name="username"
                      className="p-0"
                      placeholder={
                        !update.username ? "Enter a username" : update.username
                      }
                      value={update.username}
                      onChange={handleChange}
                    />
                  </Editable>
                </FormGroup>

                <FormGroup className="py-2">
                  <Editable
                    text={update.bio}
                    placeholder={!update.bio ? "Add a Bio" : update.bio}
                    childRef={inputRef}
                    type="input"
                    label="Your bio appears on your Profile page. Max 160 characters."
                  >
                    <Input
                      type="textarea"
                      ref={inputRef}
                      name="bio"
                      className="p-0"
                      value={update.bio}
                      placeholder={!update.bio ? "Add a Bio" : update.bio}
                      onChange={handleChange}
                    />
                  </Editable>
                </FormGroup>

                <FormGroup className="py-2">
                  <Row className="m-0">
                    <Col sm md={8} className="d-flex flex-column p-0">
                      <Label for="avatar">Photo</Label>
                      <span>
                        Your photo appears on your Profile page and with your
                        stories. File type: JPG, PNG
                      </span>
                    </Col>
                    <Col>
                      {imgpreview ? (
                        <img
                          src={imgpreview}
                          alt="preview"
                          className="avatar rounded-circle"
                        />
                      ) : user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="avatar rounded-circle"
                        />
                      ) : null}
                    </Col>
                    <Col className="text-right p-0">
                      <ImageUpload
                        value={avatar}
                        handleFileChange={handleFileChange}
                        text="Edit"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Row className="d-flex justify-content-center">
                  <Button color="dark" type="submit">
                    Save
                  </Button>
                </Row>
              </Form>
            </Row>
          </Container>
          <Container sm>
            <Row className="justify-content-center py-4">
              <h3>Account</h3>
            </Row>
            <Row sm className="justify-content-center align-items-center">
              <Label>Delete Account</Label>
              <span>
                Permanently delete your account and all of your content.
              </span>
              <Button
                color="danger"
                type="submit"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </Row>
          </Container>
        </Container>
      )}
    </>
  )
}

export default Settings
