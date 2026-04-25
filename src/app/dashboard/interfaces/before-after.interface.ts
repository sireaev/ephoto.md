export interface IBeforeAfter {
  id?: number;
  beforeFileId?: number;
  afterFileId?: number;
  beforeFile?: File;
  afterFile?: File;
  row?: number;
  order?: number;
  before?: string;
  after?: string;
}

export interface IBeforeAfterCreate {
    file: File;
    type: 'before' | 'after';
    beforeAfterId?: number;
}