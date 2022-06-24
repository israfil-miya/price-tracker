import Link from 'next/link'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
export default function Header() {
  const { data: session, status } = useSession()
  return (
    <>
      <nav className="p-0 m-0 navbar shadow-sm navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">
              <h1>
                <span className="brandName">PriceTracker</span>
              </h1>
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse pb-2 navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-0 mt-2 mb-3 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              {session ? (
                <div>
                  <li className="nav-item">
                    <Link href="/dashboard">
                      <a className="nav-link">Dashboard</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/feedback">
                      <a className="nav-link">Feedback</a>
                    </Link>
                  </li>
                </div>
              ) : null}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Follow me on
                </a>
                <ul
                  id="followDropdown"
                  className="navbar-dropdown dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <li id="dcList">
                    <Link href="https://github.com/GitPro10">
                      <a className="dropdown-item" target="_blank">
                        <i className="bi pe-1 bi-arrow-up-right-square"></i>{' '}
                        Github
                      </a>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li id="fblist">
                    <Link href="https://www.facebook.com/ahmed.jubayer.69">
                      <a className="dropdown-item" target="_blank">
                        <i className="bi pe-1 bi-arrow-up-right-square"></i>{' '}
                        Facebook
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {session ? (
              <button onClick={() => signOut()}
                className="btn btn-danger btn-sm"
              >
                Logout
              </button>
            ) : (
              <div>
                <span className="d-block text-reset nav-link mb-2">
                  Login with:
                </span>
                <div className="btn-group" role="group">
                  <button
                    onClick={() => signIn('github')}
                    type="button"
                    className="btn btn-sm btn-dark"
                  >
                    Github <i className="bi ps-1 bi-github"></i>
                  </button>
                  <button
                    onClick={() => signIn('discord')}
                    type="button"
                    className="btn btn-sm btn-primary"
                  >
                    Discord <i className="bi ps-1 bi-discord"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Eczar&display=swap');
        .navbar-toggler:focus,
        .navbar-toggler-icon:focus {
          outline: none;
          box-shadow: none;
        }
        .brandName {
          font-size: 22px;
          font-family: 'Eczar', serif;
        }
        .navbar-collapse {
          font-family: 'Poppins', sans-serif;
        }
        .nav-link {
          font-size: 15px;
          padding: 2px;
        }
        .navbar-dropdown {
          font-size: 14px;
        }
        #followDropdown #dcList a:active {
          background-image: none;
          background-color: #171515;
          color: white;
        }
        #followDropdown #fblist a:active {
          background-image: none;
          background-color: #4267b2;
          color: white;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
