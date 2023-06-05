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
  online:boolean
  status?:string
  createdAt?: string
  lastseen?:string
}
