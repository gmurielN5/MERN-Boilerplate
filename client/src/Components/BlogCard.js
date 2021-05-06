import React from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import { deletePost } from "../Services/ContentService";
import Avatar from "../Components/Avatar";
import moment from "moment";

const BlogCard = ({ article, user, dispatch }) => {
  return (
    <>
      <Card className="my-5 border-0">
        {article.author._id === user.id ? (
          <Row className="border-bottom pb-3">
            <Col md={8}>
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
            <Col md={4}>
              <Link to={`/post/${user.username}/${article._id}`}>
                <Button color="light">Edit</Button>
              </Link>
              <Button
                color="light"
                onClick={() => deletePost(user.username, article._id, dispatch)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ) : (
          <Link to={`/post/${article.author.username}/${article._id}`}>
            <Row className="pb-3">
              <Col md={8}>
                <CardHeader className="bg-transparent border-0">
                  {!article.author ? null : (
                    <Row className="align-items-baseline">
                      <Col xs={2}>
                        <Avatar user={article.author} />
                      </Col>
                      <Col xs={10} className="pl-0 justify-content-start">
                        <h4>{article.author.username}</h4>
                      </Col>
                    </Row>
                  )}
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
          </Link>
        )}
      </Card>
    </>
  );
};

export default BlogCard;
