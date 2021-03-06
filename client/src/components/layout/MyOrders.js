import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Card, CardActionArea, CardActions, CardContent, makeStyles, Button } from '@material-ui/core'
import { SERVER_URL } from '../../globalConstants';
import { useHistory } from 'react-router-dom'
import OrderModal from './OrderModal';

const useStyles = makeStyles({
	cardMain: {
		minWidth: '300px',
		width:'500px',
		padding: '10px',
		paddingTop: 0,
		marginTop:'5px'
	}
});

function MyOrders() {
	const classes = useStyles();
	let [userOrders, setUserOrders] = useState([])
	let [loading, setLoading] = useState(true)
	let [open, setOpen] = useState(false)
	let [selectedOrderId, setSelectedOrderId] = useState(0)

	useEffect(() => {
		let token = localStorage.getItem('token')

		if (Boolean(token)) {
			axios.post(`${SERVER_URL}/api/order/userOrders`, { token })
				.then(res => {
					console.log(res.data)
					if (res.data.message === 'success') {
						setUserOrders(res.data.orders)
						setLoading(false)
					}
				})
				.catch(err => {
					console.log(err);
					setLoading(false)
				})
		} else {
			//Show Not Looged in
			setLoading(false)
		}
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
				userOrders.map(({ orderId, orderDate, itemcount: itemCount, orderTotal }) => (
						<Card className={classes.cardMain} key={orderId}>
							<CardActionArea>
								<CardContent>
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

export default MyOrders
