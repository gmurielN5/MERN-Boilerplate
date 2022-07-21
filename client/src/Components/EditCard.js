import React from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardSubtitle,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import { deletePost } from "../Services/ContentService"

import moment from "moment"

const BlogCard = ({ article, user, dispatch }) => {
  return (
    <>
      <Card className=" border-0">
        <Row>
          <Col>
            <CardBody className="py-2">
              <CardTitle tag="h4" className="title">
                {article.title}
              </CardTitle>
              <CardSubtitle tag="p" className="text-muted">
                {article.subtitle}
              </CardSubtitle>
              <CardText>
                <small className="text-muted">
                  {moment(article.publishedDate).format("MMM DD")} .{" "}
                  {moment(article.publishedDate).fromNow()}
                </small>
              </CardText>
            </CardBody>
          </Col>
          <Col md={4}>
            <Link to={`/post/${user.username}/${article._id}`}>
              <Button color="ligth" className="mx-2">
                Edit
              </Button>
            </Link>
            <Button
              color="ligth"
              className="mx-2"
              onClick={() => deletePost(user.username, article._id, dispatch)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default BlogCard
