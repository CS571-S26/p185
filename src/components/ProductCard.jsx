import React from 'react';
import {Card, Button, Badge, Stack} from 'react-bootstrap';
import {GiWrappedSweet} from "react-icons/gi";

const ProductCard = ({product}) => {
    // ex: { id, name, brand, price, image, isGelato, flavorProfile: { sweetness, nuts } }

    const {name, brand, price, image, flavorProfile, promotions} = product;
    const sweetnessLevel = flavorProfile?.sweetness || 1;

    return (<Card className="h-100 border-0 shadow-sm product-card-hover">
        <div className="position-relative overflow-hidden">
            {/* promotions */}
            {promotions && (<Badge
                bg="danger"
                className="position-absolute"
                style={{top: '15px', right: '15px', zIndex: 1}}
            >
                {promotions}
            </Badge>)}

            <Card.Img
                variant="top"
                src={image || "https://dummyimage.com/300x300&text=No+Image"}
                className="p-3 rounded-5 img-fluid transition-transform"
                style={{height: '250px', objectFit: 'contain'}}
            />
        </div>

        <Card.Body className="d-flex flex-column pt-0">
            <Stack direction="horizontal" gap={2} className="mb-2">
                <Badge pill bg="light" text="dark" className="border">
                    {brand}
                </Badge>
                {flavorProfile?.isGelato && (<Badge pill bg="info" text="white">Gelato</Badge>)}
            </Stack>

            <Card.Title className="fs-6 fw-bold mb-1">{name}</Card.Title>

            {/* Summary */}
            <div className="mb-3">
                <small className="text-muted d-block">
                    <div className="sweetness-icons" style={{color: '#ff6b6b'}}>
                        {[...Array(sweetnessLevel)].map((_, i) => (
                            <GiWrappedSweet key={i} size={18} className="me-1"/>))}
                        {/*{[...Array(5 - sweetnessLevel)].map((_, i) => (*/}
                        {/*    <GiWrappedSweet key={i + 5} size={18} className="me-1 text-dark" />*/}
                        {/*))}*/}
                    </div>
                </small>
            </div>

            <div className="mt-auto d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bold text-dark">${price.toFixed(2)}</span>
                <Button variant="danger" size="sm" className="fw-bold px-3">Add</Button>
            </div>
        </Card.Body>
    </Card>);
};

export default ProductCard;
