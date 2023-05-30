export interface Post {
       _id: string;
        user: User;
        imgurl: [string];
        caption?: string;
        likes?: [string];
        comments?: [string];
        category: string;
        createdAt: string;
}

export interface User{
  _id: string;
  username: string;
  profileimg: string;
  status:string
  online:boolean
  createdAt?: string
  lastseen?:string
}
