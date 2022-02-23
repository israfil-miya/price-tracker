import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{paddingBottom: "50px"}}>{children}</main>
      <Footer />
    </>
  )
}