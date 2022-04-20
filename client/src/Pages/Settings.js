import React, { useState, useEffect, useContext, useRef } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container className="w-50 my-5 ">
          <Form onSubmit={onSubmit}>
            {message ? <Message message={message} /> : null}
            <Row>
              <Col className="py-md-4 text-center">
                <h3>About You</h3>
              </Col>
            </Row>
            <FormGroup>
              <Editable
                text={update.username}
                placeholder={
                  !update.username ? "Enter a username" : update.username
                }
                childRef={inputRef}
                type="input"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  name="username"
                  placeholder={
                    !update.username ? "Enter a username" : update.username
                  }
                  value={update.username}
                  onChange={handleChange}
                />
              </Editable>
              <Row>
                <Col className="text-left">
                  <FormText color="muted">
                    Your username appears on your Profile page. It is a required
                    field.
                  </FormText>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Editable
                text={update.bio}
                placeholder={update.bio ? update.bio : "Add a Bio"}
                childRef={inputRef}
                type="input"
              >
                <Input
                  type="textarea"
                  ref={inputRef}
                  name="bio"
                  value={update.bio}
                  placeholder={update.bio ? update.bio : "Add a Bio"}
                  onChange={handleChange}
                />
              </Editable>
              <Row>
                <Col className="text-left">
                  <FormText color="muted">
                    Your bio appears on your Profile page. Max 160 characters.
                  </FormText>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup row>
              <Col sm={6} className="text-left">
                <Label for="avatar">Photo</Label>
                <FormText color="muted">
                  Your photo appears on your Profile page and with your stories.
                  File type: JPG, PNG
                </FormText>
              </Col>
              <Col sm={4} className="text-center">
                {imgpreview ? (
                  <img
                    src={imgpreview}
                    alt="preview"
                    className="avImg rounded-circle"
                  />
                ) : user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="avImg rounded-circle"
                  />
                ) : null}
              </Col>
              <Col sm={2} className="text-right">
                <ImageUpload
                  value={avatar}
                  handleFileChange={handleFileChange}
                  text="Edit"
                />
              </Col>
            </FormGroup>
            <Row>
              <Col className="py-md-4 text-center">
                <Button color="dark" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>

          <Container className="my-5 px-0 pb-5">
            <Row>
              <Col className="py-md-4 text-center">
                <h3>Account</h3>
              </Col>
            </Row>
            <Row>
              <Col sm={8} className="text-left">
                <Row>
                  <Label>Delete Account</Label>
                </Row>
                <Row>
                  <span>
                    Permanently delete your account and all of your content.
                  </span>
                </Row>
              </Col>
              <Col sm={4} className="text-right">
                <Button
                  color="light"
                  type="button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </div>
  )
}

export default Settings
