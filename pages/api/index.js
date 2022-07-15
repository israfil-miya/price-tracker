export default function handle(req, res) {
  res.status(200).json({
    author: 'Jubayer Ahmed',
    project_github: 'https://github.com/GitPro10/price-tracker',
    routes: [
      {
        name: 'items',
        path: '/api/items',
        description: "For handling user's items request",
      },
      {
        name: 'item_manage',
        path: '/api/item_manage',
        description: "For handling particular item's configurations",
      },
      {
        name: 'faqs',
        path: '/api/faqs',
        description: "For handling user's faq submission and retribution",
      },
      {
        name: 'feedbacks',
        path: '/api/feedbacks',
        description: "For handling user's feedback submission and retribution",
      },
      {
        name: 'user_config',
        path: '/api/user_config',
        description: "For handling user's configurations",
      },
    ],
    info: 'This page is for directions of different api routes in this website and for some external information about this project. Thank you very much for using!',
  })
}
