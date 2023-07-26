import { BehaviorSubject } from 'rxjs';
import { Post } from './../interface/post.interface';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userfetch } from '../interface/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userpagination=new BehaviorSubject(0)
searchvalue=new BehaviorSubject<userfetch>({searchtext:'',pagination:1 })
  USERURL=environment.API+'user/singleuser/'
  REFRESHURL=environment.API+'user/refresh'
  FETCHUSERS=environment.API+'user/allusers'
  FAVORITEUSERSURL=environment.API+'user/personalusers'
  FETCHCOUNT=environment.API+'user/count?search='
  FETCHUSER=environment.API+'user/singleuser/'
  CREATEUSER=environment.API+'user/register'
  LOGINUSER=environment.API+'user/login'

  constructor(private http:HttpClient) { }

  // fetchuser(id){
  //   return this.http.get(this.USERURL+id)
  // }

  refreshtoken(){

    const token=localStorage.getItem('token')
    const refreshtoken=localStorage.getItem('refreshtoken')
    return this.http.post(this.REFRESHURL,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('refreshtoken',`bearer ${refreshtoken}`) })
  }

  fetchallusers(searchterm:string,pagination){

    return this.http.get(this.FETCHUSERS+`?search=${searchterm}&pagination=${pagination}`)
  }

  fetchfavoritecontactlist(){
    return this.http.get(this.FAVORITEUSERSURL)
  }


  addremoveforiteuser(uid){
    return this.http.post(this.FAVORITEUSERSURL,{favoriteuserid:uid})

  }

  fetchuser(id:string){

    // console.log(this.FETCHUSER+`${id}`);

    return this.http.get(this.FETCHUSER+`${id}`)
  }
fetchcount(searchterm:string){
  return this.http.get(this.FETCHCOUNT+`${searchterm}`)
}
  createuser(userdata){
 return this.http.post(this.CREATEUSER,userdata)
  }

  loginuser(userdata){
    return this.http.post(this.LOGINUSER,userdata)
     }
}
