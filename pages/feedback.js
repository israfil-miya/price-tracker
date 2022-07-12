import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Feedback() {
  const router = useRouter()
  const { error, success } = router.query
  const { data: session } = useSession()
  const name = session.user?.name
  const image = session.user.image
    ? session.user.image
    : '/static/images/me.jpg'
  const [message, setMessage] = useState('')
  const [question, setQuestion] = useState('')

  useEffect(() => {
    const errors = {
      serverError: 'Failed due to server error.',
      default: 'Unable to submit.',
    }
    const successMsg = {
      updated: 'Updated previous data.',
      createdNew: 'Form submitted successfully.',
      default: 'Form submitted.',
    }
    if (error) {
      const errorMessage = error && (errors[error] ?? errors.default)
      toast.error(errorMessage, {
        toastId: 'error',
      })
      router.push('/feedback')
    }
    if (success) {
      const successMessage =
        success && (successMsg[success] ?? successMsg.default)
      toast.success(successMessage, {
        toastId: 'success',
      })
      router.push('/feedback')
    }
  }, [error, success, router])

  async function feedbackFormSubmitHandle(e) {
    e.preventDefault()
    const data = {
      name,
      User_ID: session.user.uid,
      message,
      image,
    }
    const rawres = await fetch(process.env.BASE_URL + '/api/feedbacks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    if (datasreturn.resp.status == 'error') {
      router.push('/feedback?error=' + datasreturn.resp.message)
    }
    if (datasreturn.resp.status == 'success') {
      router.push('/feedback?success=' + datasreturn.resp.message)
    }
  }
  async function faqFormSubmitHandle(e) {
    e.preventDefault()
    const data = {
      name,
      User_ID: session.user.uid,
      question,
    }
    const rawres = await fetch(process.env.BASE_URL + '/api/faqs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    if (datasreturn.resp.status == 'error') {
      router.push('/feedback?error=' + datasreturn.resp.message)
    }
    if (datasreturn.resp.status == 'success') {
      router.push('/feedback?success=' + datasreturn.resp.message)
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="wrapper my-4">
        <div className="container p-3 bg-light">
          <div className="mb-3">
            <label className="form-label">Your name</label>
            <input
              type="text"
              value={session.user?.name}
              className="text-muted form-name form-control"
              disabled
            />
            <div id="emailHelp" className="form-text">
              Automatically filled by Session
            </div>
          </div>
          <div className="text-center">
            <p className="px-3 d-inline-block text-center py-2 mt-2 bg-warning rounded border border-1">
              Feedback Form
            </p>
          </div>

          <form onSubmit={feedbackFormSubmitHandle}>
            <div className="mb-3">
              <label className="form-label">Your message</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="5"
                cols="5"
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          <div className="text-center">
            <p className="px-3 d-inline-block text-center py-2 mt-4 bg-warning rounded border border-1">
              Ask Question
            </p>
          </div>

          <form onSubmit={faqFormSubmitHandle}>
            <div className="mb-3">
              <label className="form-label">Your question</label>
              <textarea
                onChange={(e) => setQuestion(e.target.value)}
                required
                rows="2"
                cols="5"
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .form-text {
          font-size: 13px;
        }
        .form-name {
          font-size: 16px;
        }
      `}</style>
    </>
  )
}

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
  return {
    props: {
      session,
    },
  }
}
