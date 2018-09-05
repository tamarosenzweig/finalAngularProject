import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User.model';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: User;
    guest: User;
    userSubject = new Subject();
    constructor(private httpClient: HttpClient) {
        this.guest = new User('', '', 'guest', '', 'src="favicon.ico"');
        if (!localStorage.getItem('user')) {
            this.user = this.guest;
            localStorage.setItem('user', JSON.stringify(this.user));
        }
        this.user = JSON.parse(localStorage.getItem('user'));
    }
    basicURL = "http://localhost:3500/api";
    userList: User[];
    getAllUsers(setUserList: (res) => void): void {
        let url: string = this.basicURL + "/getList?fileName=user";
        this.httpClient.get<any[]>(url)
            .subscribe(res => {
                this.userList = res;
                setUserList(this.userList);
            });
    }
    register(user: User): void {
        let url: string = this.basicURL + "/register";
        this.httpClient.post<User>(url, user)
            .subscribe(res => {
                console.log(res);
                alert(`added user name=${user.firstName + ' ' + user.lastName}`);
                localStorage.setItem("user", JSON.stringify(user));
                this.userList.push(user);
            },
                err => {
                    console.log("error");
                    console.log(err);
                })

    }
    login(userName: string, password: string): Observable<any> {
        let url: string = this.basicURL + "/login";
        return this.httpClient.post<User>(url, { userName: userName, password: password });
    }
    logOut() {
        localStorage.setItem('user', JSON.stringify(this.guest));
        this.user = JSON.parse(localStorage.getItem('user'));
    }
}