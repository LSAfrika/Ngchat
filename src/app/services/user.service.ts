import { BehaviorSubject } from 'rxjs';
import { Post } from './../interface/post.interface';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userpagination=new BehaviorSubject(0)
searchvalue=new BehaviorSubject('')
  USERURL=environment.API+'user/singleuser/'
  REFRESHURL=environment.API+'user/refresh'
  FETCHUSERS=environment.API+'user/allusers'
  FETCHUSER=environment.API+'user/singleuser/'

  constructor(private http:HttpClient) { }

  // fetchuser(id){
  //   return this.http.get(this.USERURL+id)
  // }

  refreshtoken(){

    const token=localStorage.getItem('token')
    const refreshtoken=localStorage.getItem('refreshtoken')
    return this.http.post(this.REFRESHURL,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('refreshtoken',`bearer ${refreshtoken}`) })
  }

  fetchusers(searchterm:string){

    return this.http.get(this.FETCHUSERS+`?search=${searchterm}&pagination=${this.userpagination.value}`)
  }

  fetchuser(id:string){

    console.log(this.FETCHUSER+`${id}`);

    return this.http.get(this.FETCHUSER+`${id}`)
  }
}
