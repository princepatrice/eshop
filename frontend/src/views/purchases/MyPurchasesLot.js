import { getMyPurchaseListByLotRequest } from "helpers/QueryMaker";
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
import { useParams } from "react-router-dom/cjs/react-router-dom";

function MyPurchasesLot() {
  const currentUser = useSelector((state) => state.user)
  const { id } = useParams();
  const [purchaseItemList, setPurchaseList] = useState([])
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
  const [search, setSearch] = useState(id)
  let timer = useRef()

  const getFilteredUser = (page) => {
    getMyPurchaseListByLotRequest((data) => {
      setMeta(data.data.meta)
      setPurchaseList(data.data.data)
      console.log(data)
    }, currentUser.token, page, search)
  }

  const getNextPage = () => {
    if (meta?.current_page < meta?.last_page) {
      getFilteredUser(meta?.current_page + 1)
    }
  }

  const getPrevPage = () => {
    if (meta?.current_page > 1) {
      getFilteredUser(meta?.current_page - 1)
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
                <Card.Title as="h4">Purchase Detail</Card.Title>
                <div className="row">
                  <div className="col-6">
                    <input type="search" placeholder="Lot Id or Tracking Number " defaultValue={search} disabled={!!id} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <div className="col-2 py-4">
                    <span className=""> Page: {meta?.current_page || 1}/{meta?.last_page || 1}</span>
                  </div>
                  <div className="col-4 row">
                    <button className="btn btn-outline-primary col-5 mr-2" onClick={getPrevPage} disabled={meta?.current_page <= 1}> Prev </button>
                    <button className="btn btn-outline-danger col-5 " onClick={getNextPage} disabled={meta?.current_page >= meta?.last_page}>Next</button>
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
                      <th className="border-0">Qt</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">Tracking#</th>
                      <th className="border-0">Lot#</th>
                      <th className="border-0">Date</th>

                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseItemList.map((purchaseItem, key) =>
                      <tr key={purchaseItem?.id}>
                        <td >{key + 1}</td>
                        <td>{purchaseItem?.item_name}</td>
                        <td>{purchaseItem?.item_price} $</td>
                        <td>{purchaseItem?.quantity} </td>
                        <td>{purchaseItem?.quantity * purchaseItem?.item_price}$</td>
                        <td>{purchaseItem?.purchaseHistory.tracking_number}</td>
                        <td>{purchaseItem?.purchaseHistory.purchase_lot}</td>
                        <td>{purchaseItem?.purchaseHistory.purchase_date}</td>
                        <td><NavLink href={`/admin/product/${purchaseItem?.item_id}`}><i className="fa fa-eye"></i></NavLink></td>
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

export default MyPurchasesLot;
