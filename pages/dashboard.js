import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useClipboard } from 'use-clipboard-copy'
import toast, { Toaster } from 'react-hot-toast'
import Script from 'next/script'

export async function getServerSideProps(context) {
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

  const rawres2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user_config`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ getData: true, uid: session.user.uid }),
    },
  )
  const res2 = await rawres2.json()
  const datasreturn2 = JSON.parse(JSON.stringify(res2))
  // console.log(datasreturn2)

  const rawres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ getData: true, uid: session.user.uid }),
  })
  const res = await rawres.json()
  const datasreturn = JSON.parse(JSON.stringify(res))
  // console.log(datasreturn)

  return {
    props: {
      session,
      items: datasreturn,
      configs: datasreturn2,
    },
  }
}
export default function Dashboard({ items, configs }) {
  const clipboard = useClipboard()
  const { data: session } = useSession()
  const router = useRouter()
  const { error, success } = router.query
  const [item_name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [item_uri, setUri] = useState('')
  const [price_wanted, setPrice] = useState('')
  const [log_email, setLogEmail] = useState('')
  const [currency, setCurrency] = useState('')

  useEffect(() => {
    if (error) {
      const errorMessage = 'Failed to submit the form.'
      toast.error(errorMessage, {
        toastId: 'error',
      })
      router.push('/dashboard')
    }
    if (success) {
      const successMessage = 'Form submitted successfully.'
      toast.success(successMessage, {
        toastId: 'success',
      })
      router.push('/dashboard')
    }
  }, [error, success, router])

  async function addItemSubmitHandle(e) {
    e.preventDefault()
    const data = {
      item_name,
      website,
      item_uri,
      price_wanted,
      User_ID: session.user.uid,
    }
    const rawres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/items`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    // console.log(datasreturn)

    if (datasreturn.success) {
      e.target.reset()
      router.push('/dashboard?success=true')
    } else if (!datasreturn.success) {
      router.push('/dashboard?error=true')
    }
  }
  async function configSubmitHandle(e) {
    e.preventDefault()
    const data = {
      currency,
      monitor_email: log_email,
      User_ID: session.user?.uid,
    }
    const rawres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user_config`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    // console.log(datasreturn)

    if (datasreturn.success) {
      router.push('/dashboard?success=true')
    } else if (!datasreturn.success) {
      router.push('/dashboard?error=true')
    }
  }
  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />

      <div className="container text-break text-wrap my-4 p-2 bg-light">
        <div className="text-center">
          <p className="px-3 d-inline-block text-center py-2 mt-2 bg-warning rounded border border-1">
            In Monitor Items
          </p>
        </div>
        <table className="text-center table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">UID</th>
              <th scope="col">Name</th>
              <th scope="col">Website</th>
              <th scope="col">URI</th>
              <th scope="col">Wanted Price</th>
              <th scope="col">Current Price</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {items.length != 0 ? (
              items.map(
                (item, index) => (
                  (index += 1),
                  (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            clipboard.copy(item._id)
                            toast('Copied!')
                          }}
                        >
                          Copy
                        </button>
                      </td>
                      <td>{item.item_name}</td>
                      <td>{item.website}</td>
                      <td>
                        <Link href={item.item_uri}>
                          <a
                            target="_blank"
                            className="btn btn-outline-primary btn-sm p-2"
                          >
                            Visit
                          </a>
                        </Link>
                      </td>
                      <td>{item.price_wanted}</td>
                      <td>{item.curr_price}</td>
                      <td>
                        <Link href={'/manage-item/' + item._id}>
                          <a className="btn btn-outline-primary btn-sm p-2">
                            Manage
                          </a>
                        </Link>
                      </td>
                    </tr>
                  )
                ),
              )
            ) : (
              <tr>
                <td className="text-muted" colSpan="8">
                  You have no items in monitor, you can start adding items.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center">
          <p className="px-3 d-inline-block text-center py-2 mt-2 bg-warning rounded border border-1">
            Add New Item
          </p>
        </div>
        <form onSubmit={addItemSubmitHandle}>
          <div className="mb-3">
            <label className="form-label">Item&apos;s name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Website&apos;s name</label>
            <input
              onChange={(e) => setWebsite(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Item&apos;s URI</label>
            <input
              onChange={(e) => setUri(e.target.value)}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Item&apos;s wanted price </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="text-center">
          <p className="px-3 d-inline-block text-center py-2 mt-2 bg-warning rounded border border-1">
            Configurations
          </p>
        </div>
        <form onSubmit={configSubmitHandle}>
          <div className="mb-3">
            <label className="form-label">Logging Email</label>
            <input
              defaultValue={
                configs.monitor_email && configs.monitor_email != ''
                  ? configs.monitor_email
                  : session.user.email
              }
              onChange={(e) => setLogEmail(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Preferred Currency Code</label>
            <input
              defaultValue={
                configs.currency && configs.currency != ''
                  ? configs.currency
                  : 'USD'
              }
              onChange={(e) => setCurrency(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <style jsx>{``}</style>
    </div>
  )
}
