export interface Project {
  id: string
  name: string
  description: string | null
}

export interface Team {
  id: string
  name: string
  key: string
  projects: Project[]
}
