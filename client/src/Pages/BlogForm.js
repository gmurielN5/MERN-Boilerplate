import React, { useState, useEffect, useRef, useContext } from "react"
import {
  Container,
  Row,
  Col,
  FormText,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
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
    <Container className="w-50 my-5 text-center">
      <Form onSubmit={handleSubmit}>
        {store.message.length !== 0 ? (
          <Message message={store.message} />
        ) : null}
        <Row className="my-5 justify-content-md-end">
          <Button color="light" type="submit">
            Save Draft
          </Button>
          <Button color="light" type="submit" onClick={() => setHidden(false)}>
            Publish
          </Button>
        </Row>
        <FormGroup>
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
              placeholder="Title"
              value={article.title}
              onChange={handleChange}
              className="border-0"
            />
          </Editable>
        </FormGroup>
        <FormGroup>
          <Editable
            text={article.subtitle}
            placeholder="Add a short description..."
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
              className="border-0"
            />
          </Editable>
        </FormGroup>
        <FormGroup row>
          {!imgpreview ? (
            <>
              <Col sm={10} className="text-left">
                <FormText color="muted">
                  Add an image to your stories. File type: JPG, PNG
                </FormText>
              </Col>
              <Col sm={2} className="text-right">
                <ImageUpload
                  value={img}
                  handleFileChange={handleFileChange}
                  text="Edit"
                />
              </Col>
            </>
          ) : (
            <Col sm={12} className="text-center">
              <img src={imgpreview} alt="preview" className="" />
            </Col>
          )}
        </FormGroup>

        <FormGroup>
          <Editable
            text={article.body}
            placeholder="Tell your Story..."
            childRef={inputRef}
            type="textarea"
            editButton="false"
          >
            <Input
              ref={inputRef}
              type="textarea"
              name="body"
              placeholder="Tell your Story..."
              value={article.body}
              onChange={handleChange}
              className="border-0"
            />
          </Editable>
        </FormGroup>

        {/* Add Content preview from dropdownIcons */}
        {/* <Row>
                    {content}
                </Row> */}
        {/* <DropdownIcons 
                     body={article.content}
                     handleContent={handleChange}
                     handleFileChange={handleFileChange}
                     image={image}
                     imgpreview={imgpreview}
                 /> */}
      </Form>
    </Container>
  )
}

export default StoryForm
