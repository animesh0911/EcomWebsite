import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;


function Recommendations(props) {
    const [Products, setProducts] = useState([])
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        Axios.get('/api/product/getProductRecommendations')
        .then(response => {
            setProducts(response.data.products)
            console.log(response.data.success)
        })
    }, [])

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`Rs.${product.price}`}
                />
            </Card>
        </Col>
    })


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Recommended for you  <Icon type="rocket" />  </h2>
            </div>
            <br /><br />
            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />
        </div>
    )
}

export default Recommendations
