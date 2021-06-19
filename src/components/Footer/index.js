import React from 'react'
import {Navbar, Container, Col} from 'react-bootstrap'
import './footer.css'

function index() {
    return (
        <>
            <Navbar fixed='bottom'  varient='dark' className='background'>
                <Container>
                    <Col lg={12} className='text-center'>
                        <div>
                            All rights received by Election Commission of Sri Lanka
                        </div>
                    </Col>
                </Container>
            </Navbar>
        </>
    )
}

export default index
