import moment from 'moment'
import status from 'http-status'
import Report from '../models/report.model'

export function create(req, res) {
  const period = moment().subtract(1, 'quarter')
  const report = new Report({
    period: {
      year: period.year(),
      quarter: period.quarter(),
    },
  })
  report.company.country = 'canada'

  report.save().then(
    () => res.json(report),
    (err) => res.status(status.INTERNAL_SERVER_ERROR).send(err)
  )
}

export function show(req, res) {
  const reportId = req.params.id
  Report.findById(reportId).exec((err, report) => {
    if (err) return res.status(status.INTERNAL_SERVER_ERROR).send(err)
    if (!report) return res.status(status.NOT_FOUND).end()

    res.json(report)
  })
}

export function update(req, res) {
  const reportId = req.params.id
  Report.findById(reportId).exec((err, report) => {
    if (err) return res.status(status.INTERNAL_SERVER_ERROR).send(err)
    if (!report) return res.status(status.NOT_FOUND).end()

    report.user = req.body.user
    report.company = req.body.company
    report.save().then(
      () => res.json(report),
      (error) => res.status(status.INTERNAL_SERVER_ERROR).send(error)
    )
  })
}

// export function getPosts(req, res) {
//   Post.find().sort('-dateAdded').exec((err, posts) => {
//     if (err) {
//       return res.status(500).send(err)
//     }
//     res.json({ posts })
//   })
// }

// export function addPost(req, res) {
//   if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
//     return res.status(403).end()
//   }

//   const newPost = new Post(req.body.post)

//   // Let's sanitize inputs
//   newPost.title = sanitizeHtml(newPost.title)
//   newPost.name = sanitizeHtml(newPost.name)
//   newPost.content = sanitizeHtml(newPost.content)

//   newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true })
//   newPost.cuid = cuid()
//   newPost.save((err, saved) => {
//     if (err) {
//       return res.status(500).send(err)
//     }
//     return res.json({ post: saved })
//   })
// }

// export function getPost(req, res) {
//   const newSlug = req.query.slug.split('-')
//   const newCuid = newSlug[newSlug.length - 1]
//   Post.findOne({ cuid: newCuid }).exec((err, post) => {
//     if (err) {
//       return res.status(500).send(err)
//     }
//     res.json({ post })
//   })
// }

// export function deletePost(req, res) {
//   const postId = req.body.postId
//   Post.findById(postId).exec((err, post) => {
//     if (err) {
//       return res.status(500).send(err)
//     }

//     post.remove(() => {
//       res.status(200).end()
//     })
//   })
// }
