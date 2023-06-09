import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddBoxSharp, ClosedCaptionDisabledOutlined, StorageRounded } from '@mui/icons-material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StoreMallDirectoryRounded from '@mui/icons-material/StoreMallDirectoryRounded'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import Customers from '../../components/Admin/Customers/Customers'
import { fetchProducts } from '../../redux/actions/ProductActions'
import CreateAndEdit from '../../components/Admin/CreateAndEdit/CreateAndEdit'
import Products from '../Products/Products'
import './styles/AdminDashboard.scss'

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [openCustomers, setOpenCustomers] = React.useState(false)
  const [openProducts, setOpenProducts] = React.useState(false)
  const [openCreateAndEdit, setOpenCreateAndEdit] = React.useState(false)
  const { products } = useSelector((state: RootState) => state)
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleOpenCustomers = () => {
    setOpenProducts(false)
    setOpenCustomers(!openCustomers)
  }

  const handleOpenProducts = () => {
    setOpenCustomers(false)
    setOpenProducts(!openProducts)
  }

  const handleOpenCreate = () => {
    setOpenCreateAndEdit(!openCreateAndEdit)
  }
  return (
    <>
      <div className="admin-dashboard">
        <div className="admin-dashboard__buttons" onClick={handleOpenCustomers}>
          <PeopleAltIcon fontSize="large" />
          <p className="admin-dashboard__buttons--text">Customers</p>
        </div>
        <div className="admin-dashboard__buttons" onClick={handleOpenProducts}>
          <StoreMallDirectoryRounded fontSize="large" />
          <p className="admin-dashboard__buttons--text">Products</p>
        </div>
        <Link
          to="/admin/createandcheck"
          className="admin-dashboard__buttons"
          style={{
            textDecoration: 'none'
          }}>
          <StorageRounded fontSize="large" />
          <p className="admin-dashboard__buttons--text">In stock</p>
        </Link>
      </div>
      {openCustomers && <Customers />}
      {openProducts && (
        <div className="admin-dashboard__products">
          <div
            className={
              !openCreateAndEdit
                ? 'admin-dashboard__products__create-button'
                : 'admin-dashboard__products__create-button-close'
            }
            onClick={handleOpenCreate}>
            {!openCreateAndEdit ? (
              <AddBoxSharp fontSize="large" />
            ) : (
              <ClosedCaptionDisabledOutlined fontSize="large" style={{ color: '#ff0000' }} />
            )}

            <p className="admin-dashboard__products__create-button--text">
              {openCreateAndEdit ? 'Close' : 'Add'}
            </p>
          </div>
          <Products {...products} />
        </div>
      )}
      {openCreateAndEdit && (
        <div className="admin-dashboard-create-product">
          <CreateAndEdit productId={id} setOpenCreateAndEdit={setOpenCreateAndEdit} />
        </div>
      )}
    </>
  )
}

export default AdminDashboard
