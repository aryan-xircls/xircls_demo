/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import wp_back from './imgs/wp_back.png'
import { useParams } from 'react-router-dom'
import { getReq, postReq } from '../../../assets/auth/jwtService'
import { CheckCircle, X } from 'react-feather'
import toast from 'react-hot-toast'
import FrontBaseLoader from '../../Components/Loader/Loader'

export default function CatalogueView() {
    const { id } = useParams()
    const [useLoader, setLoader] = useState(false)
    const [useProducts, setProducts] = useState([])
    const [useSelectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        setLoader(true)
        getReq("catalog_details", `?catalog_id=${id}`)
            .then((resp) => {
                console.log("resp :", resp.data.products)
                setProducts(resp.data.products)
                const retailerIds = resp.data.products.map((elm) => elm.retailer_id)
                setSelectedProducts(retailerIds)
            }).catch((err) => {
                console.log(err)
            }).finally(() => { setLoader(false) })
    }, [])

    const sendTemplate = () => {
        // console.log("USE PTODUCTS", useSelectedProducts)
        if (useSelectedProducts.length === 0) {
            return toast.error("Atleast select one product!")
        }
        const formData = new FormData()
        formData.append("catalog_id", id)
        const newPro = useSelectedProducts.map((elm) => {
            return { product_retailer_id: elm }
        })
        console.log(newPro)
        formData.append("product_items", JSON.stringify(newPro))
        setLoader(true)
        postReq(`send_catalog`, formData)
          .then(res => {
            // console.log('res:', res)
            if (res.data.messaging_product) {
              toast.success("Message has been sent!")
            } else {
              toast.error("Something went wrong")
            }
          })
          .catch(error => {
            console.error('Error:', error)
            toast.error("Server Error!")
          }).finally(() => { setLoader(false) })
    }

    const uptSelect = (id, action) => {
        let newSelect = useSelectedProducts
        if (action === "DEL") {
            newSelect = newSelect.filter((elm) => elm !== id)
        } 
        if (action === "ADD") {
            // newSelect = newSelect.push(id)
            newSelect = [...newSelect, id]
        } 
       setSelectedProducts(newSelect)
    }

    return (
        <>
          {
        useLoader && <FrontBaseLoader />
      }
            <Card className=''>

                <CardBody className='d-flex justify-content-between align-items-center '>
                    <div>
                    <h4 className='m-0'>Select Templates </h4>
                    <h6 className='m-0'>Total Selected : {useSelectedProducts.length}</h6>

                    </div>

                    <button className='btn btn-primary ' onClick={sendTemplate}>Send Catalogue</button>

                </CardBody>
            </Card>
            <Card className='mb-5'>
                <CardBody className='mb-5'>

                    <Row>

                        {
                            useProducts.map((data, index) => {
                                return (
                                    <Col md="4" key={index} >
                                        <Card className='position-relative ' style={{ boxShadow: "0px 6px 17px rgba(0,0,0,0.1)" }}>
                                            <CardBody className="border-1  p-0 rounded-2  " style={{ boxShadow: "0px 6px 17px rgba(0,0,0,0.1)", minHeight: "350px" }} >
                                                <div className='p-1' >

                                                    <div className=''  >
                                                        <img className='rounded-3 img-fluid border-0 rounded w-100 object-fit-cover ' src={data.image_url} alt="" />
                                                    </div>

                                                    <div className='mt-1' >
                                                        <div className='d-flex justify-content-between '>
                                                            <h5>{data.name}</h5>
                                                            <h5>{data.price}</h5>
                                                        </div>
                                                        <small>{data.description.slice(0, 80)}...</small>
                                                        <h6 className='fs-6'>{data.brand}</h6>
                                                    </div>
                                                    {
                                                        useSelectedProducts.includes(data.retailer_id) ?  <button onClick={() => uptSelect(data.retailer_id, "DEL")} className='btn btn-primary btn-sm position-absolute bottom-0 end-0 mb-1 me-1'>Unselect</button> : <button onClick={() => uptSelect(data.retailer_id, "ADD")} className='btn btn-primary btn-sm position-absolute bottom-0 end-0 mb-1 me-1'>Select</button> 
                                                    }
                                                    {
                                                       useSelectedProducts.includes(data.retailer_id) ? <div className=' position-absolute top-0 end-0 mt-1 me-1 '>
                                                        <div className='d-flex  px-1 bg-success text-white rounded-2' style={{ padding: "5px", gap: "5px" }}>
                                                            <CheckCircle size={13} />
                                                            <h6 className='m-0 text-white  font-small-3 ' >Selected</h6>
                                                        </div>
                                                    </div> : <div className=' position-absolute top-0 end-0 mt-1 me-1 '>
                                                            <div className='d-flex  px-1 bg-secondary text-white rounded-2' style={{ padding: "5px", gap: "5px" }}>
                                                                <X size={13} />
                                                                <h6 className='m-0 text-white  font-small-3' >Not Selected</h6>
                                                            </div>
                                                        </div>
                                                        
                                                    }
                                                </div>


                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>

                </CardBody>
            </Card>
        </>
    )
}
