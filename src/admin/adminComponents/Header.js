import React,{useContext,useState} from 'react'
import { Link,useHistory } from 'react-router-dom';
import { Store } from '../../context/store';
import ImageOne from '../../assets/images/first-slider-1.jpg';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { API_URL } from "../../lib/constants";


function Header(props) {
    let store = useContext(Store)
    let [note, setNote] = store.data;
    let history = useHistory();
    let [cookie,removeCookie] = useCookies(['adminEmail', 'adminUser', 'adminName','adminImage']);


let handleLogOut = async () => {
        let url = `${API_URL}/user/` + cookie.adminUser;
        let data = {active:false };
        if (window.confirm('Are you sure, you want to LogOut?')) {
            await axios.put(url, data).data;
             removeCookie('adminImage', { path: '/' });
             removeCookie('adminName', { path: '/' });
             removeCookie('adminUser', { path: '/' });
             removeCookie('adminEamil', { path: '/' });
            history.push("/admin/login")
        }
    };
    return (
        <>
            <section className="adminHeader">
                <div className="adminHdCnt">
                    <div className='text-center'>
                        <img src={cookie.image} className='img-thumbnail" mt-2 rounded-circle'
                        style={{width:"80%",border:"3px solid gray"}}    alt='img' />
                        <div>{cookie.adminName}</div>
                        <div>{cookie.adminEmail}</div>
                    </div>
                    <div id='scrollAd'>
                    <li>
                        <Link  onClick={()=> props.viewAllProducts()}>All Cakes</Link>
                    </li>
                    <li>
                        <Link onClick={()=> props.viewCreateProduct()}>Create Cake</Link>
                    </li>
                    <li>
                        <Link  onClick={()=> props.viewAllUsers()}>All Users</Link>
                    </li>
                    <li>
                        <Link  onClick={()=> props.viewCreateUser()}>Create User</Link>
                        </li>
                        <li>
                        <Link  onClick={()=> props.viewOrder()}>View Orders</Link>
                    </li> <li>
                        <Link  onClick={()=> props.viewReceipt()}>View Receipt</Link>
                    </li>
                    <li>
                        <Link  onClick={()=> handleLogOut()}>Logout</Link>
                    </li>
                    </div>

           </div>

            </section>


            </>
    )
}
export default Header;