export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'issue_assigned' | 'issue_status_changed' | 'comment_created'
  issue_id: string
  read: boolean
  created_at: string
}

export interface MarkReadData {
  read: boolean
}
