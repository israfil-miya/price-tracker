import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession, getSession } from 'next-auth/react'

// fake-authentic checking
export async function getServerSideProps(context) {
  const { item_id } = context.params
  const session = await getSession(context)
  // code for redirect if not logged in
  if (!session) {
    return {
      redirect: {
        destination: '/?error=forbidden',
        permanent: false,
      },
    }
  }

  const rawres = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/item_manage`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkItemsData: true, id: item_id }),
    },
  )
  const res = await rawres.json()
  const datasreturn = JSON.parse(JSON.stringify(res))
  console.log(datasreturn)

  if (datasreturn.success) {
    if (datasreturn.resp.User_ID != session.user.uid) {
      return {
        redirect: {
          destination: '/?error=hackeralert',
          permanent: false,
        },
      }
    } else {
      return {
        props: {
          authentic: true,
        },
      }
    }
  }
}

export default function Item_manage() {
  const router = useRouter()
  const { item_id, error, success } = router.query
  const [itemName, setNewName] = useState('')
  const [webSite, setNewWebsite] = useState('')
  const [itemUri, setNewUri] = useState('')
  const [priceWanted, setNewPrice] = useState('')
  useEffect(() => {
    if (error) {
      const errorMessage = 'Something gone wrong.'
      toast.error(errorMessage, {
        toastId: 'error',
      })
      router.push('/manage-item/' + item_id)
    }
    if (success) {
      const successMessage = 'Form submitted successfully.'
      toast.success(successMessage, {
        toastId: 'success',
      })
      router.push('/manage-item/' + item_id)
    }
  }, [error, success, router, item_id])

  async function deleteItemFunc(e) {
    e.preventDefault()
    const rawres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/item_manage`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteItem: true, id: item_id }),
      },
    )
    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    console.log(datasreturn)

    if (datasreturn.success) {
      router.push('/dashboard')
    }
    if (!datasreturn.success) {
      router.push('/manage-item/' + item_id + '/?error=true')
    }
  }
  async function updateItemSubmitHandle(e) {
    e.preventDefault()
    const data = {
      item_name: itemName != '' ? itemName : undefined,
      website: webSite != '' ? webSite : undefined,
      item_uri: itemUri != '' ? itemUri : undefined,
      price_wanted: priceWanted != '' ? priceWanted : undefined,
    }

    const rawres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/item_manage`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, id: item_id }),
      },
    )
    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    console.log(datasreturn)

    if (datasreturn.success) {
      router.push('/manage-item/' + item_id + '/?success=true')
    }
    if (!datasreturn.success) {
      router.push('/manage-item/' + item_id + '/?error=true')
    }
  }
  return (
    <div>
      <ToastContainer />

      <div className="container text-break text-wrap my-4 p-2 bg-light">
        <div className="text-center">
          <p className="px-3 d-inline-block text-center py-2 mt-2 bg-warning rounded border border-1">
            Update Item
          </p>
        </div>
        <form onSubmit={updateItemSubmitHandle}>
          <div className="mb-3">
            <label className="form-label">Item&apos;s name</label>
            <input
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Website&apos;s name</label>
            <input
              onChange={(e) => setNewWebsite(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Item&apos;s URI/Link </label>
            <input
              onChange={(e) => setNewUri(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Item&apos;s wanted price </label>
            <input
              onChange={(e) => setNewPrice(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
        <button
          onClick={deleteItemFunc}
          className="btn mt-5 mb-2 btn-danger btn-sm d-block w-100"
        >
          Delete this item permanently (no confirmation)
        </button>
      </div>

      <style jsx>{``}</style>
    </div>
  )
}
