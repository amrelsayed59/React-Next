import { posts } from '../../../posts';
export default function handler(req, res) {
  let id = req.query.id;

  let post = posts.find(p => p.id == id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(400).json({ err: 'Something Wrong' });
  }
}

// url: http://localhost:3000/api/posts/1