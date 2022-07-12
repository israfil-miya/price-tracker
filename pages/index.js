import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import TypeMe, { Delay, LineBreak, Delete } from 'react-typeme'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import useInView from 'react-cool-inview'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Faqs = dynamic(() => import('../components/faqs'))
const Feedbacks = dynamic(() => import('../components/feedbacks'))

export async function getServerSideProps(context) {
  const res = await fetch(process.env.BASE_URL + '/api/faqs')
  const data = await res.json()
  const datasreturn = JSON.parse(JSON.stringify(data.faqs))
  //console.log(datasreturn[0].question)

  const res2 = await fetch(process.env.BASE_URL + '/api/feedbacks')
  const data2 = await res2.json()
  const datasreturn2 = JSON.parse(JSON.stringify(data2.feedbacks))
  return {
    props: {
      faqs: datasreturn,
      feedbacks: datasreturn2,
    },
  }
}

export default function Index({ faqs, feedbacks }) {
  const router = useRouter()
  const { error } = router.query
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  })
  const { data: session, status } = useSession()
  let name = session
    ? ' there, ' + session.user.name + '!'
    : ' there, Ghost Human!'

  useEffect(() => {
    const errors = {
      Signin: 'Try signing with a different account.',
      OAuthSignin: 'Try signing with a different account.',
      OAuthCallback: 'Try signing with a different account.',
      OAuthCreateAccount: 'Try signing with a different account.',
      EmailCreateAccount: 'Try signing with a different account.',
      Callback: 'Try signing with a different account.',
      OAuthAccountNotLinked:
        'To confirm your identity, sign in with the same account you used originally.',
      EmailSignin: 'Check your email address.',
      CredentialsSignin:
        'Sign in failed. Check the details you provided are correct.',
      forbidden: "You can't access that page without login.",
      hackeralert:
        "You are a hacker and somehow got the id of a private item that doesn't belongs to you, You are so pathetic!!",
      default: 'Unable to sign in.',
    }
    if (error) {
      const errorMessage = error && (errors[error] ?? errors.default)
      toast.error(errorMessage, {
        toastId: 'error',
      })
      router.push('/')
    }
  }, [error, router])

  return (
    <>
      <ToastContainer />

      <div className="overflow-hidden container my-4 p-2 bg-light">
        <div className="d-flex mt-4 flex-column justify-content-center align-items-center">
          <Image
            layout="fixed"
            alt="My Img"
            src="/static/images/me.jpg"
            className="d-block rounded-circle"
            width="100px"
            height="100px"
          />
          <div className="py-1 rounded border border-1 px-2 my-2 bg-white">
            {session ? (
              <TypeMe
                strings={[
                  'Hello, there!',
                  <Delete key="0" characters={8} />,
                  name,
                ]}
              />
            ) : (
              <TypeMe>Hello{name}</TypeMe>
            )}
          </div>
          {session ? (
            <span id="dash-link">
              Take me to the{' '}
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </span>
          ) : null}
          <h2>
            <p className="px-3 py-2 mt-5 bg-warning rounded border border-1">
              About Me
            </p>
          </h2>
          <div className="about-me-text px-3 text-wrap">
            Hi, My name is Jubayer ahmed. I am from Bangladesh specifically from
            Dhaka, Bangladesh. I am an young boy, currently doing my study, yes
            I am a student. I am interested to make websites specifically the
            Backend of websites, you can call me a Backend developer. You can
            send me a friend request on my Facebook, if you need help.
            That&apos;s it for now.
          </div>
          <h2>
            <p className="px-3 py-2 mt-3 bg-warning rounded border border-1">
              About &quot;Price Tracker&quot;
            </p>
          </h2>
          <div className="about-prctkr-text px-3 text-wrap">
            An amazing website that can track the prices of your favourite items
            from your favourite e-shops like Amazon, Walmart, Target etc. for
            free of cost! You can manage you items listed for monitoring, you
            can remove an item from monitoring. There is a dashboard where you
            can see all your items listed for monitoring and other monitoring
            information such as current price of that item and other things.
            Enjoy the free service!!
          </div>
        </div>

        <div className="text-center">
          <h2>
            <p className="px-3 d-inline-block text-center py-2 mt-3 bg-warning rounded border border-1">
              Top FAQs
            </p>
          </h2>
        </div>
        <div className="faqs px-3" ref={observe}>
          {inView && <Faqs faqs={faqs} />}
        </div>

        <div className="text-center">
          <h2>
            <p className="px-3 d-inline-block text-center py-2 mt-3 bg-warning rounded border border-1">
              Top Feedbacks
            </p>
          </h2>
        </div>
        <div className="feedbacks" ref={observe}>
          {inView && <Feedbacks feedbacks={feedbacks} />}
        </div>

        <style jsx>
          {`
            h2 {
              font-weight: thin;
              font-size: 17px;
            }
            .text-justify {
              text-align: justify;
            }
            #dash-link {
              font-size: 12px;
            }
          `}
        </style>
      </div>
    </>
  )
}
