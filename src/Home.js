import React from 'react'
import './Home.css';
import Product from './Product';
export default function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_image" src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Superhero_UK_Acquisition_FT_Apr_20/7a2ef2c8-d54c-4da8-beba-f4e12a0f10d5._UR1280,600_SX1500_FMjpg_.jpg" alt="HomeImage" />
            <div className="home_row">
                 <Product id="111" 
                 title="The lean startup - Eric Ries" 
                 price={29.99} 
                 image= "https://images-na.ssl-images-amazon.com/images/I/41Ag4WE7uyL._AC_UL160_.jpg"
                 rating = {5} />

                 <Product id="112"
                 title="The Intelligent Investor- The Definitive book on investing" 
                 price={20.99} 
                 image= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4xGmGi3lYH8XXGTGPwN5zb10iEePIg4u1w&usqp=CAU"
                 rating = {4} />

            </div>
            <div className="home_row">
            <Product id="113" 
            title="Baking Mixer- Stand Mixer and Beater 3" 
                 price={15.55} 
                 image= "https://images-na.ssl-images-amazon.com/images/I/611mZWlZjrL._AC_SL1500_.jpg"
                 rating = {4} />
            <Product id="114"
            title="Mobile cover- Solimo Mobile Cover ( Svmsung Galaxy)" 
                 price={10.99} 
                 image= "https://images-na.ssl-images-amazon.com/images/I/61bDDFBEv2L._AC_SL1100_.jpg"
                 rating = {3} />
            <Product id="115"
            title="WOW Skin Science Apple Cider Vinegar Foaming Face Wash" 
                 price={2.99} 
                 image= "https://images-static.nykaa.com/media/catalog/product/1/4/14780288904311901679__1_.jpg"
                 rating = {4} />
            

            </div>
            <div className="home_row">
            <Product id="116"
            title="Svmsung Galaxy S7 TV" 
                 price={100.99} 
                 image= "https://www.mobilefun.co.uk/blog/wp-content/uploads/2016/03/tv.jpg"
                 rating = {4} />

            </div>
            </div>
        </div>
    )
}
