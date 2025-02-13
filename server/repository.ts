export interface Repository {
  repositoryName?: string;
  username?: string;
  assignmentId?: number;
  assignmentName?: string;
  classId?: number;
  className?: string;
  sHAs?: string[];
}

export class RepoClassFormat{
  constructor(
    public repositoryName?: string,
    public username?: string,
    public assignmentId?: number,
    public assignmentName?: string,
    public classId?: number,
    public className?: string,
    public sHAs?: string[]
  ) {}
}
