import React, { useState, useEffect, useRef, useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import {
  Container,
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap"
import { addPost } from "../Services/ContentService"
import { useParams } from "react-router-dom"
import Editable from "../Components/Editable"
import ImageUpload from "../Components/ImageUpload"
import Message from "../Components/Message"

const StoryForm = ({ history }) => {
  const { store, dispatch } = useContext(AuthContext)
  let { username } = useParams()

  const [article, setArticle] = useState({ title: "", subtitle: "", body: "" })
  const [hidden, setHidden] = useState(true)

  const inputRef = useRef({})
  let timerID = useRef(null)

  const [fileData, setFileData] = useState("")
  const [img, setFile] = useState("")
  const [imgpreview, setImgpreview] = useState("")

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setArticle({ title: "", subtitle: "", body: "" })
    setHidden(true)
    setFileData("")
  }

  //  image
  const handleFileChange = ({ target }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImgpreview(reader.result)
    }
    reader.readAsDataURL(target.files[0])
    setFileData(target.files[0])
    setFile(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("img", fileData)
    formdata.append("title", article.title)
    formdata.append("subtitle", article.subtitle)
    formdata.append("body", article.body)
    formdata.append("hidden", hidden)
    addPost(username, formdata, dispatch)
    if (!store.isError && !store.Loading) {
      resetForm()
      timerID = setTimeout(() => {
        history.push("/")
      }, 2000)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  // Sanitie and validate form with React hook Form
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-end py-2 px-4 border-bottom border-dark">
          <Button color="dark" type="submit" className="mx-2">
            Save Draft
          </Button>

          <Button
            color="dark"
            type="submit"
            className="mx-2"
            onClick={() => setHidden(false)}
          >
            Publish
          </Button>
        </Row>
        {store.message.length !== 0 ? (
          <Message message={store.message} />
        ) : null}
        <Container sm className="small">
          <FormGroup className="p-0 mb-0">
            <Editable
              text={article.title}
              placeholder="Title"
              childRef={inputRef}
              type="input"
              editButton="false"
              header="true"
            >
              <Input
                ref={inputRef}
                type="text"
                name="title"
                value={article.title}
                onChange={handleChange}
                placeholder="Title"
                className="formheader p-0"
              />
            </Editable>
          </FormGroup>
          <FormGroup className="p-0 mb-0">
            <Editable
              text={article.subtitle}
              placeholder="Tell your story..."
              childRef={inputRef}
              type="input"
              editButton="false"
            >
              <Input
                ref={inputRef}
                type="text"
                name="subtitle"
                placeholder="Add a short description..."
                value={article.subtitle}
                onChange={handleChange}
                className="p-0"
              />
            </Editable>
          </FormGroup>

          <FormGroup className="p-0 mb-0">
            <Row>
              {!imgpreview ? (
                <Col sm md={10}>
                  <Label className="formspan">
                    Add an image to your story. File type: JPG, PNG
                  </Label>
                </Col>
              ) : (
                <Col sm md={12}>
                  <img src={imgpreview} alt="preview" className="img" />
                </Col>
              )}
              <Col className="text-right">
                <ImageUpload
                  value={img}
                  handleFileChange={handleFileChange}
                  text="Edit"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup className="py-2">
            <Editable
              text={article.body}
              placeholder="add text"
              childRef={inputRef}
              type="textarea"
              editButton="false"
              span="true"
            >
              <Input
                ref={inputRef}
                type="textarea"
                name="body"
                placeholder="Add text"
                value={article.body}
                onChange={handleChange}
                className="border-0"
              />
            </Editable>
          </FormGroup>
        </Container>
      </Form>
    </Container>
  )
}

export default StoryForm
