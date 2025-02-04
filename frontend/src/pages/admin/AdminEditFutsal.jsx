import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleFutsalApi, updateFutsalAPI } from '../../apis/api'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from '../../components/AdminNavbar'

const AdminEditFutsal = () => {

  // recieve product id from URl
  const { id } = useParams()
  // navigator
  const navigate = useNavigate()

  // use effect to fetch product details 
  useEffect(() => {
    //API call
    getSingleFutsalApi(id).then((res) => {
      console.log(res.data)
      setFutsalName(res.data.futsal.futsalName)
      setFutsalPrice(res.data.futsal.futsalPrice)
      setFutsalContact(res.data.futsal.futsalContact)
      setFutsalCategory(res.data.futsal.futsalCategory)
      setFutsalDescription(res.data.futsal.futsalDescription)
      setFutsalLocation(res.data.futsal.futsalLocation)
      setLatitude(res.data.futsal.latitude)
      setLongitude(res.data.futsal.longitude)
      setOldImage(res.data.futsal.futsalImageUrl)
    })
  }, [id])


  //  make useState 
  const [futsalName, setFutsalName] = useState('')
  const [futsalPrice, setFutsalPrice] = useState('')
  const [futsalContact, setFutsalContact] = useState('')
  const [futsalCategory, setFutsalCategory] = useState('')
  const [futsalDescription, setFutsalDescription] = useState('')
  const [futsalLocation, setFutsalLocation] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const [futsalImage, setFutsalImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [oldImage, setOldImage] = useState('')



  // functio for image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0] //files not file
    setFutsalImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  // Make Function for Button
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(productName,productPrice,productCategory,productDescription)
    // console.log(previewImage)

    // make a fom data
    const formData = new FormData();
    formData.append('futsalName', futsalName)
    formData.append('futsalPrice', futsalPrice)
    formData.append('futsalContact', futsalContact)
    formData.append('futsalCategory', futsalCategory)
    formData.append('futsalDescription', futsalDescription)
    formData.append('futsalLocation', futsalLocation)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('futsalImage', futsalImage)

    // making api call
    updateFutsalAPI(id, formData).then((res) => {
      if (res.data.success == true) {
        toast.success(res.data.message)
        navigate('/admin/futsal')
      }
      else {
        toast.error(res.data.message)
      }
    }).catch(err => {
      toast.error("Server Error")
    })

  }

  return (
    <>
    <AdminNavbar/>
    <AdminSidebar>
      <>

        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">


            <form className="space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 text-center font-semibold text-2xl">Edit Information for {futsalName} Futsal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="futsalName" className="block text-sm font-medium text-gray-900">Futsal Name</label>
                  <input type="text" value={futsalName} onChange={(e) => setFutsalName(e.target.value)} id="futsalName" className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                </div>
                <div>
                  <label htmlFor="futsalPrice" className="block text-sm font-medium text-gray-900">Futsal Price</label>
                  <input type="number" value={futsalPrice} onChange={(e) => setFutsalPrice(e.target.value)} id="futsalPrice" className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                </div>
                <div>
                  <label htmlFor="futsalContact" className="block text-sm font-medium text-gray-900">Futsal Contact</label>
                  <input type="number" value={futsalContact} onChange={(e) => setFutsalContact(e.target.value)} id="futsalContact" className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                </div>
                <div>
                  <label htmlFor="futsalCategory" className="block text-sm font-medium text-gray-900">Futsal Category</label>
                  <select  value = {futsalCategory} onChange={(e) => setFutsalCategory(e.target.value)} className='form-control mb-2'>
                    <option value="Select Category">Select Category</option>
                    <option value="5A-Side">5A-Side</option>
                    <option value="7A-Side">7A-Side</option>
                  </select>
                  {/* <input type="text" id="futsalCategory" value={futsalCategory} onChange={(e) => setFutsalCategory(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required /> */}
                </div>
                <div>
                  <label htmlFor="futsalLocation" className="block text-sm font-medium text-gray-900">Futsal Location</label>
                  <input type="text" id="futsalLocation" value={futsalLocation} onChange={(e) => setFutsalLocation(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                </div>
                <div>
                  <label htmlFor="futsalDescription" className="block text-sm font-medium text-gray-900">Futsal Description</label>
                  <textarea id="futsalDescription" value={futsalDescription} onChange={(e) => setFutsalDescription(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" rows="4" required></textarea>
                </div>
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-900">Futsal Latitude</label>
                  <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"  />
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-900">Futsal Longitude</label>
                  <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"  />
                </div>
              </div>
              <div>
                <label htmlFor="futsalImage" className="block text-sm font-medium  text-gray-900">Futsal Image</label>
                <input type="file" id="futsalImage" onChange={handleImageUpload} accept="image/*" className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                <h6>Old Image</h6>
                <img src={oldImage} alt="" />
                <hr />
                {
                  previewImage && <>
                    <h6 className='mt-3'> New Image</h6>
                    <img src={previewImage} className='object-fit-cover rounded-3 ' alt="" />
                  </>
                }
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>Save Changes</button>
            </form>
          </div>
        </div>


      </>
    </AdminSidebar>
    </>
  )
}

export default AdminEditFutsal