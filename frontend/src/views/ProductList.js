import { getProductsListRequest } from "helpers/QueryMaker";
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

function ProductsList() {
  const currentUser = useSelector((state) => state.user)
  const [userList, setProductsList] = useState([])
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
  const [search, setSearch] = useState('')
  let timer = useRef()

  const getFilteredUser = (page) => {
    getProductsListRequest((data) => {
      setMeta(data.data.meta)
      setProductsList(data.data.data)
    }, page, search)
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
                <Card.Title as="h4">Eshop Product List</Card.Title>
                <div className="row">
                  <div className="col-6">
                    <input type="search" placeholder="search a product " onChange={(e) => setSearch(e.target.value)} />
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
                      <th className="border-0">Price</th>
                      <th className="border-0">Manufacturer Address</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((product, key) =>
                      <tr key={product?.id}>
                        <td >{key + 1}</td>
                        <td>{product?.name}</td>
                        <td>{product?.price} $</td>
                        <td>{product?.manufacturer?.address}</td>
                        <td><NavLink href={`/admin/product/${product?.id}`}><i className="fa fa-eye"></i></NavLink></td>
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

export default ProductsList;
