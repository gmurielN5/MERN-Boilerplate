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
} from "reactstrap"
import { User } from "./Nav/User"
import moment from "moment"

export const TrendingPost = ({ article, index }) => {
  return (
    <>
      <Link to={`/post/${article.author.username}/${article._id}`}>
        <Card className="mb-5 border-0">
          <Row className="align-items-center">
            <Col sm={8}>
              <CardHeader className="bg-transparent border-0">
                <span className="opacityIndex">{`0${index + 1}`}</span>

                <User user={article.author} size="thumbnail" />
              </CardHeader>
              <CardBody>
                <CardTitle tag="h5">{article.title}</CardTitle>
                <CardText tag="p" className="mb-2">
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
              <Col sm={4}>
                <CardImg
                  src={article.img}
                  alt={article.title}
                  className="img"
                />
              </Col>
            )}
          </Row>
        </Card>
      </Link>
    </>
  )
}
