import Link from 'next/link';
import {
  useSession,
  getSession,
} from "next-auth/react"
import TypeMe, {
  Delay,
  LineBreak,
  Delete
} from 'react-typeme';
import { useRouter } from "next/router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react"
import useInView from "react-cool-inview";
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Faqs = dynamic(() => import('../components/faqs'))
const Feedbacks = dynamic(() => import('../components/feedbacks'))


export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/faqs')
  const data = await res.json();
  const datasreturn = JSON.parse(JSON.stringify(data.faqs))
  //console.log(datasreturn[0].question)
  
  const res2 = await fetch('http://localhost:3000/api/feedbacks')
  const data2 = await res2.json();
  const datasreturn2 = JSON.parse(JSON.stringify(data2.feedbacks))
  return {
    props: { 
      faqs: datasreturn,
      feedbacks: datasreturn2
    }
  }
}

export default function Index({faqs, feedbacks}) {
  const router = useRouter();
  const { error } = router.query
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  });
  const {
    data: session,
    status
  } = useSession()
  let name = session ? " there, "+session.user.name+"!": " there, Ghost Human!"
  const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  forbidden: "You can't access that page without login.",
  hackeralert: "You are a hacker and somehow got the id of a private item that doesn't belongs to you, You are so pathetic!!",
  default: "Unable to sign in.",
};
  useEffect(() => {
    if (error) {
      const errorMessage = error && (errors[error] ?? errors.default);
      toast.error(errorMessage)
      router.push("/")
    }
  }, [error, errors, router])
  
  return (
    <>
    <ToastContainer />
    
    
    <div className="container my-4 p-2 bg-light">
    <div className="d-flex mt-4 flex-column justify-content-center align-items-center">
    <img alt="My Img" src="/static/images/me.jpg" className="d-block rounded-circle" width="100px" />
    <div className="py-1 rounded border border-1 px-2 my-2 bg-white">
    {session ? <TypeMe strings={[
      'Hello, there!',
      <Delete key="0" characters={8} />, name
    ]} />: <TypeMe>Hello{name}</TypeMe> }
    </div>
   { session ? <span id="dash-link">Take me to the <Link href="/dashboard"><a>Dashboard</a></Link></span>: null }
    <p className="px-3 py-2 mt-5 bg-warning rounded border border-1">
    About Me
    </p>
      <div className="about-me-text  text-justify text-wrap">
Maecenas ac placerat nisl. Proin eget ante leo. Integer id nisi vel quam accumsan finibus. Quisque tristique diam libero, et tempus nibh dignissim feugiat. Ut commodo lorem nunc, non lacinia lorem posuere id. Duis tincidunt mauris mi, molestie mattis felis sollicitudin sit amet. Maecenas laoreet nisl sit amet eros tempus, vel fermentum nibh imperdiet. Pellentesque a venenatis ipsum, et finibus diam. Proin dolor odio, auctor non mi et, vehicula dapibus mauris. Vivamus laoreet, arcu eget convallis congue, elit risus molestie velit, nec pretium massa leo sed sem. Vestibulum tincidunt ac diam dignissim iaculis
    </div>
    <p className="px-3 py-2 mt-3 bg-warning rounded border border-1">
About &quot;Price Tracker&quot;
    </p>
      <div className="about-prctkr-text  text-justify text-wrap">
Maecenas ac placerat nisl. Proin eget ante leo. Integer id nisi vel quam accumsan finibus. Quisque tristique diam libero, et tempus nibh dignissim feugiat. Ut commodo lorem nunc, non lacinia lorem posuere id. Duis tincidunt mauris mi, molestie mattis felis sollicitudin sit amet. Maecenas laoreet nisl sit amet eros tempus, vel fermentum nibh imperdiet.
    </div>
    </div>


    <div className="text-center"><p className="px-3 d-inline-block text-center py-2 mt-3 bg-warning rounded border border-1">
    Top FAQs
    </p></div>
    <div className="faqs" ref={observe}>
     {inView && <Faqs faqs={faqs} />}
    </div>
    
        <div className="text-center"><p className="px-3 d-inline-block text-center py-2 mt-3 bg-warning rounded border border-1">
    Top Feedbacks
    </p></div>
    <div className="feedbacks" ref={observe}>
     {inView && <Feedbacks feedbacks={feedbacks} />}
    </div>
    
    
    <style jsx>
      {`
      .text-justify {
      text-align: justify;
      }
      #dash-link {
      font-size: 12px
      }
      `}
    </style>
    </div>
    </>
  )
}
