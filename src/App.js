import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }

    handleQty=(id)=>{
        console.log("id",id);
        const elementsIndex = this.state.products.findIndex(element => element.id == id );
        let newArray = [...this.state.products]
        // let newArray2 = [...this.state.cart.items]
        newArray[elementsIndex] = {...newArray[elementsIndex], cartQuantity: 1}
        this.setState({
            products: newArray,
            cart:
            {items:[...this.state.cart.items,newArray[elementsIndex]]
            }
            });
    }

    handleQtyAdd=(id)=>{
        const elementsIndex = this.state.products.findIndex(element => element.id == id );
        let newArray = [...this.state.products]
        newArray[elementsIndex] = {...newArray[elementsIndex], cartQuantity: newArray[elementsIndex].cartQuantity+1}
        const elementsIndex2 = this.state.cart.items.findIndex(element => element.id == id );
        let newArray2 = [...this.state.cart.items]
        if(newArray)
        newArray2[elementsIndex2] = {...newArray2[elementsIndex2], cartQuantity: newArray[elementsIndex].cartQuantity+1}
        this.setState({
            products: newArray,
            cart:
            {items:newArray2
            }
            });
    }

    handleQtyDec=(id)=>{
        const elementsIndex = this.state.products.findIndex(element => element.id == id );
        let newArray = [...this.state.products]
        newArray[elementsIndex] = {...newArray[elementsIndex], cartQuantity: newArray[elementsIndex].cartQuantity-1}
        const elementsIndex2 = this.state.cart.items.findIndex(element => element.id == id );
        let newArray2 = [...this.state.cart.items]
        newArray2[elementsIndex2] = {...newArray2[elementsIndex2], cartQuantity: newArray[elementsIndex].cartQuantity+1}
        this.setState({
            products: newArray,
            cart:
            {items:newArray2
            }
            });
    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} handleQty={this.handleQty} handleQtyAdd={this.handleQtyAdd} handleQtyDec={this.handleQtyDec}/>
                    <Cart cart={this.state.cart}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
