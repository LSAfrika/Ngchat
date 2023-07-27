export interface userfetch{
  searchtext: string;
  pagination: number;

}

export interface contacts{
  _id:string,
 username: string,
 profileimg:string
 status?:string,
 email?:string
 lastseen?: number
 online?: boolean,
 favorited?:boolean
}

export interface AuthUser{
  email:string
  exp:number

  iat:number
    iss  :string
  profileimg:  string
  status:string
  username:string
  _id:string

}
