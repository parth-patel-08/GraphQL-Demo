import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, CircularProgress, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useFormik } from "formik"
import * as yup from "yup"
import _ from "lodash"
import { useLazyQuery, useMutation } from "@apollo/client"

import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../../../graphql/product/mutations"
import { alert } from "../../../common/AlertMessage"
import { GET_USER } from "../../../../graphql/user/queries"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
}

const EditProductModal = ({ isOpen, setIsOpen, product }) => {
  const userId = useSelector((state) => state.user.id)

  const [, { refetch: refetchUser }] = useLazyQuery(GET_USER, {
    variables: {
      id: userId,
    },
  })

  const [createProduct, { loading: creatingProduct }] =
    useMutation(CREATE_PRODUCT)
  const [updateProduct, { loading: updatingProduct }] =
    useMutation(UPDATE_PRODUCT)

  const {
    setValues,
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
    },
    onSubmit: async (values) => {
      try {
        if (product) {
          await updateProduct({
            variables: { ...values, id: product.id },
          })
          alert("Product has been updated", "success")
        } else {
          await createProduct({
            variables: values,
          })
          alert("Product has been created", "success")
        }
        refetchUser()
      } catch (error) {
        console.error(error)
        alert("Error while updating product", "error")
      }
      handleReset()
      setIsOpen(false)
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().required("description is required"),
      price: yup.number().required("price is required"),
      imageUrl: yup.string().url().required("Image Url is required"),
    }),
  })

  useEffect(() => {
    if (product) {
      setValues(_.pick(product, ["name", "description", "price", "imageUrl"]))
    }
  }, [product, setValues])

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        handleReset()
        setIsOpen("")
      }}
    >
      <Box sx={style}>
        <div className="text-center text-2xl mb-5">
          {product ? "Edit Product" : "Add Product"}
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              size="small"
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="!mb-3 w-full"
              error={touched.name && !!errors.name}
            />
            <div className="h-6 -mt-2 text-xs text-red-500">
              {touched.name ? errors.name : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              id="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="!mb-3 w-full"
              error={touched.description && !!errors.description}
            />
            <div className="h-6 -mt-2 text-xs text-red-500">
              {touched.description ? errors.description : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              id="price"
              label="Price"
              placeholder="0"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              type="number"
              className="!mb-3 w-full"
              error={touched.price && !!errors.price}
            />
            <div className="h-6 -mt-2 text-xs text-red-500">
              {touched.price ? errors.price : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              id="imageUrl"
              label="Image URL"
              value={values.imageUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              className="!mb-3 w-full"
              error={touched.imageUrl && !!errors.imageUrl}
            />
            <div className="h-6 -mt-2 text-xs text-red-500">
              {touched.imageUrl ? errors.imageUrl : ""}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                handleReset()
                setIsOpen(false)
              }}
              variant="contained"
              className="!mr-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="m-1"
              disabled={
                creatingProduct ||
                updatingProduct ||
                (!product && !Object.keys(touched).length) ||
                !!Object.keys(errors).length ||
                _.isEqual(values, product)
              }
            >
              {product ? "Edit Product" : "Add Product"}
              {(creatingProduct || updatingProduct) && (
                <CircularProgress
                  style={{
                    color: "#757575",
                    width: "16px",
                    height: "16px",
                    marginLeft: "5px",
                  }}
                />
              )}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default EditProductModal
