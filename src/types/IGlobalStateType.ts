interface IGlobalState {
  blogs: IBlog[];
  curPost: IPost;
  setCurPost: React.Dispatch<React.SetStateAction<IPost>>;
}
