import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Card, CardActionArea, CardActions, CardContent, makeStyles, Button } from '@material-ui/core'
import { SERVER_URL } from '../../../globalConstants';
import OrderModal from '../../Layout/OrderModal';

const useStyles = makeStyles({
	cardMain: {
		minWidth: '300px',
		width:'500px',
		padding: '10px',
		paddingTop: 0,
		marginTop:'5px'
	}
});

function OrderList() {
	const classes = useStyles();
  let [userOrders, setUserOrders] = useState([])
	let [loading, setLoading] = useState(true)
	let [open, setOpen] = useState(false)
	let [selectedOrderId, setSelectedOrderId] = useState(0)

	useEffect(() => {
		axios.get(`${SERVER_URL}/api/order/allOrders?userType=A`)
				.then(res => {
					if (res.data.message === 'success') {
						setUserOrders(res.data.orders)
						setLoading(false)
					}
				})
				.catch(err => {
					console.log(err);
					setLoading(false)
				})
	}, [])

	const toggleModal = (e, orderId = 0) => {
		orderId == 0 ? setOpen(false) : setOpen(true); setSelectedOrderId(orderId)
	}

	return (
		<div style={{margin:'auto'}}>
			{loading ? <div>Getting Cart Info , please wait...</div> : ''}
			{
				userOrders.length == 0 && loading == false ?
					<Typography component='h6' variant='h6'>
						No Items in Cart
          </Typography> : ''
			}
			{
				userOrders.map(({ orderId, orderDate, itemcount: itemCount, orderTotal, 
            customerName, customerEmailId, contactNo }) => (
						<Card className={classes.cardMain} key={orderId}>
							<CardActionArea>
								<CardContent>
                  <h2>{customerName}</h2>
                  <Paper style={{display:'flex',justifyContent:'space-between'}}>
                    <h4>{customerEmailId}</h4> <h4>{contactNo}</h4></Paper>
                  <Paper elevation={0} style={{display:'flex'}}>
                    <h4>Order Date:{orderDate}</h4> 
										<h3 style={{marginLeft: 'auto'}}>Rs.{orderTotal}</h3>
									</Paper>
									<Typography>
										{itemCount} items in order
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button size="small" color="primary" onClick={(e) => toggleModal(e,orderId)}>
									View Order Items 
        				</Button>
							</CardActions>
						</Card>
				))
			}
			<OrderModal open={open} toggleModal={toggleModal} selectedOrderId={selectedOrderId}/>
		</div>
	)
}

export default OrderList
