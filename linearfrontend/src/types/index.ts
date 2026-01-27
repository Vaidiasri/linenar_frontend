export interface LinearViewer {
  id: string
  name: string
  email: string
  avatarUrl?: string
  timezone?: string
}

export interface LinearViewerResponse {
  viewer: LinearViewer
}
