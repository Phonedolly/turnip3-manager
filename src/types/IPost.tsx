interface IPost {
  curBlog: IBlog;
  curCategory: string | "";
  curTitle: string | "";
  curDate: string | "";
  initiate?: boolean;
}
