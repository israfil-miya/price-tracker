import moment from 'moment'
import Image from 'next/image'
export default function feedbacks({ feedbacks }) {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="comment-widgets">
              {feedbacks.map(
                (feedback, index) => (
                  (index += 1),
                  (
                    <div
                      key={index}
                      className="d-flex flex-row comment-row m-t-0"
                    >
                      <div className="p-2">
                        <Image
                          layout="fixed"
                          src={feedback.image}
                          alt={`${feedback.name}'s Profile Picture`}
                          width="60px"
                          height="60px"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="comment-text w-100">
                        <h6 className="font-medium">{feedback.name}</h6>{' '}
                        <span
                          style={{ fontSize: '15px' }}
                          className="m-b-15 text-break text-wrap d-block"
                        >
                          {feedback.message}
                        </span>
                        <div className="comment-footer">
                          <span
                            style={{ fontSize: '14.5px' }}
                            className="text-muted float-right"
                          >
                            {moment(feedback.added_time).format('Do MMMM YYYY')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .card {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background: transparent;
            background-clip: border-box;
            border: 0px solid transparent;
            border-radius: 0px;
          }

          .card-body {
            -webkit-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            padding: 1.25rem;
          }

          .card .card-title {
            position: relative;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .comment-widgets {
            position: relative;
            margin-bottom: 10px;
          }

          .comment-widgets .comment-row {
            border-bottom: 1px solid transparent;
            padding: 14px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin: 10px 0;
          }

          .p-2 {
            padding: 0.5rem !important;
          }

          .comment-text {
            padding-left: 15px;
          }

          .w-100 {
            width: 100% !important;
          }

          .m-b-15 {
            margin-bottom: 15px;
          }
          .comment-widgets .comment-row:hover {
            background: rgba(0, 0, 0, 0.05);
          }
        `}
      </style>
    </div>
  )
}
