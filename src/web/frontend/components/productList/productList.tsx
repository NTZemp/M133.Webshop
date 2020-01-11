import React from 'react'
import { ProductListProps } from './productListProps';



export default class ProductList extends React.Component<ProductListProps>
{
    constructor(props:any){
        super(props);
    }
    render(){
        return (
            this.props.products.map(function(d, i){
                return (<li key={i}>{d.name}</li>)
            })
        )
    }
}
