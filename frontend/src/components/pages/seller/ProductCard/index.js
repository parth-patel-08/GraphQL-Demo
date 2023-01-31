import * as React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useLazyQuery, useMutation } from '@apollo/client';

import { DELETE_PRODUCT } from '../../../../graphql/product/mutations';
import { alert } from '../../../../components/common/AlertMessage';
import { GET_USER } from '../../../../graphql/user/queries';


const ProductCard = ({ product, setEditProductId }) => {
    const userId = useSelector(state => state.user.id)
    const [deleteProduct] = useMutation(DELETE_PRODUCT)
    const [getUser, { refetch: refetchUser }] = useLazyQuery(GET_USER, {
        variables: {
          id: userId,
        },
      })

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct({
                variables: {
                    id: product.id
                }
            })
            refetchUser()
            alert("Product Deleted Successfully", "success")
        } catch (error) {
            console.error(error);
            alert("Error while deleting a product", "error")
        }
    }

    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                title={product.name}
            />
            <CardMedia
                component="img"
                height="194"
                image={product.imageUrl}
                alt={`${product.name} image`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="edit product" onClick={() => setEditProductId(product.id)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete product" onClick={handleDeleteProduct}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ProductCard