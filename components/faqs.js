
export default function faqs({faqs}) {
  console.log(faqs ? faqs : undefined)
  return (
    <div>
    {
      faqs.map((faq, index) => (
      index+=1,
        <div className="faq" key={index}>
          <p><b>Q.</b> {faq.question}</p>
          <p><b>A.</b>Yes</p>
        </div>
      ))
    }
    
    <style jsx>
      {`
      .faq { margin: 8px auto; }
      .faq p { margin: 0 }
      b { padding-right: 5px }
      `}
    </style> 
    </div>
  )
}