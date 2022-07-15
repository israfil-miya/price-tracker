import { useRouter } from 'next/router'
export default function Error() {
  const router = useRouter()
  return (
    <div className="outer d-flex justify-content-center align-items-center text-center container">
      <div className="inner">
        <h1>404</h1>
        <p>Page not found!</p>
        <button
          onClick={() => router.push('/')}
          className="btn btn-primary btn-sm"
        >
          Go back Home
        </button>
      </div>
      <style jsx>
        {`
          h1 {
            font-size: 50px;
          }
          p {
            margin: 1px auto 8px auto;
          }
          .inner {
            margin: 0;
            position: absolute;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
          }
          .outer {
            height: 400px;
            position: relative;
          }
        `}
      </style>
    </div>
  )
}
