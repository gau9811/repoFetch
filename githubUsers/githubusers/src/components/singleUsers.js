import React, { useState, useEffect } from 'react'
import GetApi from '../helper/GetApi'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from 'reactstrap'
import load from '../imgAndgifs/load.gif'

const SingleUsers = (params) => {
  const [singleData, setSingleData] = useState([])
  const [singleRepoData, setSingleRepoData] = useState([])

  // Getting Data based on the params
  // method - GET
  useEffect(async () => {
    let userData = await GetApi(
      `https://api.github.com/users/${params.match.params.username}`,
    )
    let repoData = await GetApi(
      `https://api.github.com/users/${params.match.params.username}/repos`,
    )

    // setting Data if the data is comming from an api
    if (userData && repoData) {
      setSingleData(userData)
      setSingleRepoData(repoData)
    }
  }, [])

  return (
    <div className=" d-flex justify-content-center mt-5 ">
      {singleData && singleRepoData.length ? (
        <Row className="ml-5">
          <Col xs="4">
            <div className="text">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={singleData.avatar_url}
                  alt=""
                  height="300"
                  width="100"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">Github UserName</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {singleData.name}
                  </CardSubtitle>
                  <a href={singleData.html_url}>
                    <Button>Github Profile</Button>
                  </a>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col xs="6">
            <div className="mt-1 mb-5">
              <p className="h1 font-weight-bold">Repositories</p>
            </div>
            {singleRepoData &&
              singleRepoData.length >= 0 &&
              singleRepoData.map((item) => {
                return (
                  <Card className="mt-2">
                    <CardBody>
                      <CardTitle tag="h5">Repository Name</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {item.name}
                      </CardSubtitle>
                      <CardText>{item.description}</CardText>
                      <a
                        href={`https://github.com/${params.match.params.username}/${item.name}`}
                      >
                        <Button>Repo Url</Button>
                      </a>
                    </CardBody>
                  </Card>
                )
              })}
          </Col>
        </Row>
      ) : (
        <img src={load} alt="" />
      )}
    </div>
  )
}

export default SingleUsers
