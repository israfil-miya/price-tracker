export default function faqs({ faqs }) {
  return (
    <div>
      {faqs.map(
        (faq, index) => (
          (index += 1),
          (
            <div className="faq" key={index}>
              <p className="text-break text-wrap">
                <b>Q.</b>
                <span>{faq.question}</span>
              </p>
              <p>
                <b>A.</b>
                <span>No answer right now.</span>
              </p>
              <br />
            </div>
          )
        ),
      )}

      <style jsx>
        {`
          .faq {
            margin: 8px auto;
          }
          .faq p {
            margin: 0;
          }
          b {
            padding-right: 5px;
          }
        `}
      </style>
    </div>
  )
}
