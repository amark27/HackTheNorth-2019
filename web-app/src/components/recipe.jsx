import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import RecipeList from './recipeComponents/recipeList.jsx';

class Recipe extends Component {
    
    constructor(){
        super();
        this.state = { foodItems: [], foodItemsNoDupe: [], redirect: false }
    }
    
    handleChange = (event) => {
        let tempArr = this.state.foodItems;
        tempArr[parseInt(event.target.name[event.target.name.length-1])] = event.target.value;
        this.setState({foodItems: tempArr}); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        let inputs = new Set(this.state.foodItems);
        console.log(inputs);
        let inputsNoDupe = Array.from(inputs);
        console.log(inputsNoDupe);
        this.setState({foodItemsNoDupe: inputsNoDupe, redirect: true});
    }

    render() { 
        if (!this.state.redirect)
            return ( 
                <div className="container custom-container">
                    <h1>Recipes</h1>
                    <p>Enter up to 5 items in your fridge to generate a recipe you can make with those items.</p>
                    <form autoComplete="off" className="root" onSubmit={this.handleSubmit}>
                        <FormControl style={{'width': '100px'}}>
                            <InputLabel htmlFor="item1">Food Item 1</InputLabel>
                            <Select
                            value={this.state.foodItems[0]}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "Food Item 0",
                                id: 'item0'
                            }}>
                                {!!(this.props.objects) ? this.props.objects.map((item) => {
                                    return (<MenuItem value={item.name}>{item.name}</MenuItem>);
                                }) : ""}
                            </Select>
                        </FormControl>
                        <br></br><br></br>
                        <FormControl style={{'width': '100px'}}>
                            <InputLabel htmlFor="item1">Food Item 2</InputLabel>
                            <Select
                            value={this.state.foodItems[1]}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "Food Item 1",
                                id: 'item1'
                            }}>
                                {!!(this.props.objects) ? this.props.objects.map((item) => {
                                    return (<MenuItem value={item.name}>{item.name}</MenuItem>);
                                }) : ""}
                            </Select>
                        </FormControl>
                        <br></br><br></br>
                        <FormControl style={{'width': '100px'}}>
                            <InputLabel htmlFor="item1">Food Item 3</InputLabel>
                            <Select
                            value={this.state.foodItems[2]}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "Food Item 2",
                                id: 'item2'
                            }}>
                                {!!(this.props.objects) ? this.props.objects.map((item) => {
                                    return (<MenuItem value={item.name}>{item.name}</MenuItem>);
                                }) : ""}
                            </Select>
                        </FormControl>
                        <br></br><br></br>
                        <FormControl style={{'width': '100px'}}>
                            <InputLabel htmlFor="item1">Food Item 4</InputLabel>
                            <Select
                            value={this.state.foodItems[3]}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "Food Item 3",
                                id: 'item3'
                            }}>
                                {!!(this.props.objects) ? this.props.objects.map((item) => {
                                    return (<MenuItem value={item.name}>{item.name}</MenuItem>);
                                }) : ""}
                            </Select>
                        </FormControl>
                        <br></br><br></br>
                        <FormControl style={{'width': '100px'}}>
                            <InputLabel htmlFor="item1">Food Item 5</InputLabel>
                            <Select
                            value={this.state.foodItems[4]}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "Food Item 4",
                                id: 'item4'
                            }}>
                                {!!(this.props.objects) ? this.props.objects.map((item) => {
                                    return (<MenuItem value={item.name}>{item.name}</MenuItem>);
                                }) : ""}
                            </Select>
                        </FormControl>
                        <br></br><br></br>
                        <FormControl>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </FormControl>
                    </form>
                </div>
            );
        else
            return (<RecipeList ingredients={this.state.foodItemsNoDupe}/>);
    }
}
 
export default Recipe;