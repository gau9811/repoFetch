import React, { useState, useEffect } from 'react'
import { Table, Button, InputGroup, Input } from 'reactstrap'
import GetApi from '../helper/GetApi'
const ListOfUsers = () => {
  const [listOfDatas, setListOfData] = useState([])
  const [singleUserData, setSingleUserData] = useState({})
  const [check, setCheck] = useState(false)

  // Getting Data from Users api
  // Method - Get
  useEffect(async () => {
    let data = await GetApi('https://api.github.com/users')
    if (data && data.length > 0) {
      setListOfData(data)
    }
  }, [])

  // Changing Data Based on the user Input
  // Method - GET
  const handleChange = async (e) => {
    const { value } = e.target

    let data = await GetApi(`https://api.github.com/users/${value}`)

    // setting data based on the user profile is present or not
    if (data && !data.message) {
      setSingleUserData(data)
      setCheck(true)
    } else {
      setSingleUserData({})
      setCheck(false)
    }
  }

  return (
    <div className="text text-center">
      <div className="bg-dark">
        <p className="h1 font-weight-bold mt-5 p-2  text-white">Github Users</p>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="mb-2 w-50 text text-center">
          <Input
            placeholder="Search By username"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>UserName</th>
            <th>Profile & Repositories</th>
            <th>Profiles </th>
          </tr>
        </thead>

        {singleUserData && check ? (
          <tbody>
            <tr>
              <th scope="row">
                <img
                  src={singleUserData.avatar_url}
                  height="100"
                  width="100"
                  className="rounded-circle"
                />
              </th>
              <td>{singleUserData.login}</td>
              <td>
                <a href={`/${singleUserData.login}`}>{singleUserData.login}</a>
              </td>
              <td>
                <a href={singleUserData.html_url}>
                  <Button>Profile</Button>
                </a>
              </td>
            </tr>
          </tbody>
        ) : (
          listOfDatas &&
          listOfDatas.length > 0 &&
          listOfDatas.map((item) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">
                    <img
                      src={item.avatar_url}
                      height="100"
                      width="100"
                      className="rounded-circle"
                    />
                  </th>
                  <td className="pt-5">{item.login}</td>
                  <td className="pt-5">
                    <a href={`/${item.login}`}>{item.login}</a>
                  </td>
                  <td className="pt-5">
                    <a href={item.html_url}>
                      <Button>Profile</Button>
                    </a>
                  </td>
                </tr>
              </tbody>
            )
          })
        )}
      </Table>
    </div>
  )
}

export default ListOfUsers
