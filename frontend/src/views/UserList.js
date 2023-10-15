import { getUserListRequest } from "helpers/QueryMaker";
import React, { useEffect, useRef, useState } from "react";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Nav,
  NavLink,
} from "react-bootstrap";
import { useSelector } from "react-redux";

function UserList() {
  const currentUser = useSelector((state) => state.user)
  const [userList, setUserList] = useState([])
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
  const [search, setSearch] = useState('')
  let timer = useRef()

  const getFilteredUser = (page) => {
    getUserListRequest((data) => {
      setMeta(data.data.meta)
      setUserList(data.data.data)
    }, currentUser.token, page, search)
  }

  const getNextPage = () => {
    if (meta.current_page < meta.last_page) {
      getFilteredUser(meta.current_page + 1)
    }
  }

  const getPrevPage = () => {
    if (meta.current_page > 1) {
      getFilteredUser(meta.current_page - 1)
    }
  }

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      getFilteredUser(1)
    }, 1000)
  }, [search])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Eshop User List</Card.Title>
                <div className="row">
                  <div className="col-6">
                    <input type="search" placeholder="search a user " onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <div className="col-2 py-4">
                    <span className=""> Page: {meta?.current_page || 1}/{meta?.last_page || 1}</span>
                  </div>
                  <div className="col-4 row">
                  <button className="btn btn-outline-primary col-5 mr-2" onClick={getPrevPage} disabled={meta?.current_page <=1 }> Prev </button>
                    <button className="btn btn-outline-danger col-5 " onClick={getNextPage} disabled={meta?.current_page >= meta?.last_page }>Next</button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, key) =>
                      <tr key={user?.id}>
                        <td >{key + 1}</td>
                        <td>{user?.first_name} {user?.last_name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.phone_number}</td>
                        <td><NavLink href={`/admin/user/${user?.id}/purchase`}><i className="fa fa-eye"></i></NavLink></td>
                      </tr>
                    )}


                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default UserList;
