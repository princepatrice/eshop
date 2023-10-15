import { purchaseProduct } from "helpers/QueryMaker";
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { emptyCard } from "redux/slices/cardSlice";
import { deleteCardItem } from "redux/slices/cardSlice";
import { useToasts } from 'react-toast-notifications';

function CardItems() {
    const history = useHistory();
    const currentUser = useSelector((state) => state.user)
    const cardItems = useSelector((state) => state.card.cardItems[currentUser?.user?.id])
    const dispatch = useDispatch()
    const { addToast } = useToasts();

    const total = cardItems?.reduce((accumulator, item) => {
        return accumulator + (item.price * item.quantity);
    }, 0);

    const deleteUserItem = (id) => {
        dispatch(deleteCardItem({
            userId: currentUser?.user?.id,
            id: id
        }))
    }
    const purchase = () => {
        const listProduct = cardItems?.map((item) => { return { id: item.id, quantity: item.quantity } })
        purchaseProduct((data) => {
            console.log(data)
            if (data.status) {
                dispatch(emptyCard({ userId: currentUser?.user?.id, }))
                addToast("Purchase Done, you will be redirect soon", { appearance: 'success' });
                setTimeout(() => {
                    history.push("/admin/purchase-invoice/" + data?.data?.lot)
                }, 500)
            }
        }, { data: listProduct }, currentUser.token)
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4"> <i className="fa fa-shopping-cart mr-2"> </i>  Card Items</Card.Title>
                                <div className="row">
                                    <div className="col-8 p-4">
                                        <p><strong>Purchase: {total} $</strong></p>
                                    </div>

                                    <div className="col-3 m-2">
                                        <button type="button" disabled={!cardItems?.length} onClick={() => purchase()} > Purchase</button>
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
                                            <th className="border-0">Quantity</th>
                                            <th className="border-0">Total</th>
                                            <th className="border-0" colSpan={2}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cardItems?.map((cardItem, key) =>
                                            <tr key={cardItem?.id}>
                                                <td >{key + 1}</td>
                                                <td>{cardItem?.name}</td>
                                                <td>{cardItem?.price} $</td>
                                                <td>{cardItem?.quantity}</td>
                                                <td>{cardItem?.quantity * cardItem?.price}</td>
                                                <td ><NavLink href={`/admin/product/${cardItem?.id}`}><i className="fa fa-eye"></i></NavLink></td>
                                                <td><NavLink onClick={() => deleteUserItem(cardItem?.id)}><i className="fa fa-trash"></i></NavLink></td>
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

export default CardItems;
