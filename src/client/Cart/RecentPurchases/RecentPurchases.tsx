import React, { useEffect } from 'react';
import { Wrapper } from './RecentPurchases.styles';
import axios from 'axios';
import { CartItemType } from '../../App';

type Props = {
    purchases: CartItemType[],
    setPurchases: React.Dispatch<React.SetStateAction<CartItemType[]>>,
    purchasedItems: CartItemType[],
    setPurchasedItems: React.Dispatch<React.SetStateAction<CartItemType[]>>,
};

const RecentPurchases: React.FC<Props> = (props) => {
    const { purchases, setPurchases, setPurchasedItems, purchasedItems } = props

    const route = 'http://localhost:3000/api/purchases';

    useEffect(() => {
        axios.get(route).then(response => setPurchases(response.data));
        setPurchasedItems(purchases);
    }, []);

    /**
     * Returns the array that contains the json objects of all purchased items
     *
     * @param {any} purchases Object that contains all recent purchases json
     * @returns an array that contains the objects
     * 
    */
    function storeInArray(purchases: any): string[] {
        let purchasedItems: string[] = [];
        var counter = 1;
        if (counter !== 0) {
            for (var i = 0; i < purchases.length; i++) {
                for (var j = 0; j < purchases[i].cartItems.length; j++) {
                    purchasedItems.unshift(purchases[i].cartItems[j]);
                    counter = counter - 1;
                }
            }
        }
        return purchasedItems;
    }

    const boughtItems = storeInArray(purchases);

    return (
        <Wrapper>
            <h1>Recent Purchases</h1>
            {boughtItems.map((item: any) =>
                <h5>{item.amount}x {item.title}</h5>)}
        </Wrapper>
    )
}

export default RecentPurchases
