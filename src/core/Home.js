/import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import "../styles.css";
import styled from 'styled-components';

const Home = () => {    

    const showTop = () => (
        <div className="container-fluid bg-dark py-4"> 
            <h1 className="d-flex justify-content-center">IT'S TRUE, WE LOVE BEAUTY. </h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 mt-4 text-center text-light">
                        <img className="card-img-top" src="/img/icon-star.png" alt="Card" style={{ width: "3rem" }}></img><br/>
                        With over 300,000+ makeup applications to date, 
                        our’s Expert Makeup Artists are uniquely qualified to deliver the best of the best in beauty.
                    </div>
                    <div className="col-md-3 mt-4 text-center text-light">
                        <img className="card-img-top " src="/img/icon-brushes.png" alt="Card" style={{ width: "3rem" }}></img><br/>
                        We hand select and test every product mostly 
                        sourced from female-founded brands like Jouer and Tata Harper, so you can shop with ease and confidence                         
                    </div>
                    <div className="col-md-3 mt-4 text-center text-light">
                        <img className="card-img-top " src="/img/icon-bag.png" alt="Card" style={{ width: "3rem" }}></img><br/>
                        Want the Jane's Salon experience? No problem, we have locations in Oradea, 
                        Stei and Beius. Not near a our location? No problem, shop our edit online.                     
                    </div>                    
                </div>
                <div className="d-flex justify-content-center mt-4">
                        <img className="img-container card-img-top " src="/img/feeling.png" alt="Card" style={{ width: "30rem" }}></img>                                          
                </div>                
        </div>
    )

    const showMiddle = () => (
        <div className="container-fluid row d-flex justify-content-center">                
        <div className="card mr-4">         
            <div className="img-container" >                
                    <img src="img/Coafura-de-seara3-1.jpg" alt="product" className="card-img-top" style={{ width: "20rem" }}/> 
                    <Link to="/create/order"><button className="cart-btn">Book Now</button></Link>
            </div>            
            <div className="card-footer d-flex justify-content-between">
                <p className="align-self-center mb-0">Dry Hairstyling-Custom</p>
                <h6 className="text-blue font-italic mb-0">
                <span className="mr-1">by</span>Jane 
                </h6>                
            </div>
        </div>
        <div className="card mr-4">         
            <div className="img-container " >                
                    <img src="img/tuns-in-scari.jpg" alt="product" className="card-img-top" style={{ width: "20rem" }}/> 
                    <Link to="/create/order"><button className="cart-btn">Book Now</button></Link>
            </div>            
            <div className="card-footer d-flex justify-content-between">
                <p className="align-self-center mb-0">Dry Hairstyling-Stairs </p>
                <h6 className="text-blue font-italic mb-0">
                <span className="mr-1">by</span>Tom 
                </h6>                
            </div>
        </div>
        <div className="card">         
            <div className="img-container " >                
                    <img src="img/IMG_2766-1024x683.jpg" alt="product" className="card-img-top" style={{ width: "20rem" }}/> 
                    <Link to="/create/order"><button className="cart-btn">Book Now</button></Link>
            </div>            
            <div className="card-footer d-flex justify-content-between">
                <p className="align-self-center mb-0">Dry Hairstyling-Wavy </p>
                <h6 className="text-blue font-italic mb-0">
                <span className="mr-1">by</span>Jane 
                </h6>                
            </div>
        </div>
        </div>
        )

    const showJane = () => (
        <div className="container-fluid mt-5">
            <div className="row d-flex justify-content-between " style={{background: "#f3f3f3"}}>
                    <div className="col-md-6 mt-4 text-center text-muted ">                        
                        <h1>Jane Colette</h1>
                        "Ever since I met with Karen about my hair I was hooked. It's not just this miracle hair cream or product. 
                        It's about authentic, specialized hair treatment that comes from a deeper care than just putting some goop on it. 
                        Karen's products of course are of the best quality you can get (even edible) and handmade with powerful intention. 
                        ach small batch of any and all of her products are unique and adds to a ritual of living to our inner goddess and 
                        divine feminine (or masculine) power."
                    </div>                   
                    <div className="col-md-6  text-center bg-white text-light">
                        <img className="card-img-top " src="/img/Jane_720x.jpg" alt="Card" style={{with: "10rem"}}></img><br/>                                            
                    </div>                    
                </div>
        </div>
        )
    const showBootom = () => (
        <div>
            <div className="mt-5">
                 <div className="shape overflow-hidden text-footer">
                    <svg viewBox="0 0 2880 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M720 125L2160 0H2880V250H0V125H720Z" fill="#292b2c"></path>
                    </svg>
                </div>
            </div>
            <div >    
             <footer className="TextStyle" style={{background: "#292b2c"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                         <h4 className="text-light footer-head">Our Locations</h4>
                            <ul className="list-unstyled footer-list mt-4">
                                <li><a href="/" className="text-foot text-light"> Oradea, str. Doina, nr. 36</a></li>
                                <li><a href="/" className="text-foot text-light"> Beius, str. A. Saguna, nr.5</a></li>
                                <li><a href="/" className="text-foot text-light"> SStei, str. Unirii, nr 23</a></li>                                                   
                            </ul>  
                        </div>
                        <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <h4 className="text-light footer-head">Company</h4>
                            <ul className="list-unstyled footer-list mt-4">
                                <li><a href="/" className="text-foot text-light"> About us</a></li>
                                <li><a href="/" className="text-foot text-light"> FAQ</a></li>
                                <li><a href="/" className="text-foot text-light"> Services</a></li>                                                   
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <h4 className="text-light footer-head">Useful Links</h4>
                            <ul className="list-unstyled footer-list mt-4">
                                <li><a href="/" className="text-foot text-light"> Terms of Services</a></li>
                                <li><a href="/" className="text-foot text-light"> Privacy Policy</a></li>
                                <li><a href="/" className="text-foot text-light"> Login</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <h4 className="text-light footer-head">Contact</h4>
                            <ul className="list-unstyled footer-list mt-4 text-light">
                                <li> Support Phone: 0770 000 000</li>
                                <li> Marketing Phone: 0770 000 000</li>
                                <li>Email: janesalon@gmail.com</li>
                                <li> Primary Address: Oradea, str. Doina, nr. 23</li>
                            </ul>               
                        </div>
                    </div>
                </div>   
            </footer>
</div>
        </div>
        )
    return (
        <Layout
            title="Jane's Salon"
            description="Hair Style Salon"            
        >
            <div className="main main-raised TextStyle"> 
            <ProductWrapper>
              {showTop()} 
              <h1 className="d-flex justify-content-center py-4 mt-4">Some of our services </h1>
              <br/>{showMiddle()}  
              <br/>{showBootom()}
            </ProductWrapper>
            </div>        
        </Layout>
    );
};

const ProductWrapper = styled.div`
    .card{
        border-color:transparent;
        transition:all 1s linear;
    }
    .card-footer{
        background: transparent;
        border-top: transparent;
        transition:all 1s linear;
    }
    &:hover{
        .card{
            border:0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer{
            background:rgba(247,247,247);
        }
        
    }
    .img-container{
        position:relative;
        overflow:hidden;
    }
    .card-img-top{
        transition: all 1s linear;
    }
    .img-container:hover .card-img-top{
        transform:scale(1.2);
    }
    .cart-btn{
        position:absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition:all 1s linear;
    }
    .img-container:hover .cart-btn{ 
        transform: translate(0, 0); 
        
    }
    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }

    .addButton {
  text-transform:capitalize;
  font-size:1.2rem;
  background: transparent;
  border:0.05rem solid var(--lightBlue);
  border-color: var(--lightBlue);
  color: var(--lightBlue);
  border-radius:0.5rem;
  pading: 0.2rem 0.5rem;
  cursor:pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover{
    background: var(--lightBlue);
    color:var(--mainWhite);
  }
  &:focus{
    outline:none;
  }
    }
`;

export default Home;