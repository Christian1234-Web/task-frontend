import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { API_URL } from "../../lib/constants";

function ViewReceipt() {
    let [order, setOrder] = useState([]);
    let [name, setName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [quantity, setQuantity] = useState("");
    let [image, setImage] = useState("");
    let [description, setDescription] = useState("");
    let [proId, setProId] = useState(null);
    let [color, setColor] = useState('');
    let [size, setSize] = useState('');
    let [open, setOpen] = useState(false);
    let btnHide = useRef();
    let btnShow = useRef();

    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = () => {
        let url = `${API_URL}/order`;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setOrder(result);
                // alert('working...')
            });
    }



    return (
        <>
            <section className="">
                <div className="adminViewPro" ref={btnShow} style={{ display: 'block' }}>

                   {order.map((e,i)=>{
                       return(
                   <div style={{border:"1px solid gray",padding:"5px",marginBottom:"5px"}}>
                   <h1 className="fs-5">Receipt</h1>
                            <div className='row'>
                 <div className="col-md-6 col-sm-12 p-md-2 p-sm-3">
                 <img src={`${API_URL}${e.product_id.image}`} alt="img"/>
                 </div>
                 <div className="col-md-6 col-sm-12 p-md-2 p-sm-3">
                 <h1 className="fs-5">Product: {e.product_id.name} </h1>
                 <div>User: {e.user_id.name}</div>
                 <div>Description: {e.product_id.description}</div>
                 <div>category: {e.product_id.category}</div>
                 <div>Color:{e.product_id.color}</div>
                 <div>Size: {e.product_id.size}</div>
                 <div>Date: {e.createdAt}</div>
                  <div>Is Paid: true</div>
                <div style={{color:"red"}}>Price: ${e.product_id.price}</div>
                 <Button  className="mt-3" variant="success"> Print Receipt </Button>
                 </div>
                 </div>
                   </div>
                       )
                   })}
                </div>


            </section>
        </>
    )
};
export default ViewReceipt;