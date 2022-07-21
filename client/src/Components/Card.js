import React from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardSubtitle,
  CardBody,
  CardTitle,
} from "reactstrap"
import { User } from "./Nav/User"
import moment from "moment"

export const CardPost = ({ article, index, thumbnail, user }) => {
  let className = ""
  if (thumbnail) {
    className += "title"
  }
  return (
    <>
      <Link to={`/post/${article.author.username}/${article._id}`}>
        <Card className="border-0">
          <Row>
            <Col>
              <CardHeader className="bg-transparent border-0 px-3 py-1">
                <span className="opacityIndex">{`0${index + 1}`}</span>

                <User user={article.author} size="thumbnail" />
              </CardHeader>
              <CardBody className="py-2">
                <CardTitle tag="h4" className={className}>
                  {article.title}
                </CardTitle>
                {thumbnail ? null : (
                  <CardSubtitle tag="p" className="text-muted">
                    {article.subtitle}
                  </CardSubtitle>
                )}
                <CardText>
                  <small className="text-muted">
                    {moment(article.publishedDate).format("MMM DD")} .{" "}
                    {moment(article.publishedDate).fromNow()}
                  </small>
                </CardText>
              </CardBody>
            </Col>

            {thumbnail ? null : (
              <Col xs={6} sm={4}>
                <CardImg src={article.img} alt={article.title} />
              </Col>
            )}
          </Row>
        </Card>
      </Link>
    </>
  )
}
