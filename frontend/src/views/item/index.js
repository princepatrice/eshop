import { getProductInfo } from "helpers/QueryMaker";
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
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { addCardItem } from "redux/slices/cardSlice";
import { useToasts  } from 'react-toast-notifications';

function ProductInfo() {
    const currentUser = useSelector((state) => state.user.user)
    const { id } = useParams();
    const { addToast } = useToasts();
    const [productInfo, setProductInfo] = useState(null)
    const [nbProduct, setNbProduct] = useState(1)
    const dispatch = useDispatch()
    
    

    const addProduct = () =>{
        dispatch(addCardItem({
            userId:currentUser?.id,
            data: productInfo,
            quantity: nbProduct
        }))
        addToast("The product have been added to the cart", { appearance: 'success' });
        setNbProduct(1)
    }

    useEffect(() => {
        getProductInfo((data) => {
            setProductInfo(data.data)
        }, id)
    }, [id])
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">

                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Product ({productInfo?.name})</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-6">
                                        <img src="https://princetoncryo.com/media/catalog/category/default_product.jpg" className="img-fluid" />
                                    </div>
                                    <div className="col-6 p-5">
                                        <p>
                                            <strong>Name : </strong> {productInfo?.name}
                                        </p>

                                        <p>
                                            <strong>Price : </strong> {productInfo?.price} $
                                        </p>
                                        <p>
                                            <strong> Quantity Available : </strong> {productInfo?.remaining}
                                        </p>

                                        <p>
                                            <strong> Manufacturer Address : </strong> {productInfo?.manufacturer?.address}
                                        </p>
                                        {!currentUser.is_admin && <div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <input type="number" value={nbProduct} min="1"
                                                        max={productInfo?.remaining || 1}
                                                        onChange={(e) => setNbProduct(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-5 m-2">
                                                    <button type="button" onClick={()=> addProduct()} > <i className="fas fa-shopping-cart"></i> Add to card</button>
                                                </div>

                                            </div>
                                        </div>}
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default ProductInfo;
