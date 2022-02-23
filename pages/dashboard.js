import {
  useEffect,
  useState
} from 'react'
import Link from 'next/link';
import {
  getSession,
  useSession
} from "next-auth/react"
import {
  useRouter
} from "next/router";
import { useClipboard } from 'use-clipboard-copy';
import Tooltip from 'react-tooltip-lite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const rawres = await fetch('https://price-tracker-ivory.vercel.app/api/items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({getdata: true, uid: session.user.uid})
    });
    const res = await rawres.json();
    const datasreturn = JSON.parse(JSON.stringify(res))
    console.log(datasreturn)
  return {
    props: {
      session,
      items: datasreturn
    }
  }
}
export default function Dashboard({items}) {
  const clipboard = useClipboard();
  const {
    data: session
  } = useSession()
  const router = useRouter();
  const { error, success } = router.query
  const [item_name,
    setName] = useState('');
  const [website,
    setWebsite] = useState('');
  const [item_uri,
    setUri] = useState('');
  const [price_wanted,
    setPrice] = useState('');
    
  const errors = {
  serverError: "Failed due to server error.",
  default: "Unable to submit.",
  };
  const successMsg = {
  updated: "Updated previous data.",
  createdNew: "Form submitted successfully.",
  default: "Form submitted."
  }
  useEffect(() => {
    if (error) {
      const errorMessage = error && (errors[error] ?? errors.default);
      toast.error(errorMessage)
      router.push("/dashboard")
    }
    if (success) {
      const successMessage = success && (successMsg[success] ?? successMsg.default);
      toast.success(successMessage)
      router.push("/dashboard")
    }
  }, [error, errors, success, successMsg, router])
  
  async function addItemSubmitHandle(e) {
    e.preventDefault();
    const data = {
      item_name,
      website,
      item_uri,
      price_wanted,
      User_ID: session.user?.uid
    };
    const rawres = await fetch('https://price-tracker-ivory.vercel.app/api/items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const res = await rawres.json();
    const datasreturn = JSON.parse(JSON.stringify(res))
    console.log(datasreturn)
  
    if(datasreturn.resp.status == "error"){
    router.push('/dashboard?error='+datasreturn.resp.message);
    }
    if(datasreturn.resp.status == "success"){
    router.push('/dashboard?success='+datasreturn.resp.message);
    }

  };
  return (
    <div>
    <ToastContainer />
   
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
          <th scope="col">Price</th>
          <th scope="col">Current Price</th>
          <th scope="col">Manage</th>
        </tr>
      </thead>
      <tbody>
      {
      (items.length!=0) ?
        items.map((item, index) =>(
          index += 1,
          <tr key={index}>
      <th scope="row">{index}</th>
      <td>
      <Tooltip color="white" arrowSize={5} useHover={false} eventOn="onClick"
              eventOff="onMouseOut" padding={4} background="#272727" content="Copied!">
          <button className="btn btn-sm btn-outline-primary" onClick={() => clipboard.copy(item._id)}>Copy</button>
        </Tooltip>
      </td>
      <td>{item.item_name}</td>
      <td>{item.website}</td>
      <td><Link href={item.item_uri}><a target="_blank" className="btn btn-outline-primary btn-sm p-2">Visit</a></Link></td>
      <td>{item.price_wanted}</td>
      <td>{item.curr_price}</td>
      <td>
      <Link href={"/item_manage/"+item._id}><a className="btn btn-outline-primary btn-sm p-2">Manage</a></Link>
      </td>
    </tr>
        )) : <tr><td colSpan="8">You have no items in monitor, you can start adding items.</td></tr>
        }
        
      
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
    <input onChange={e => setName(e.target.value)} type="text" className="form-control" required/>
      </div>
  <div className="mb-3">
    <label className="form-label">Website&apos;s name</label>
    <input onChange={e => setWebsite(e.target.value)} type="text" className="form-control" required/>
      </div>
  <div className="mb-3">
    <label className="form-label">Item&apos;s URI/Link </label>
    <input onChange={e => setUri(e.target.value)} type="text" className="form-control" required/>
      </div>
  <div className="mb-3">
    <label className="form-label">Item&apos;s wanted price </label>
    <input onChange={e => setPrice(e.target.value)} type="number" className="form-control" required/>
      </div>
  <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    
 
    
    </div>

    <style jsx>
      {`
     
      `}
    </style>
    
    </div>
  )
}