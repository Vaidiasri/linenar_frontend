export interface CommentUser {
  id: string
  email: string
  full_name: string | null
}

export interface Comment {
  id: string
  content: string
  issue_id: string
  author_id: string
  created_at: string
  author: CommentUser
}

export interface CommentCreate {
  content: string
}
