import { BehaviorSubject } from 'rxjs';
import { Post } from './../interface/post.interface';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userfetch } from './../interface/userfetch.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userpagination=new BehaviorSubject(0)
searchvalue=new BehaviorSubject<userfetch>({searchtext:'',pagination:1 })
  USERURL=environment.API+'user/singleuser/'
  REFRESHURL=environment.API+'user/refresh'
  FETCHUSERS=environment.API+'user/allusers'
  FETCHCOUNT=environment.API+'user/COUNT'
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

  fetchusers(searchterm:string,pagination){

    return this.http.get(this.FETCHUSERS+`?search=${searchterm}&pagination=${pagination}`)
  }

  fetchuser(id:string){

    console.log(this.FETCHUSER+`${id}`);

    return this.http.get(this.FETCHUSER+`${id}`)
  }
fetchcount(){
  return this.http.get(this.FETCHCOUNT)
}
  createuser(userdata){
 return this.http.post(this.CREATEUSER,userdata)
  }

  loginuser(userdata){
    return this.http.post(this.LOGINUSER,userdata)
     }
}
