import { Component, OnInit } from '@angular/core';
import {IMember} from "../../_models/member.interface";
import {MembersService} from "../../_services/members.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members: IMember[] = [];
  constructor(private memberSv: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }
loadMembers(){
  this.memberSv.getMembers().subscribe(res => {
    this.members = res
  })
}
}
