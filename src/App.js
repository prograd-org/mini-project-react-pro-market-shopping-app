import React, { Component } from 'react'
import './App.css';
import Fruit from './components/Fruit';
import Header from './components/Header';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      marketData: [],
      type: "all",
      search: ""
    }
  }
  componentDidMount = () => {
    axios.get("https://8d518112-4109-404f-9f57-b8e3c374d098.mock.pstmn.io")
      .then((res) => {
        let fruits = ["Carrot", "Apple", "Watermelon", "Strawberry"]
        let newData = []
        res.data.forEach((item) => {
          let obj = { id: item.id, name: item.name.toLowerCase(), price: item.price, desc: item.description, img: item.img, type: (fruits.includes(item.name)) ? "fruit" : "veg" }
          newData.push(obj)
        })
        this.setState({
          marketData: newData
        })
        console.log(this.state.marketData);
      })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <hr className="line" />
        <div className="bonus">
          <div className="search">
            <input type="text" placeholder="Search fruits or vegetables" onChange={(e) => this.setState({ search: e.target.value })} /><FcSearch />
          </div>
          <div className="filters">
            <button onClick={() => this.setState({ type: "all" })}>All</button>
            <button onClick={() => this.setState({ type: "fruit" })}>Fruits</button>
            <button onClick={() => this.setState({ type: "veg" })}>Vegetables</button>
          </div>
        </div>
        <div className="cont">
          <div className="fruit-cont">
            {
              this.state.type === "all" ?
                this.state.marketData.filter((item) => {
                  return item.name.includes(this.state.search.toLowerCase())
                })
                  .map((item) => {
                    return <Fruit
                      key={item.id}
                      img={item.img}
                      name={item.name}
                      price={item.price}
                      desc={item.desc}
                      id={item.id}
                    />
                  })
                :
                this.state.marketData.filter((item) => {
                  return item.type === this.state.type && item.name.includes(this.state.search.toLowerCase())
                }).map((item) => {
                  return <Fruit
                    key={item.id}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    desc={item.desc}
                  />
                })
            }
          </div>
        </div>
      </div>
    );
  }
}