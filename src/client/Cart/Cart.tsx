import { useState } from 'react';
import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

const useStyles = makeStyles({
  button: {
    backgroundColor: 'lightblue',
    color: 'black',
    padding: '10px',
    display: 'block',
    margin: 'auto',
    marginTop: '15px',
    marginBottom: '35px',
    paddingLeft: '25px',
    paddingRight: '25px',
    borderRadius: '25px',
    textTransform: 'none',
    width: '140px',
    border: '2px solid black',
    '&:hover': {
      background: 'white',
    }
  }
});

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const classes = useStyles();
  const [purchasedItem, setPurchasedItem] = useState(false);

  const onSubmit = (cartItems: CartItemType[]) => {
    const url = 'http://localhost:3000/api/purchases';
    axios
      .post(url, { cartItems }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      })
      .then(() => console.log('Purchase made'))
      .catch(err => {
        console.error(err);
      });
  }

  /* Ensures that all the amount of a cheese of the same type are removed from cart */
  function purchaseCheese(amount: number, itemID: number) {
    for (var i: number = 0; i < amount; i++) {
      removeFromCart(itemID);
    }
  }

  const handlePurchase = (cartItems: CartItemType[]) => {
    onSubmit(cartItems);
    cartItems.map((item, index) => purchaseCheese(cartItems[index].amount, item.id));
    setPurchasedItem(true);
  }

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      {purchasedItem === true ?
        <h1>Items Purchased</h1>
        :
        <div>
          <h2>Your Shopping Cart</h2>
          {cartItems.length === 0 ? <p>No items in cart.</p> : null}
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
          <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
          {cartItems.length !== 0 &&
            <Button className={classes.button}
              onClick={() => handlePurchase(cartItems)}
              data-cy='purchase-button'>
              Purchase
            </Button>
          }
        </div>
      }
    </Wrapper >
  );
};

export default Cart;
