import React from "react";
import Layout from "./Layout";
import "../styles.css";

const Home = () => {    

    return (
        <Layout
            title="Jane's Salon"
            description="Hair Style Salon"            
        >
            <div className="main main-raised TextStyle"> 
               <h1 className="d-flex justify-content-center">IT'S TRUE, WE LOVE BEAUTY. </h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 mt-4 text-center text-muted">
                        <img class="card-img-top " src="/img/icon-star.png" alt="Card" style={{ width: "3rem" }}></img><br/>
                        With over 300,000+ makeup applications to date, 
                        our’s Expert Makeup Artists are uniquely qualified to deliver the best of the best in beauty.
                    </div>
                    <div className="col-md-3 mt-4 text-center text-muted">
                        <img class="card-img-top " src="/img/icon-brushes.png" alt="Card" style={{ width: "3rem" }}></img><br/>
                        We hand select and test every product mostly 
                        sourced from female-founded brands like Jouer and Tata Harper, so you can shop with ease and confidence                         
                    </div>
                    <div className="col-md-3 mt-4 text-center text-muted">
                        <img class="card-img-top " src="/img/icon-bag.png" alt="Card" style={{ width: "3rem" }}></img><br/>
                        Want the Salon Name experience? No problem, we have locations in Oradea, 
                        Stei and Beius. Not near a our location? No problem, shop our edit online.                     
                    </div>                    
                </div>
                <div className="d-flex justify-content-center mt-4">
                        <img class="card-img-top " src="/img/feeling.png" alt="Card" style={{ width: "30rem" }}></img>                                          
                </div>
            </div>        
        </Layout>
    );
};

export default Home;