export interface Category {
  id: string;
  name: string;
  // parentId === undefined means top-level category
  parentId?: string;
}
