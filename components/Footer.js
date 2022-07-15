import Link from 'next/link'
import moment from 'moment'
export default function footer() {
  return (
    <div>
      <footer className="border-1 border-top fw-bold bg-light text-center m-0 py-2">
        Made by{' '}
        <span style={{ color: 'rgb(238,61,0)' }}>
          <Link href="https://github.com/GitPro10">
            <a>Jubayer Ahmed</a>
          </Link>
        </span>{' '}
        ~ (2021 — {moment().year()})
      </footer>
    </div>
  )
}
