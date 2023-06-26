import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

export default function Feedback() {
  const router = useRouter()
  const { error, success } = router.query
  const { data: session } = useSession()
  const name = session.user.name
  const image = session.user.image
    ? session.user.image
    : '/static/images/me.jpg'
  const [message, setMessage] = useState('')
  const [question, setQuestion] = useState('')

  useEffect(() => {
    if (error) {
      const errorMessage = 'Failed to submit the form.'
      toast.error(errorMessage, {
        toastId: 'error',
      })
      router.push('/feedback')
    }
    if (success) {
      const successMessage = 'Form submitted successfully.'
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
    const rawres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedbacks`,
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
    if (datasreturn.success) {
      e.target.reset()
      router.push('/feedback?success=true')
    } else if (!datasreturn.success) {
      router.push('/feedback?error=true')
    }
  }
  async function faqFormSubmitHandle(e) {
    e.preventDefault()
    const data = {
      name,
      User_ID: session.user.uid,
      question,
    }
    const rawres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faqs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const res = await rawres.json()
    const datasreturn = JSON.parse(JSON.stringify(res))
    if (datasreturn.success) {
      e.target.reset()
      router.push('/feedback?success=true')
    } else if (!datasreturn.success) {
      router.push('/feedback?error=true')
    }
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />

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
