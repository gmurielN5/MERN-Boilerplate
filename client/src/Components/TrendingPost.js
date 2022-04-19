import React from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import { User } from "./Nav/User"
import moment from "moment"

export const TrendingPost = ({ article }) => {
  return (
    <>
      <Link to={`/post/${article.author.username}/${article._id}`}>
        <Card className="py-2 border-0">
          <Row className="pb-3">
            <Col md={8}>
              <CardHeader className="bg-transparent border-0">
                {!article.author ? null : <User user={article.author} />}
              </CardHeader>
              <CardBody>
                <CardTitle tag="h3">{article.title}</CardTitle>
                <CardText tag="h6" className="mb-2">
                  {article.subtitle}
                </CardText>
                <CardText>
                  <small className="text-muted">
                    {moment(article.publishedDate).format("MMM DD")} .{" "}
                    {moment(article.publishedDate).fromNow()}
                  </small>
                </CardText>
              </CardBody>
            </Col>
            {!article.img ? null : (
              <Col md={4}>
                <CardImg
                  src={article.img}
                  alt="thumbnail"
                  className="thumbnail"
                />
              </Col>
            )}
          </Row>
        </Card>
      </Link>
    </>
  )
}
